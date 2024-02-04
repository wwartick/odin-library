const addBookButton = document.querySelector('.add-book-button');
const removeButton = document.querySelectorAll('.remove');
const readButton = document.querySelectorAll('.change-read-status');
const dialog = document.querySelector('dialog');
const cancelBtn= dialog.querySelector('.cancel-button');
const submitBtn = dialog.querySelector('.submit-button');
let title = dialog.querySelector("#title");
let author = dialog.querySelector("#author");
let pages = dialog.querySelector("#pages");
let readStatus = dialog.querySelector('#readStatus');
const myLibrary =[];

function Book(title, author, pages, status) {
    this.title = title;
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

function createBook(e){
    let bookTitle= title.value;
    let bookAuthor = author.value;
    let bookPages= pages.value;
    let bookStatus; 

    if(readStatus.checked === true ? bookStatus = true : bookStatus=false);
    if(title.value === '' || author.value === '' || pages.value === ''){
       return;
    }   else{
        myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookStatus));
    }
    e.preventDefault();
}

readButton.forEach(button => button.addEventListener('click', changeReadStatus))
removeButton.forEach(button => button.addEventListener('click', removeCard))
addBookButton.addEventListener('click', () => {dialog.showModal()});
submitBtn.addEventListener('click', createBook)
cancelBtn.addEventListener('click', (e) => { 
    e.preventDefault();
    title.value ='';
    author.value ='';
    pages.value ='';
    readStatus.checked=false;
    dialog.close();
})