const booksContainer = document.getElementById("bookContainer");
const API_ENDPOINT = "https://v1.appbackend.io/v1/rows/qs57h6ZeWDpr";

async function getAllBooks() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data;
}
function openAddBookModal() {
  const modalBackdrop = document.createElement("div");
  modalBackdrop.className =
    "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10";
  modalBackdrop.onclick = function (event) {
    if (event.target === modalBackdrop) {
      modalBackdrop.remove();
    }
  };
  const addBookButton = document.getElementById("addBookBtn");
  if (addBookButton) {
    addBookButton.addEventListener("click", (e) => {
      e.preventDefault();
      openAddBookModal();
    });
  }

  const modalContent = document.createElement("div");
  modalContent.className =
    "bg-white p-5 rounded-lg shadow-lg w-[700px] max-w-4xl mx-auto";

  const iframe = document.createElement("iframe");
  iframe.src = "./addPage.html";
  iframe.frameBorder = "0";
  iframe.className = "w-full h-[600px]";
  modalContent.appendChild(iframe);

  modalBackdrop.appendChild(modalContent);
  document.body.appendChild(modalBackdrop);
}
async function deleteData(id) {
  await fetch(API_ENDPOINT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });
  location.reload();
}

async function buildApp() {
  const { data: books } = await getAllBooks();

  books.forEach((book) => {
    const pubYear = book.year.split("-");

    const bookContainer = document.createElement("div");
    bookContainer.className =
      "bg-white p-4 shadow-lg rounded-lg flex flex-col items-center text-center";
    const bookImage = document.createElement("img");
    bookImage.src = book.cover;
    bookImage.alt = "Cover image of " + book.title;
    bookImage.className = "w-full h-64 object-cover rounded mx-auto"; // Added mx-auto for horizontal centering

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;
    bookTitle.className = "text-xl font-semibold mt-2";

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `${book.author} - ${pubYear[0]}`;
    bookAuthor.className = "text-gray-600 italic";

    const bookDesc = document.createElement("p");
    // Slice the description if it's longer than 300 characters
    bookDesc.textContent =
      book.desc.slice(0, 100) + (book.desc.length > 100 ? "..." : "");
    bookDesc.className = "text-gray-700 mt-2";

    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Check Book";
    bookBtn.className =
      "mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors";
    bookBtn.onclick = () =>
      (window.location.href = `./book.html?id=${book._id}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "mt-4 py-2 px-4 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition-colors";

    deleteBtn.addEventListener("click", async () => {
      await deleteData(book._id);
    });

    bookContainer.append(
      bookImage,
      bookTitle,
      bookAuthor,
      bookDesc,
      bookBtn,
      deleteBtn
    );
    booksContainer.appendChild(bookContainer);
  });
}

buildApp();
