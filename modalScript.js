function openModal() {
  document.getElementById("editModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
}

// Optional: Add close functionality when clicking outside the modal
window.onclick = function (event) {
  let modal = document.getElementById("editModal");
  if (event.target === modal) {
    closeModal();
  }
};
