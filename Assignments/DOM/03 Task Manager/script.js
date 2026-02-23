/************************************************
 * 1️ STATE (Application Data)
 ************************************************/

let notes = [];

/************************************************
 * 2️ DOM SELECTION
 ************************************************/

const notesCont = document.querySelector("#notes-cont");
const addBtn = document.querySelector(".add-note-btn");
const editorView = document.querySelector(".editor-view");

const form = document.querySelector(".note-form");
const titleInput = document.querySelector(".title-input");
const descInput = document.querySelector(".desc-input");

const backBtn = document.querySelector(".back-btn");
const menuBtn = document.querySelector(".menu-btn");
const topSaveBtn = document.querySelector(".top-save-btn");

let currentEditingId = null;
let originalTitle = "";
let originalDescription = "";

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
  // backBtn.addEventListener("click", handleBackAction);
  // form.addEventListener("submit", handleSaveAction);

  titleInput.addEventListener("input", updateDirtyState);
  descInput.addEventListener("input", updateDirtyState);

  addBtn.addEventListener("click", openEditorForCreate);
  backBtn.addEventListener("click", handleBackAction);
  form.addEventListener("submit", handleFormSubmit);

  notesCont.addEventListener("click", handleCardClick);
}

/************************************************
 * 5️ EVENT HANDLERS
 ************************************************/

function handleFormSubmit(e) {
  e.preventDefault();
  saveCurrentNote();
  closeEditor();
}

function handleBackAction() {
  const currentTitle = titleInput.value.trim();
  const currentDesc = descInput.value.trim();

  const isDirty =
    currentTitle !== originalTitle || currentDesc !== originalDescription;

  if (isDirty) {
    saveCurrentNote();
  }

  closeEditor();
}

function handleTextareaShortcut(e) {
  if (e.key === "Enter" && e.ctrlKey) {
    e.preventDefault();
    form.requestSubmit();
  }
}

function handleCardClick(e) {
  const card = e.target.closest(".note-card");
  if (!card) return;

  const id = card.dataset.id;
  openEditorForEdit(id);
}

function openEditorForCreate() {
  currentEditingId = null;
  originalTitle = "";
  originalDescription = "";

  form.reset();

  notesCont.classList.add("hidden");
  editorView.classList.remove("hidden");

  titleInput.focus();

  updateDirtyState();
}

function closeEditor() {
  editorView.classList.add("hidden");
  notesCont.classList.remove("hidden");
}

function updateDirtyState() {
  const currentTitle = titleInput.value.trim();
  const currentDesc = descInput.value.trim();

  const isDirty =
    currentTitle !== originalTitle || currentDesc !== originalDescription;

  if (isDirty) {
    topSaveBtn.classList.remove("hidden");
    menuBtn.classList.add("hidden");
  } else {
    topSaveBtn.classList.add("hidden");
    menuBtn.classList.remove("hidden");
  }
}

function saveCurrentNote() {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title && !description) return;

  if (currentEditingId === null) {
    // CREATE
    const newNote = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      title,
      description,
      date: new Date().toISOString(),
    };

    notes.push(newNote);
  } else {
    // UPDATE
    notes = notes.map((note) => {
      if (note.id === currentEditingId) {
        return {
          ...note,
          title,
          description,
        };
      }
      return note;
    });
  }

  saveToLocalStorage();
  renderNotes();
}

function openEditorForEdit(id) {
  const note = notes.find((note) => note.id === id);
  if (!note) return;

  currentEditingId = id;

  titleInput.value = note.title;
  descInput.value = note.description;

  originalTitle = note.title;
  originalDescription = note.description;

  notesCont.classList.add("hidden");
  editorView.classList.remove("hidden");

  updateDirtyState();
}

/************************************************
 * 6️ LOCAL STORAGE FUNCTIONS
 ************************************************/

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem("notes");
    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        notes = parsed;
      }
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

  const fragment = document.createDocumentFragment();

  notes
    .slice()
    .reverse()
    .forEach((note) => {
      const card = document.createElement("div");
      card.classList.add("note-card");

      card.dataset.id = note.id;

      const titleEl = document.createElement("h2");
      titleEl.textContent = note.title;

      const descEl = document.createElement("p");
      descEl.textContent = note.description;

      const dateEl = document.createElement("span");
      dateEl.textContent = formatDate(note.date);

      card.append(titleEl, descEl, dateEl);
      fragment.append(card);
    });

  notesCont.append(fragment);
}

function renderEmptyState() {
  const empty = document.createElement("div");
  empty.classList.add("no-notes");

  const img = document.createElement("img");
  img.src = "./images/stylus_note.png";
  img.alt = "Pen image";

  const text = document.createElement("span");
  text.textContent = "No notes here yet";

  empty.append(img, text);
  notesCont.append(empty);
}
