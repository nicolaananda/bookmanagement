const booksContainer = document.getElementById("bookContainer");
const API_ENDPOINT = "https://v1.appbackend.io/v1/rows/qs57h6ZeWDpr";

async function getAllBooks() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data;
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
    bookImage.className = "w-full h-64 object-cover rounded";

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;
    bookTitle.className = "text-xl font-semibold mt-2";

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `${book.author} - ${pubYear[0]}`;
    bookAuthor.className = "text-gray-600 italic";

    const bookDesc = document.createElement("p");
    bookDesc.textContent = book.desc;
    bookDesc.className = "text-gray-700 mt-2";

    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Check Book";
    bookBtn.className =
      "mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors";
    bookBtn.onclick = () =>
      (window.location.href = `./book.html?id=${book._id}`);

    bookContainer.append(bookImage, bookTitle, bookAuthor, bookDesc, bookBtn);
    booksContainer.appendChild(bookContainer);
  });
}

buildApp();
