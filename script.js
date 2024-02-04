const addBookButton = document.querySelector('.add-book-button');
const removeButton = document.querySelectorAll('.remove');
const readButton = document.querySelectorAll('.change-read-status');
const dialog = document.querySelector('dialog');
const myLibrary =[];

function Book(title, author, pages, status) {
    this.title=title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function changeReadStatus() {
    console.log(event.target);
}
function removeCard() {
    console.log(event.target);
}
function addBookToLibrary() {
    dialog.showModal();
}


readButton.forEach(button => button.addEventListener('click', changeReadStatus))
removeButton.forEach(button => button.addEventListener('click', removeCard))
addBookButton.addEventListener('click', addBookToLibrary);