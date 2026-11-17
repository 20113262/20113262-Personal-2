// Page 1 (Welcome) JavaScript: Date greeting, Math.random spotlight, String manipulation, insertAdjacentHTML
document.addEventListener("DOMContentLoaded", () => {
  const greetingBanner = document.querySelector("#dynamic-greeting");
  const spotlightContainer = document.querySelector("#spotlight-box");
  const randomBtn = document.querySelector("#random-spotlight-btn");
  const statsSummary = document.querySelector("#home-stats");

  // 1. date object and greeting :)
  const currentHour = new Date().getHours();
  let timeGreeting = "Good evening";
  if (currentHour < 12) {
    timeGreeting = "Good morning";
  } else if (currentHour < 18) {
    timeGreeting = "Good afternoon";
  }
  greetingBanner.textContent = `${timeGreeting}, visitor! System online at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`;

  // 2. collection stats using Math & Arrow function returning value
  const collection = getMediaCollection();
  const calcAverageRating = (arr) => {
    if (arr.length === 0) return 0;
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += arr[i].rating;
    }
    return Math.round((total / arr.length) * 10) / 10;
  };

  statsSummary.textContent = `Database Status: ${collection.length} stored entries | Average Rating: ${calcAverageRating(collection)} / 5.0`;

  // 3. random spotlight draw using Math.random(), Math.floor(), string manipulation and insertAdjacentHTML
  const renderRandomSpotlight = () => {
    const items = getMediaCollection();
    if (items.length === 0) {
      spotlightContainer.innerHTML = "<p>No entries available in the database.</p>";
      return;
    }
    const randomIndex = Math.floor(Math.random() * items.length);
    const pick = items[randomIndex];

    // string manipulation: uppercase category, formatted tags joined, trimmed description preview
    const upperCategory = pick.category.toUpperCase();
    const formattedTags = pick.tags.map((t) => `#${t.trim().replace(/\s+/g, "_").toUpperCase()}`).join(" ");
    const shortDesc = pick.description.length > 140
      ? `${pick.description.slice(0, 140).trim()}...`
      : pick.description;

    spotlightContainer.innerHTML = "";
    const htmlSnippet = `
      <div class="item-card highlighted" style="flex: 1 1 100%;">
        <div class="card-top">
          <img src="${pick.image}" alt="${pick.title}" class="card-thumb">
          <div class="card-info">
            <h3>${pick.title}</h3>
            <div class="card-meta">
              <span class="badge">${upperCategory}</span>
              <span>By ${pick.creator} (${pick.year})</span>
              <span>Rating: ${"★".repeat(pick.rating)}${"☆".repeat(5 - pick.rating)}</span>
            </div>
            <p style="margin: 0.3rem 0;">${shortDesc}</p>
            <div class="tags-list">
              <span class="tag-pill">${formattedTags}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    spotlightContainer.insertAdjacentHTML("beforeend", htmlSnippet);
  };

  renderRandomSpotlight();
  randomBtn.addEventListener("click", renderRandomSpotlight);
});
