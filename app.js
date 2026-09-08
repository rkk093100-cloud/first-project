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
function unlock() {
  let password = document.getElementById("password").value;

  if (password === "sps123") {
    window.location.href = "space.html";
  } else {
    alert("Access denied");
  }
}
