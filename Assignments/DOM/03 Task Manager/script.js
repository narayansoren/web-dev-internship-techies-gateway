/************************************************
 * 1️ STATE (Application Data)
 ************************************************/

let notes = [];

/************************************************
 * 2️ DOM SELECTION
 ************************************************/

const notesCont = document.querySelector("#notes-cont");
const addBtn = document.querySelector(".add-note-btn");
const modalOverlay = document.querySelector(".modal-overlay");

const form = document.querySelector(".note-form");
const titleInput = document.querySelector(".title-input");
const descInput = document.querySelector(".desc-input");
const cancelBtn = document.querySelector(".cancel-btn");

/************************************************
 * 3️ INITIALIZATION
 ************************************************/

init();

function init() {
  loadFromLocalStorage();
  renderNotes();
  attachEventListeners();
}

/************************************************
 * 4️ EVENT LISTENERS
 ************************************************/

function attachEventListeners() {
  addBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);
  form.addEventListener("submit", handleFormSubmit);

  // Ctrl + Enter to submit inside textarea
  descInput.addEventListener("keydown", handleTextareaShortcut);

  // Escape key
  document.addEventListener("keydown", handleEscapeKey);

  modalOverlay.addEventListener("click", handleOverlayClick);
}

/************************************************
 * 5️ EVENT HANDLERS
 ************************************************/

function openModal() {
  modalOverlay.classList.add("active");
  titleInput.focus();
}

function closeModal() {
  modalOverlay.classList.remove("active");
  form.reset();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title || !description) return;

  const newNote = {
    title,
    description,
    date: new Date().toISOString(),
  };

  notes.push(newNote);
  saveToLocalStorage();
  renderNotes();
  closeModal();
}

function handleTextareaShortcut(e) {
  if (e.key === "Enter" && e.ctrlKey) {
    e.preventDefault();
    form.requestSubmit();
  }
}

function handleEscapeKey(e) {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
}

function handleOverlayClick(e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
}

/************************************************
 * 6️ LOCAL STORAGE FUNCTIONS
 ************************************************/

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem("notes");
    if (saved) {
      notes = JSON.parse(saved);
    }
  } catch (error) {
    notes = [];
  }
}

function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

/************************************************
 * 7️ HELPERS
 ************************************************/

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/************************************************
 * 8️ RENDERING
 ************************************************/

function renderNotes() {
  notesCont.innerHTML = "";

  if (notes.length === 0) {
    renderEmptyState();
    return;
  }

  [...notes].reverse().forEach((note) => {
    const card = document.createElement("div");
    card.classList.add("note-card");

    const titleEl = document.createElement("h2");
    titleEl.textContent = note.title;

    const descEl = document.createElement("p");
    descEl.textContent = note.description;

    const dateEl = document.createElement("span");
    dateEl.textContent = formatDate(note.date);

    card.append(titleEl, descEl, dateEl);
    notesCont.append(card);
  });
}

function renderEmptyState() {
  const empty = document.createElement("div");
  empty.classList.add("no-notes");

  const img = document.createElement("img");
  img.src = "./images/stylus_note.png";
  img.alt = "No notes";

  const text = document.createElement("span");
  text.textContent = "No notes here yet";

  empty.append(img, text);
  notesCont.append(empty);
}
