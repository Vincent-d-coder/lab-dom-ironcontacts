// DOM ELEMENTS
const tableBody = document.querySelector("#contacts");
const buttonAddRandom = document.querySelector("#btn-add-random");
const buttonSortName = document.querySelector("#btn-sort-name");
const buttonSortPopularity = document.querySelector("#btn-sort-popularity");

// Make a copy of contacts so we can remove from it
let availableContacts = [...contacts];

// --- Helper: Build a table row ---
function buildRow(contact) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td><img src="${contact.pictureUrl}" /></td>
    <td>${contact.name}</td>
    <td>${contact.popularity.toFixed(2)}</td>
    <td>${contact.wonOscar ? "🏆" : ""}</td>
    <td>${contact.wonEmmy ? "🌟" : ""}</td>
    <td>
      <button class="btn-delete">Delete</button>
      <button class="btn-like"><img src="images/icon.png" /></button>
    </td>
  `;

  // DELETE BUTTON
  tr.querySelector(".btn-delete").addEventListener("click", () => tr.remove());

  // LIKE BUTTON
  const likeBtn = tr.querySelector(".btn-like");
  const likeIcon = likeBtn.querySelector("img");

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("selected");
    likeIcon.alt = likeBtn.classList.contains("selected") ? "liked" : "like";
  });

  return tr;
}

// --- Iteration 1: Display first 5 contacts ---
function displayInitialContacts() {
  const firstFive = availableContacts.splice(0, 5);
  firstFive.forEach(contact => {
    tableBody.appendChild(buildRow(contact));
  });
}

// --- Iteration 3: Add Random Contact ---
buttonAddRandom.addEventListener("click", () => {
  if (availableContacts.length === 0) return;

  const randomIndex = Math.floor(Math.random() * availableContacts.length);
  const [randomContact] = availableContacts.splice(randomIndex, 1);

  tableBody.appendChild(buildRow(randomContact));
});

// --- Iteration 4: Sort by Name ---
buttonSortName.addEventListener("click", () => {
  const rows = [...tableBody.querySelectorAll("tr")];

  rows.sort((a, b) => {
    const nameA = a.children[1].textContent.toLowerCase();
    const nameB = b.children[1].textContent.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  rows.forEach(row => tableBody.appendChild(row));
});

// --- Iteration 4: Sort by Popularity ---
buttonSortPopularity.addEventListener("click", () => {
  const rows = [...tableBody.querySelectorAll("tr")];

  rows.sort((a, b) => {
    const popA = parseFloat(a.children[2].textContent);
    const popB = parseFloat(b.children[2].textContent);
    return popB - popA;
  });

  rows.forEach(row => tableBody.appendChild(row));
});

// Render initial 5 contacts
displayInitialContacts();
