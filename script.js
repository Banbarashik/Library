'use strict';
// variables related to the form
const bookForm = document.getElementById('book-form');
const addBookBtn = document.getElementById('add-book');
const title = document.getElementById('title');
const author = document.getElementById('author');
const totalPages = document.getElementById('totalPages');
const completedPages = document.getElementById('completedPages');
const errMessage = document.getElementById('error-message');

// variables related to the library
let myLibrary = [];
let currentShelf;
let allShelves;
const bookshelf = document.getElementById('bookshelf');

// store the library array in localStorage before unloading
window.addEventListener('beforeunload', () =>
  localStorage.setItem('books', JSON.stringify(myLibrary))
);

// check if the library is saved in localStorage, then add all books contained inside it
if (localStorage.getItem('books')) {
  myLibrary = JSON.parse(localStorage.getItem('books'));
  goThroughLibrary();
}

function setInputFilter(textbox, inputFilter) {
  [
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mouseup',
    'select',
    'contextmenu',
    'drop',
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    });
  });
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setCurrentShelfToFirst() {
  currentShelf = document.getElementById('first-shelf');
}

function updateCardsNodeList() {
  allShelves = document.querySelectorAll('.cards');
}

function clearFields() {
  errMessage.textContent = '';
  title.value = '';
  author.value = '';
  totalPages.value = '';
  completedPages.value = '';
}

function clearBookshelf() {
  allShelves.forEach((container, index) => {
    container.replaceChildren();
    if (index > 1) {
      container.remove();
    }
  });
}

// move the first book to the previous shelf if it's not full
function moveBookToPrevShelf() {
  allShelves.forEach((block, index) => {
    if (
      index &&
      block.previousElementSibling.childElementCount < 8 &&
      block.childElementCount > 0
    ) {
      block.previousElementSibling.appendChild(block.firstChild);
    }
  });
}

// remove the last shelf if there's no books
function removeLastShelf() {
  if (
    bookshelf.lastElementChild.childElementCount === 0 &&
    bookshelf.getElementsByClassName('cards').length > 2
  ) {
    bookshelf.lastElementChild.remove();
  }
}

// creates a book object
function Book(title, author, totalPages, completedPages) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.completedPages = completedPages;
  this.color = `hsl(${getRandomNumber(0, 360)},
  ${getRandomNumber(20, 100)}%,
  ${getRandomNumber(50, 80)}%)`;
}

// push a book object to the library array, clears the bookshelf and rearrange it with the new object
function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const totalPages = document.getElementById('totalPages').value;
  const completedPages = document.getElementById('completedPages').value;

  const newBook = new Book(title, author, totalPages, completedPages);

  myLibrary.push(newBook);

  updateCardsNodeList();

  clearBookshelf();

  goThroughLibrary();
}

// creates a book element with info from the object
function addBookToPage(container, book, index) {
  const bookBody = document.createElement('article');
  bookBody.classList.add('book-card');
  bookBody.setAttribute('data-index', index);
  bookBody.style.backgroundColor = book.color;

  const bookTitle = document.createElement('h2');
  bookTitle.classList.add('title');
  bookTitle.textContent = book.title;

  const bookAuthorPagesBlock = document.createElement('div');
  bookAuthorPagesBlock.classList.add('author-and-pages');

  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('author');
  bookAuthor.textContent = book.author;

  const bookTotalPages = document.createElement('p');
  bookTotalPages.classList.add('totalPages');
  bookTotalPages.textContent = book.totalPages + ' pages';

  bookAuthorPagesBlock.appendChild(bookAuthor);
  bookAuthorPagesBlock.appendChild(bookTotalPages);

  const completedPagesBlock = document.createElement('div');
  completedPagesBlock.classList.add('completed-pages-wrapper');

  const bookCompletedPages = document.createElement('input');
  bookCompletedPages.classList.add('completed-pages');
  bookCompletedPages.value = book.completedPages;
  bookCompletedPages.setAttribute('type', 'text');
  bookCompletedPages.setAttribute('maxlength', String(book.totalPages).length);

  completedPagesBlock.appendChild(bookCompletedPages);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');

  bookBody.appendChild(bookTitle);
  bookBody.appendChild(bookAuthorPagesBlock);
  bookBody.appendChild(completedPagesBlock);
  bookBody.appendChild(deleteBtn);

  container.appendChild(bookBody);

  deleteBtn.addEventListener('click', () => {
    currentShelf = bookBody.parentElement;

    myLibrary.splice(index, 1);

    updateCardsNodeList();

    clearBookshelf();

    goThroughLibrary();

    moveBookToPrevShelf();

    removeLastShelf();
  });

  bookCompletedPages.addEventListener('blur', e => {
    const max = book.totalPages;
    if (parseInt(e.target.value) > max) e.target.value = max;
    if (parseInt(e.target.value) === 0 || e.target.value === '')
      e.target.value = 1;
    book.completedPages = e.target.value;

    // localStorage.setItem('books', JSON.stringify(booksLocal));
  });

  setInputFilter(bookCompletedPages, function (value) {
    return /^\d*?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  });
}

function goThroughLibrary() {
  setCurrentShelfToFirst();

  myLibrary.forEach((book, index) => {
    if (
      currentShelf === document.getElementById('first-shelf') &&
      currentShelf.childElementCount === 8
    ) {
      currentShelf = document.getElementById('second-shelf');
    } else if (currentShelf.childElementCount === 8) {
      currentShelf = document.createElement('section');
      currentShelf.classList.add('cards', 'cards-sequence');
      bookshelf.appendChild(currentShelf);
    }

    addBookToPage(currentShelf, book, index);
  });

  setCurrentShelfToFirst();
}

addBookBtn.addEventListener('click', e => {
  e.preventDefault(); // prevent a form from being submitted

  // check if fields are filled and valid
  if (title.value === '' || author.value === '' || totalPages.value === '') {
    errMessage.textContent = 'Please, fill out all required fields.';
    return false;
  } else if (title.value.length >= 50) {
    errMessage.textContent = 'Title length must be less than 50 characters';
    return false;
  } else if (author.value.length >= 40) {
    errMessage.textContent =
      'Author name length must be less than 40 characters';
    return false;
  } else if (
    parseInt(totalPages.value) < parseInt(totalPages.min) ||
    parseInt(totalPages.value) > parseInt(totalPages.max)
  ) {
    errMessage.textContent =
      "Number of pages can't be less than 1 and greater than 99999.";
    return false;
  } else if (parseInt(completedPages.value) > parseInt(totalPages.value)) {
    completedPages.value = totalPages.value;
  } else if (
    parseInt(completedPages.value) === 0 ||
    completedPages.value === ''
  ) {
    completedPages.value = 1;
  }

  addBookToLibrary();

  clearFields();
});
