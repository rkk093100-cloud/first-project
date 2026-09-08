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
  window.location.href = "lock.html";
}
