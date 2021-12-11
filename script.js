// insert goThoughArray() inside .forEach
"use strict";
let myLibrary = [[]];
let cardsBlock = document.querySelector(".cards");
const addBookBtn = document.getElementById("add-book");

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = readStatus;
}

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("status").checked;

  const newBook = new Book(title, author, pages, readStatus);

  myLibrary.forEach((shelf, index) => {
    if (shelf.length >= 8 && myLibrary.length === index + 1) {
      myLibrary.push([]);
      cardsBlock = document.createElement("section");
      cardsBlock.classList.add("cards");
      document.body.appendChild(cardsBlock);
    } else if (shelf.length >= 8) {
      return;
    } else {
      shelf.push(newBook);
      goThroughArray();
    }
  });
}

function goThroughArray() {
  for (let i = 0; i < myLibrary.length; i++) {
    cardsBlock.replaceChildren();
    for (let j = 0; j < myLibrary[i].length; j++) {
      const bookCardBody = document.createElement("article");
      const title = document.createElement("h2");
      const author = document.createElement("p");
      const pages = document.createElement("p");
      const inputLabelContainer = document.createElement("div");
      const statusInput = document.createElement("input");
      const statusLabel = document.createElement("label");
      const removeBtn = document.createElement("button");

      // statusInput.setAttribute("type", "checkbox");
      // statusInput.setAttribute("id", "read" + index);
      // statusLabel.setAttribute("for", "read" + index);
      // removeBtn.setAttribute("data-index", index);
      statusInput.setAttribute("type", "checkbox");
      statusInput.setAttribute("id", "read" + j);
      statusLabel.setAttribute("for", "read" + j);
      removeBtn.setAttribute("data-index", j);

      statusInput.checked = myLibrary[i][j].read;

      bookCardBody.classList.add("book-card");
      title.classList.add("title");
      author.classList.add("author");
      pages.classList.add("pages");
      inputLabelContainer.classList.add("input-and-label");
      removeBtn.classList.add("remove-btn");

      title.textContent = myLibrary[i][j].title;
      author.textContent = myLibrary[i][j].author;
      pages.textContent = myLibrary[i][j].pages;
      statusLabel.textContent = "Read";
      removeBtn.textContent = "Remove the book";

      bookCardBody.appendChild(title);
      bookCardBody.appendChild(author);
      bookCardBody.appendChild(pages);

      inputLabelContainer.appendChild(statusInput);
      inputLabelContainer.appendChild(statusLabel);
      bookCardBody.appendChild(inputLabelContainer);

      bookCardBody.appendChild(removeBtn);

      // bookCardBody.setAttribute("data-index", index);
      bookCardBody.setAttribute("data-index", j);
      cardsBlock.appendChild(bookCardBody);
      // statusInput.addEventListener("click", () => {
      //   if (document.querySelector(`#read${index}`).checked) {
      //     myLibrary[index].read = true;
      //   } else {
      //     myLibrary[index].read = false;
      //   }
      // });
      statusInput.addEventListener("click", () => {
        if (document.querySelector(`#read${j}`).checked) {
          myLibrary[j].read = true;
        } else {
          myLibrary[j].read = false;
        }
      });

      // removeBtn.addEventListener("click", (e) => {
      //   const currentCard = document.querySelector(
      //     `article[data-index="${bookCardBody.dataset.index}"]`
      //   );
      //   cardsBlock.removeChild(currentCard);
      //   myLibrary.splice(bookCardBody.dataset.index, 1);
      //   test();
      // });
      removeBtn.addEventListener("click", (e) => {
        const currentCard = document.querySelector(
          `article[data-index="${bookCardBody.dataset.index}"]`
        );
        cardsBlock.removeChild(currentCard);
        myLibrary[i].splice(bookCardBody.dataset.index, 1);
        test();
      });
    }
  }
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
