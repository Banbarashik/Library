// insert goThoughArray() inside .forEach
"use strict";
let myLibrary = [];
let cardsBlock = document.querySelector(".cards");
const addBookBtn = document.getElementById("add-book");

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  const newBook = new Book(title, author, pages);

  myLibrary.push(newBook);

  if (cardsBlock.childElementCount === 8) {
    cardsBlock = document.createElement("section");
    cardsBlock.classList.add("cards");
    document.body.appendChild(cardsBlock);
  }
  addBookToPage(cardsBlock, newBook);
}

function addBookToPage(container, book) {
  // container.replaceChildren();
  const bookBody = document.createElement("article");
  bookBody.classList.add("book-card");

  const bookTitle = document.createElement("h2");
  bookTitle.classList.add("title");
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("author");
  bookTitle.textContent = book.author;

  const bookPages = document.createElement("p");
  bookPages.classList.add("pages");
  bookTitle.textContent = book.pages;

  bookBody.appendChild(bookTitle);
  bookBody.appendChild(bookAuthor);
  bookBody.appendChild(bookPages);

  container.appendChild(bookBody);
}

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});
