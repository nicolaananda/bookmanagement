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
  const pubYear = book.year.split("-");

  const bookDetailContainer = document.createElement("div");
  bookDetailContainer.className =
    "flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3 lg:w-1/2";

  const titleElement = document.createElement("h2");
  titleElement.textContent = book.title;
  titleElement.className = "text-3xl font-bold my-4";

  const coverElement = document.createElement("img");
  coverElement.src = book.cover;
  coverElement.alt = `Cover of ${book.title}`;
  coverElement.className = "my-4 w-full md:w-3/4 object-cover";

  const authorElement = document.createElement("p");
  authorElement.textContent = `Author: ${book.author}`;
  authorElement.className = "text-xl my-2";

  const yearElement = document.createElement("p");
  yearElement.textContent = `Published: ${pubYear[0]}`;
  yearElement.className = "text-lg my-1";

  const descElement = document.createElement("p");
  descElement.textContent = book.desc;
  descElement.className = "text-md my-4";

  const editButton = document.createElement("button");
  editButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>';
  editButton.className =
    "px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors";
  editButton.style.marginLeft = "auto"; // Akan mendorong tombol ke kanan
  editButton.style.display = "inline-flex"; // Atau 'inline-block' jika Anda tidak menggunakan flexbox
  editButton.style.alignItems = "center"; // Ini akan memastikan konten dalam tombol tetap di tengah secara vertikal
  editButton.style.justifyContent = "center"; // Dan ini akan memusatkan konten secara horizontal

  editButton.addEventListener("click", () => {
    window.location.href = `/editbook.html?id=${book._id}`;
  });

  bookDetailContainer.appendChild(coverElement);
  bookDetailContainer.appendChild(titleElement);
  bookDetailContainer.appendChild(authorElement);
  bookDetailContainer.appendChild(yearElement);
  bookDetailContainer.appendChild(descElement);
  bookDetailContainer.appendChild(editButton);

  const booksContainer = document.getElementById("books");
  booksContainer.appendChild(bookDetailContainer);
}

buildApp();
