async function unlock() {
  let password = document.getElementById("password").value;

  let hash = await hashPassword(password);

  if (
    hash === "278e03449b11c11b7c4344579f61b68696530facda5352c5fab1a1e5b4380e89"
  ) {
    window.location.href = "space.html";
  } else {
    alert("Access denied");
  }
}
