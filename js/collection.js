// Page 2 (Data Manipulation) JavaScript
let mediaItems = getMediaCollection();

const cardsContainer = document.querySelector("#cards-container");
const statsBar = document.querySelector("#collection-stats");
const addForm = document.querySelector("#add-item-form");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const featuredOnlyCheckbox = document.querySelector("#featured-only");
const resetBtn = document.querySelector("#reset-data-btn");

// arrow function returning filtered items
const filterCollection = (items, queryText, selectedCat, onlyFeatured) => {
  const normalizedQuery = queryText.trim().toLowerCase();

  return items.filter((item) => {
    const matchesText =
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.creator.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    const matchesCategory = selectedCat === "ALL" || item.category === selectedCat;
    const matchesFeatured = !onlyFeatured || item.featured === true;

    return matchesText && matchesCategory && matchesFeatured;
  });
};

// arrow function returning stats object using Math methods
const computeStats = (visibleItems, totalCount) => {
  if (visibleItems.length === 0) {
    return { shown: 0, total: totalCount, avgRating: 0, newestYear: "N/A" };
  }
  let sum = 0;
  let maxYear = visibleItems[0].year;
  for (const item of visibleItems) {
    sum += item.rating;
    maxYear = Math.max(maxYear, item.year);
  }
  return {
    shown: visibleItems.length,
    total: totalCount,
    avgRating: Math.round((sum / visibleItems.length) * 10) / 10,
    newestYear: maxYear
  };
};

// render cards using forEach() and insertAdjacentHTML()
function renderCards() {
  const filtered = filterCollection(
    mediaItems,
    searchInput.value,
    categoryFilter.value,
    featuredOnlyCheckbox.checked
  );

  const stats = computeStats(filtered, mediaItems.length);
  statsBar.innerHTML = `
    <span>Showing: <strong>${stats.shown}</strong> of <strong>${stats.total}</strong> items</span>
    <span>Avg Rating: <strong>${stats.avgRating} / 5</strong></span>
    <span>Latest Entry Year: <strong>${stats.newestYear}</strong></span>
  `;

  cardsContainer.innerHTML = "";

  if (filtered.length === 0) {
    cardsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="panel" style="width: 100%;"><p>No matching entries found. Try adjusting your search or filters.</p></div>`
    );
    return;
  }

  filtered.forEach((item) => {
    const stars = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);
    const featuredBadge = item.featured ? `<span class="badge badge-featured">FEATURED</span>` : "";
    const tagsHtml = item.tags
      .map((tag) => `<span class="tag-pill">#${tag.trim().toUpperCase()}</span>`)
      .join("");

    const cardHtml = `
      <article class="item-card" data-id="${item.id}">
        <div class="card-top">
          <img src="${item.image}" alt="${item.title}" class="card-thumb" onerror="this.src='images/tech/FIRST_DISASSEMBLY.jpg'">
          <div class="card-info">
            <h3>${item.title}</h3>
            <div class="card-meta">
              <span class="badge">${item.category.toUpperCase()}</span>
              ${featuredBadge}
              <span>${item.creator} • ${item.year}</span>
            </div>
            <p style="margin: 0.3rem 0; font-size: 0.9rem;">${item.description}</p>
            <div class="tags-list">${tagsHtml}</div>
          </div>
        </div>
        <div class="card-footer">
          <span style="color: #ffd700;">Rating: ${stars} (${item.rating}/5)</span>
          <button type="button" class="btn btn-danger delete-btn" data-id="${item.id}">Delete</button>
        </div>
      </article>
    `;
    cardsContainer.insertAdjacentHTML("beforeend", cardHtml);
  });

  attachCardEvents();
}

// attach click and hover (mouseover/mouseout) events to rendered cards
function attachCardEvents() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idToDelete = Number(e.currentTarget.getAttribute("data-id"));
      deleteItemById(idToDelete);
    });
  });

  const allCards = document.querySelectorAll(".item-card");
  allCards.forEach((card) => {
    card.addEventListener("mouseover", () => card.classList.add("highlighted"));
    card.addEventListener("mouseout", () => card.classList.remove("highlighted"));
  });
}

// delete an existing object using strict inequality (!==)
function deleteItemById(id) {
  mediaItems = mediaItems.filter((item) => item.id !== id);
  saveMediaCollection(mediaItems);
  renderCards();
}

// add a new object on form submit
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleRaw = document.querySelector("#item-title").value.trim();
  const creatorRaw = document.querySelector("#item-creator").value.trim();
  const categoryVal = document.querySelector("#item-category").value;
  const yearVal = parseInt(document.querySelector("#item-year").value, 10) || new Date().getFullYear();
  const imageVal = document.querySelector("#item-image").value;
  const descRaw = document.querySelector("#item-desc").value.trim();
  const tagsRaw = document.querySelector("#item-tags").value.trim();
  const isFeatured = document.querySelector("#item-featured").checked;

  // read selected radio button for rating
  const selectedRadio = document.querySelector('input[name="item-rating"]:checked');
  const ratingVal = selectedRadio ? Number(selectedRadio.value) : 5;

  if (titleRaw === "" || creatorRaw === "") {
    alert("Please provide both a title and creator/artist.");
    return;
  }

  // string manipulation: split comma-separated tags, trim, and lowercase
  const parsedTags = tagsRaw !== ""
    ? tagsRaw.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t !== "")
    : [categoryVal.toLowerCase()];

  const newEntry = {
    id: Date.now(),
    title: titleRaw,
    creator: creatorRaw,
    category: categoryVal,
    year: yearVal,
    rating: ratingVal,
    featured: isFeatured,
    image: imageVal,
    tags: parsedTags,
    description: descRaw !== "" ? descRaw : "Custom entry added to H3ADROOM's personal archive."
  };

  mediaItems.push(newEntry);
  saveMediaCollection(mediaItems);
  addForm.reset();
  renderCards();
});

// event listeners for live search & filter 
searchInput.addEventListener("input", renderCards);
categoryFilter.addEventListener("change", renderCards);
featuredOnlyCheckbox.addEventListener("change", renderCards);

resetBtn.addEventListener("click", () => {
  mediaItems = [...DEFAULT_MEDIA_ITEMS];
  saveMediaCollection(mediaItems);
  searchInput.value = "";
  categoryFilter.value = "ALL";
  featuredOnlyCheckbox.checked = false;
  renderCards();
});

document.addEventListener("DOMContentLoaded", renderCards);
