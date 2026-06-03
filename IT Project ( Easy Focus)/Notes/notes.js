const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

addBtn.addEventListener("click", () => {
  createNote();
});

function createNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note-wrapper");

  const textarea = document.createElement("textarea");
  textarea.className = "input-box";
  textarea.value = text;

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "https://cdn-icons-png.flaticon.com/512/1214/1214428.png";
  deleteIcon.alt = "delete";
  deleteIcon.addEventListener("click", () => {
    notesContainer.removeChild(note);
  });

  note.appendChild(textarea);
  note.appendChild(deleteIcon);
  notesContainer.appendChild(note);
}
