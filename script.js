// insert goThoughArray() inside .forEach
"use strict";
let myLibrary = [[]];
const cardsBlock = document.querySelector(".cards");
const addBookBtn = document.getElementById("add-book");
let isFull;

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = readStatus;
}

function addBookToLibrary() {
  // cardsBlock.replaceChildren();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("status").checked;

  const newBook = new Book(title, author, pages, readStatus);

  // myLibrary.forEach((shelf, index) => {
  // if (shelf[index].length < 7) {
  //  shelf[index].push(newBook);
  // } else {
  // create a new shelf
  // myLibrary.push([]);
  // create a new container
  // const cardsBlock = document.createElement('section');
  // cardsBlock.classList.add("cards");
  // document.body.appendChild(cardsBlock);
  // }
  //})

  // isFull = true
  // if isFull is true - don't execute
  myLibrary.forEach((shelf, index) => {
    if (shelf.length >= 8 && myLibrary.length === index + 1) {
      myLibrary.push([]);
    } else if (shelf.length >= 8) {
      return;
    } else {
      shelf.push(newBook);
      goThroughArray();
    }
  });
}
// if shelf.index > 8 {return}
// shelf.push()
// f checkIfArrayIsFull(shelf)
// {if {shelf > 8} {return}}
// if myLibrary.length === shelf.index - only in this case create a new array

function goThroughArray() {
  //
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
    // if (document.querySelectorAll(".book-card").length > 7) {
    //   const newCardsBlock = document.createElement("section");
    //   newCardsBlock.classList.add("cards");
    //   document.body.appendChild(newCardsBlock);
    //   newCardsBlock.appendChild(bookCardBody);
    // } else {
    cardsBlock.appendChild(bookCardBody);
    // }
    statusInput.addEventListener("click", () => {
      if (document.querySelector(`#read${index}`).checked) {
        myLibrary[index].read = true;
      } else {
        myLibrary[index].read = false;
      }
    });

    // myLibrary.forEach((shelf, index) => {
    // if (shelf[index].length < 7) {
    //  shelf[index].push(newBook);
    // } else {
    // create a new shelf
    // myLibrary.push([]);
    // create a new container
    // const cardsBlock = document.createElement('section');
    // cardsBlock.classList.add("cards");
    // document.body.appendChild(cardsBlock);
    // }
    //})

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
