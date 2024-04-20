const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id"); // ambil id

const API_ENDPOINT = `https://v1.appbackend.io/v1/rows/qs57h6ZeWDpr/${id}`;

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const descInput = document.getElementById("desc");

async function getAllBooks() {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data;
}

async function buildApp() {
  const book = await getAllBooks();
  titleInput.value = book.title;
  authorInput.value = book.author;
  yearInput.value = book.year.split("-")[0];
  descInput.value = book.desc;
}

buildApp();
