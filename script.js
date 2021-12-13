// insert goThoughArray() inside .forEach
"use strict";
let myLibrary = [];
let cardsBlock = document.querySelector(".cards");
const addBookBtn = document.getElementById("add-book");
const bookshelf = document.getElementById("bookshelf");

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Book.prototype.addIndex = function () {
  this.index = myLibrary.length;
};

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  const newBook = new Book(title, author, pages);
  newBook.addIndex();

  myLibrary.push(newBook);

  if (cardsBlock.childElementCount === 8) {
    cardsBlock = document.createElement("section");
    cardsBlock.classList.add("cards");
    bookshelf.appendChild(cardsBlock);
  }
  addBookToPage(cardsBlock, newBook);
}

function addBookToPage(container, book) {
  const bookBody = document.createElement("article");
  bookBody.classList.add("book-card");
  bookBody.setAttribute("data-index", book.index);

  const bookTitle = document.createElement("h2");
  bookTitle.classList.add("title");
  bookTitle.textContent = book.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("author");
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement("p");
  bookPages.classList.add("pages");
  bookPages.textContent = book.pages;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Remove the book";

  bookBody.appendChild(bookTitle);
  bookBody.appendChild(bookAuthor);
  bookBody.appendChild(bookPages);
  bookBody.appendChild(deleteBtn);

  container.appendChild(bookBody);

  deleteBtn.addEventListener("click", () => {
    bookBody.remove();
    delete myLibrary[book.index];

    if (cardsBlock.childElementCount === 0) {
      cardsBlock.remove();
      cardsBlock = bookshelf.lastElementChild;
    }
  });
}

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});
