function saveNote() {
  let note = document.getElementById("note").value;

  localStorage.setItem("SPS_note", note);

  alert("Saved!");
}

window.onload = function () {
  let oldNote = localStorage.getItem("SPS_note");

  if (oldNote) {
    document.getElementById("note").value = oldNote;
  }
};
