"use strict";
let myLibrary = [];
const cardsBlock = document.querySelector(".cards");
const addBookBtn = document.getElementById("add-book");

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = readStatus;
}

function addBookToLibrary() {
  cardsBlock.replaceChildren();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("status").checked;

  const newBook = new Book(title, author, pages, readStatus);

  myLibrary.push(newBook);

  goThroughArray();
}

function goThroughArray() {
  myLibrary.forEach((book, index) => {
    const bookCardBody = document.createElement("article");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const inputLabelContainer = document.createElement("div");
    const statusInput = document.createElement("input");
    const statusLabel = document.createElement("label");
    const removeBtn = document.createElement("button");

    statusInput.setAttribute("type", "checkbox");
    statusInput.setAttribute("id", "read" + index);
    statusLabel.setAttribute("for", "read" + index);
    removeBtn.setAttribute("data-index", index);

    statusInput.checked = book.read;

    bookCardBody.classList.add("book-card");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    inputLabelContainer.classList.add("input-and-label");
    removeBtn.classList.add("remove-btn");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    statusLabel.textContent = "Read";
    removeBtn.textContent = "Remove the book";

    bookCardBody.appendChild(title);
    bookCardBody.appendChild(author);
    bookCardBody.appendChild(pages);

    inputLabelContainer.appendChild(statusInput);
    inputLabelContainer.appendChild(statusLabel);
    bookCardBody.appendChild(inputLabelContainer);

    bookCardBody.appendChild(removeBtn);

    bookCardBody.setAttribute("data-index", index);
    cardsBlock.appendChild(bookCardBody);

    statusInput.addEventListener("click", () => {
      if (document.querySelector(`#read${index}`).checked) {
        myLibrary[index].read = true;
      } else {
        myLibrary[index].read = false;
      }
    });

    removeBtn.addEventListener("click", (e) => {
      const currentCard = document.querySelector(
        `article[data-index="${bookCardBody.dataset.index}"]`
      );
      cardsBlock.removeChild(currentCard);
      myLibrary.splice(bookCardBody.dataset.index, 1);
      test();
    });
  });
}

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

function test() {
  const cards = document.querySelectorAll(".book-card");
  cards.forEach((card, index) => {
    card.setAttribute("data-index", index);
  });
}
