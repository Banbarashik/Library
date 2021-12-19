'use strict';
let myLibrary = [];
let booksLocal = [];
// let cardsBlock = document.querySelector('.cards');
let cardsBlock = document.querySelector('.cards');
const addBookBtn = document.getElementById('add-book');
const bookshelf = document.getElementById('bookshelf');
const bookForm = document.getElementById('book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const totalPages = document.getElementById('totalPages');
const completedPages = document.getElementById('completedPages');
const errMessage = document.getElementById('error-message');

(function () {
  if (localStorage.getItem('books')) {
    booksLocal = JSON.parse(localStorage.getItem('books'));
    booksLocal.forEach(book => {
      if (cardsBlock.childElementCount === 8) {
        cardsBlock = document.createElement('section');
        cardsBlock.classList.add('cards', 'cards-sequence');
        bookshelf.appendChild(cardsBlock);
      }
      addBookToPage(cardsBlock, book);
    });
    myLibrary = booksLocal.slice();
  }
})();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Book(title, author, totalPages, completedPages) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.completedPages = completedPages;
  this.color = `hsl(${getRandomNumber(0, 360)},
  ${getRandomNumber(20, 100)}%,
  ${getRandomNumber(50, 80)}%)`;
}

// Book.prototype.addIndex = function () {
//   this.index = myLibrary.length;
// };

function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const totalPages = document.getElementById('totalPages').value;
  const completedPages = document.getElementById('completedPages').value;

  const newBook = new Book(title, author, totalPages, completedPages);
  // newBook.addIndex();

  myLibrary.push(newBook);
  // booksLocal.push(newBook);
  // localStorage.setItem('books', JSON.stringify(booksLocal));

  // if (cardsBlock.childElementCount === 8) {
  //   cardsBlock = document.createElement('section');
  //   cardsBlock.classList.add('cards', 'cards-sequence');
  //   bookshelf.appendChild(cardsBlock);
  // }

  const cardsContainers = document.querySelectorAll('.cards');
  cardsContainers.forEach((container, index) => {
    container.replaceChildren();
    if (index) {
      container.remove();
    }
  });

  // addBookToPage(cardsBlock, newBook);
  // cardBlocks.forEach(block => {
  // block.replaceChildren();
  myLibrary.forEach((book, index) => {
    if (cardsBlock.childElementCount === 8) {
      cardsBlock = document.createElement('section');
      cardsBlock.classList.add('cards', 'cards-sequence');
      bookshelf.appendChild(cardsBlock);
    }

    addBookToPage(cardsBlock, book, index);
  });
  cardsBlock = document.querySelector('.cards');
  // });
  // cardsBlock.replaceChildren();
}

function addBookToPage(container, book, index) {
  const bookBody = document.createElement('article');
  bookBody.classList.add('book-card');
  // bookBody.setAttribute("data-index", book.index);
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

  // setInputFilter(bookCompletedPages, function (value) {
  //   return /^\d*?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  // });

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');

  bookBody.appendChild(bookTitle);
  bookBody.appendChild(bookAuthorPagesBlock);
  bookBody.appendChild(completedPagesBlock);
  bookBody.appendChild(deleteBtn);

  container.appendChild(bookBody);

  deleteBtn.addEventListener('click', () => {
    cardsBlock = bookBody.parentElement; // test

    bookBody.remove();

    delete myLibrary[index];

    // booksLocal.forEach((bookLocal, index) => {
    //   if (bookLocal.index === book.index) {
    //     booksLocal.splice(index, 1);
    //     localStorage.setItem('books', JSON.stringify(booksLocal));
    //   }
    // });

    if (
      cardsBlock.childElementCount === 0 &&
      bookshelf.getElementsByClassName('cards').length !== 1
    ) {
      cardsBlock.remove();
      cardsBlock = bookshelf.lastElementChild;
    }

    const allBlocks = document.querySelectorAll('.cards');
    allBlocks.forEach((block, index) => {
      if (index && block.previousElementSibling.childElementCount < 8) {
        block.previousElementSibling.appendChild(block.firstChild);
      }
    });
  });

  bookCompletedPages.addEventListener('blur', e => {
    const max = book.totalPages;
    if (parseInt(e.target.value) > max) e.target.value = max;
    if (parseInt(e.target.value) === 0 || e.target.value === '')
      e.target.value = 1;
    book.completedPages = e.target.value;

    localStorage.setItem('books', JSON.stringify(booksLocal));
  });

  setInputFilter(bookCompletedPages, function (value) {
    return /^\d*?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  });
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

addBookBtn.addEventListener('click', e => {
  e.preventDefault();

  if (title.value === '' || author.value === '' || totalPages.value === '') {
    errMessage.textContent = 'Please, fill out all required fields.';
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

  errMessage.textContent = '';

  title.value = '';
  author.value = '';
  totalPages.value = '';
  completedPages.value = '';
});
