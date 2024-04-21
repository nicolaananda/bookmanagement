document.addEventListener("DOMContentLoaded", function () {
  // Assume you have the book's ID stored somewhere, or you fetch it from the URL.
  const bookId = "id_from_somewhere"; // You need to obtain this ID.

  const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/qs57h6ZeWDpr/${bookId}`;

  function openModal() {
    document.getElementById("editModal").classList.remove("hidden");
    fetchBookDetails();
  }

  window.openModal = openModal; // Make it available globally to be called in inline onclick.

  function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
  }

  window.onclick = function (event) {
    let modal = document.getElementById("editModal");
    if (event.target === modal) {
      closeModal();
    }
  };

  async function fetchBookDetails() {
    const response = await fetch(API_ENDPOINT);
    const book = await response.json();
    populateForm(book);
  }

  function populateForm(book) {
    const form = document.getElementById("editForm");
    form.innerHTML = `
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
        <input type="text" id="title" name="title" value="${book.title}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="author">Author</label>
        <input type="text" id="author" name="author" value="${book.author}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="year">Publication Year</label>
        <input type="text" id="year" name="year" value="${book.year}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="desc">Description</label>
        <textarea id="desc" name="desc" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${book.description}</textarea>
      </div>
      <button type="button" onclick="closeModal()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
    `;
    form.onsubmit = handleFormSubmit;
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    // Collect form data and send the PUT request to update the book.
    // Then close the modal or display a message to the user.
    closeModal();
  }
});
