"use strict";
const myLibrary = [];

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
}

const addBookBtn = document.getElementById("add-book");

addBookBtn.addEventListener("click", () => {
  addBookToLibrary();
  return false;
});

console.log(myLibrary);
