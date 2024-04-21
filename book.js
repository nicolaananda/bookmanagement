document.addEventListener("DOMContentLoaded", () => {
  const booksContainer = document.getElementById("books");
  const query = location.search;
  const params = new URLSearchParams(query);
  const id = params.get("id");

  const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/qs57h6ZeWDpr/${id}`;

  async function getBook() {
    const res = await fetch(API_ENDPOINT);

    const book = await res.json();
    return book;
  }

  async function buildApp() {
    const book = await getBook();
    if (!book) {
      console.error("No book data available.");
      return;
    }

    const pubYear = book.year.split("-")[0];

    const bookDetailContainer = document.createElement("div");
    bookDetailContainer.className =
      "flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-auto md:max-w-2xl lg:max-w-4xl mx-auto";

    const titleElement = document.createElement("h2");
    titleElement.textContent = book.title;
    titleElement.className = "text-3xl font-bold my-4";

    const coverElement = document.createElement("img");
    coverElement.src = book.cover;
    coverElement.alt = `Cover of ${book.title}`;
    coverElement.className = "my-4 w-full h-[300px] object-cover";

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;
    authorElement.className = "text-lg my-2";

    const yearElement = document.createElement("p");
    yearElement.textContent = `Published: ${pubYear}`;
    yearElement.className = "text-md my-0";

    const descElement = document.createElement("p");
    descElement.textContent = book.desc;
    descElement.className = "text-md my-4 text-justify";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className =
      "px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors";
    editButton.onclick = () => {
      const iframeModal = createIframeModal(book._id);
      document.body.appendChild(iframeModal);
    };

    bookDetailContainer.appendChild(coverElement);
    bookDetailContainer.appendChild(titleElement);
    bookDetailContainer.appendChild(authorElement);
    bookDetailContainer.appendChild(yearElement);
    bookDetailContainer.appendChild(descElement);
    bookDetailContainer.appendChild(editButton);

    booksContainer.appendChild(bookDetailContainer);
  }

  function createIframeModal(bookId) {
    const modalBackdrop = document.createElement("div");
    modalBackdrop.className =
      "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10";
    modalBackdrop.onclick = (event) => {
      if (event.target === modalBackdrop) {
        closeIframeModal();
      }
    };

    const modalContent = document.createElement("div");
    modalContent.className =
      "bg-white p-5 rounded-lg shadow-lg w-[700px] max-w-4xl";
    modalBackdrop.appendChild(modalContent);

    const iframe = document.createElement("iframe");
    iframe.src = `./editBook.html?id=${bookId}`;
    iframe.className = "w-full h-[600px]";
    modalContent.appendChild(iframe);

    return modalBackdrop;
  }

  function closeIframeModal() {
    const modalBackdrop = document.querySelector(".fixed.inset-0");
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
      window.location.reload(); // Optionally remove if not needed
    }
  }

  window.addEventListener("message", (event) => {
    if (event.data === "closeModal") {
      closeIframeModal();
    }
  });

  buildApp();
});
