async function unlock() {
  let password = document.getElementById("password").value;

  let savedHash = localStorage.getItem("SPS_password_hash");

  if (!savedHash) {
    alert("No password found. Please create your space first.");
    window.location.href = "setup.html";
    return;
  }

  let hash = await hashPassword(password);

  if (hash === savedHash) {
    sessionStorage.setItem("SPS_unlocked", "true");
    sessionStorage.setItem("SPS_session_password", password);

    window.location.href = "space.html";
  } else {
    alert("Access denied");
  }
}

function protectSpace() {
  let unlocked = sessionStorage.getItem("SPS_unlocked");

  if (unlocked !== "true") {
    window.location.href = "lock.html";
  }
}

function lockSPS() {
  sessionStorage.removeItem("SPS_unlocked");
  sessionStorage.removeItem("SPS_session_password");

  window.location.href = "lock.html";
}

async function saveNote() {
  let note = document.getElementById("note").value;

  if (note === "") {
    alert("Please write something.");
    return;
  }

  let password = prompt("Enter your password");

  if (!password) {
    return;
  }

  let encrypted = await encryptNote(note, password);

  localStorage.setItem("SPS_encrypted_note", JSON.stringify(encrypted));

  alert("Encrypted note saved.");
}
async function loadNote() {
  let encryptedData = localStorage.getItem("SPS_encrypted_note");
  let password = sessionStorage.getItem("SPS_session_password");

  if (!encryptedData || !password) {
    return;
  }

  let encrypted = JSON.parse(encryptedData);

  try {
    let decrypted = await decryptNote(encrypted, password);

    document.getElementById("note").value = decrypted;
  } catch (error) {
    alert("Failed to decrypt note.");
  }
}
