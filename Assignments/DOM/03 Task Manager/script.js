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

function attachEventListeners() {}

function renderNotes() {
  notesCont.innerHTML = "";
}
