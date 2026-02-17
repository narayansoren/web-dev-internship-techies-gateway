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
  renderNotes();
  attachEventListeners();
}

/************************************************
 * 4️ EVENT LISTENERS
 ************************************************/

function attachEventListeners() {
  addBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);

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

/************************************************
 * 7️ HELPERS
 ************************************************/

/************************************************
 * 8️ RENDERING
 ************************************************/

function renderNotes() {
  notesCont.innerHTML = "";
}
