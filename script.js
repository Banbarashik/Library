"use strict";
let myLibrary = [];
let cardsBlock = document.querySelector(".cards");
const addBookBtn = document.getElementById("add-book");
const bookshelf = document.getElementById("bookshelf");
const title = document.getElementById("title");
const author = document.getElementById("author");
const totalPages = document.getElementById("totalPages");
const completedPages = document.getElementById("completedPages");

function Book(title, author, totalPages, completedPages) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.completedPages = completedPages;
}

Book.prototype.addIndex = function () {
  this.index = myLibrary.length;
};

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const totalPages = document.getElementById("totalPages").value;
  const completedPages = document.getElementById("completedPages").value;

  const newBook = new Book(title, author, totalPages, completedPages);
  newBook.addIndex();

  myLibrary.push(newBook);

  if (cardsBlock.childElementCount === 8) {
    cardsBlock = document.createElement("section");
    cardsBlock.classList.add("cards", "cards-sequence");
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

  const bookTotalPages = document.createElement("p");
  bookTotalPages.classList.add("totalPages");
  bookTotalPages.textContent = book.totalPages;

  const bookCompletedPages = document.createElement("input");
  bookCompletedPages.classList.add("completedPages");
  bookCompletedPages.value = book.completedPages;
  bookCompletedPages.setAttribute("type", "text");
  bookCompletedPages.setAttribute(
    "maxlength",
    bookTotalPages.textContent.length
  );

  setInputFilter(bookCompletedPages, function (value) {
    return /^\d*?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Remove the book";

  bookBody.appendChild(bookTitle);
  bookBody.appendChild(bookAuthor);
  bookBody.appendChild(bookTotalPages);
  bookBody.appendChild(bookCompletedPages);
  bookBody.appendChild(deleteBtn);

  container.appendChild(bookBody);

  deleteBtn.addEventListener("click", () => {
    bookBody.remove();
    delete myLibrary[book.index];

    if (
      cardsBlock.childElementCount === 0 &&
      bookshelf.getElementsByClassName("cards").length !== 1
    ) {
      cardsBlock.remove();
      cardsBlock = bookshelf.lastElementChild;
    }
  });

  bookCompletedPages.addEventListener("blur", (e) => {
    const max = bookTotalPages.textContent;
    if (parseInt(e.target.value) > max) e.target.value = max;
  });
}

function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (parseInt(completedPages.value) > parseInt(totalPages.value))
    completedPages.value = totalPages.value;
  addBookToLibrary();

  title.value = "";
  author.value = "";
  totalPages.value = "";
  completedPages.value = "";
});
