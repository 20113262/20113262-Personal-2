// Page 3 (About) JavaScript: json creator object, "for..of" and classic "for loops", date/math and string manipulation
document.addEventListener("DOMContentLoaded", () => {
  const profileGrid = document.querySelector("#creator-profile-grid");
  const skillsList = document.querySelector("#creator-skills-list");
  const achievementsBody = document.querySelector("#achievements-tbody");
  const projectUptimeEl = document.querySelector("#project-uptime");
  const contactForm = document.querySelector("#feedback-form");
  const feedbackOutput = document.querySelector("#feedback-output");

  // 1. json creator object properties
  const specs = [
    { label: "Creator Name", value: CREATOR_PROFILE.fullName },
    { label: "Online Handles", value: CREATOR_PROFILE.aliases.join(" / ").toUpperCase() },
    { label: "Student ID", value: CREATOR_PROFILE.studentId },
    { label: "Programme", value: CREATOR_PROFILE.course },
    { label: "Location", value: CREATOR_PROFILE.location },
    { label: "Primary Workstation", value: CREATOR_PROFILE.primaryRig }
  ];

  // for..of loop to populate profile cards
  for (const spec of specs) {
    const specHtml = `
      <div class="spec-box">
        <span class="spec-label">${spec.label}</span>
        <span class="spec-value">${spec.value}</span>
      </div>
    `;
    profileGrid.insertAdjacentHTML("beforeend", specHtml);
  }

  // 2. for loop to render skills array
  for (let i = 0; i < CREATOR_PROFILE.skills.length; i++) {
    const liHtml = `<li style="padding: 0.3rem 0; color: #cdeceb;">&gt; ${CREATOR_PROFILE.skills[i]}</li>`;
    skillsList.insertAdjacentHTML("beforeend", liHtml);
  }

  // 3. show achievements table from JSON object using forEach
  CREATOR_PROFILE.achievements.forEach((ach) => {
    const rowHtml = `
      <tr>
        <td><strong>${ach.year}</strong></td>
        <td>${ach.event}</td>
      </tr>
    `;
    achievementsBody.insertAdjacentHTML("beforeend", rowHtml);
  });

  // 4. date and math object: time is counted since my original website, May 5-th, 2025
  const year1Start = new Date("2025-05-05T00:00:00");
  const today = new Date();
  const diffDays = Math.floor((today - year1Start) / (1000 * 60 * 60 * 24));
  projectUptimeEl.textContent = `Project Evolution: Upgraded from Year 1 Static HTML to Year 2 Dynamic ES6+ (${diffDays} days since initial launch).`;

  // 5. visitor note with string manipulation
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const visitorName = document.querySelector("#visitor-name").value.trim();
    const visitorMsg = document.querySelector("#visitor-msg").value.trim();

    if (visitorName === "" || visitorMsg === "") return;

    const cleanName = visitorName.charAt(0).toUpperCase() + visitorName.slice(1);
    const wordCount = visitorMsg.split(/\s+/).length;

    feedbackOutput.innerHTML = "";
    feedbackOutput.insertAdjacentHTML(
      "beforeend",
      `<div class="panel" style="border-color: #00ffff; margin-top: 0.5rem;">
        <p style="margin: 0;"><strong>Message Logged from ${cleanName}</strong> (${wordCount} words at ${new Date().toLocaleTimeString()}):</p>
        <p style="margin: 0.3rem 0 0 0; color: #00ffff;">"${visitorMsg}"</p>
      </div>`
    );
    contactForm.reset();
  });
});
