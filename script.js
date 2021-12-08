"use strict";
let myLibrary = [];
const cardsBlock = document.querySelector(".cards");

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary() {
  myLibrary = [];
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);

  myLibrary.forEach((book) => {
    const bookCardBody = document.createElement("article");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    bookCardBody.classList.add("book-card");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    bookCardBody.appendChild(title);
    bookCardBody.appendChild(author);
    bookCardBody.appendChild(pages);
    cardsBlock.appendChild(bookCardBody);
  });
}

const addBookBtn = document.getElementById("add-book");

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

console.log(myLibrary);
