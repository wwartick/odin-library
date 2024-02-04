const addBookButton = document.querySelector('.add-book-button');
/* const removeButton = document.querySelectorAll('.remove');
const readButton = document.querySelectorAll('.change-read-status'); */
const dialog = document.querySelector('dialog');
const cancelBtn= dialog.querySelector('.cancel-button');
const submitBtn = dialog.querySelector('.submit-button');
const cardContainer = document.querySelector('.card-container');
let title = dialog.querySelector("#title");
let author = dialog.querySelector("#author");
let pages = dialog.querySelector("#pages");
let readStatus = dialog.querySelector('#readStatus');
const myLibrary = JSON.parse(localStorage.getItem('books')) || [];

function Book(title, author, pages, status, date) {
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.status = status;
    this.date = date;
}

function changeReadStatus(e) {
    console.log(e.target);
}
function removeCard(e) {
    console.log(e.target);
}

function generateCards(book){
    const cardDiv= document.createElement('div');
    const titleSpan=document.createElement('span');
    const authorSpan=document.createElement('span');
    const pagesSpan=document.createElement('span');
    const dateSpan=document.createElement('span');
    const btnContainer = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    //set classnames and content for each of the card areas
    cardDiv.className='card'
    titleSpan.textContent = book.title;
    titleSpan.className = 'title';
    authorSpan.textContent = 'Written by: ' + book.author;
    authorSpan.className = 'author';
    pagesSpan.textContent = 'Pages: ' + book.pages;
    pagesSpan.className = 'pages';
    dateSpan.textContent = 'Added on ' + book.date;
    dateSpan.className = 'date';

    //set classnames and content for the two buttons at the bottom
    btnContainer.className= 'card-button-container'
    removeBtn.textContent = 'Remove'
    removeBtn.className = 'card-button remove'
    readBtn.textContent = 'Read'
    readBtn.className = 'card-button change-read-status'

    //append info to card
    cardDiv.appendChild(titleSpan);
    cardDiv.appendChild(authorSpan)
    cardDiv.appendChild(pagesSpan);
    cardDiv.appendChild(dateSpan);

    //append buttons to button div + button div to main container
    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(readBtn);
    cardDiv.appendChild(btnContainer);

    //appends it all to the main container
    cardContainer.appendChild(cardDiv);
}

//gets the value from the form modal and creates a book with the inputs (if theyre inputted correctly)
function createBook(e){
    let bookTitle= title.value;
    let bookAuthor = author.value;
    let bookPages= pages.value;
    let bookStatus; 
    //gets current date on book creation
    let bookDate = new Date().toLocaleDateString();
    
    //sets true/false for if a book is read depending on checkbox status
    if(readStatus.checked === true ? bookStatus = true : bookStatus=false);

    //idk if this is actually necessary but it makes sure the form isnt empty? works though
    if(title.value === '' || author.value === '' || pages.value === ''||pages.value > 9999){
       return; 
    }   else{
        e.preventDefault();
        let submittedBook= new Book(bookTitle, bookAuthor, bookPages, bookStatus, bookDate);
        myLibrary.push(submittedBook);
        generateCards(submittedBook);
        localStorage.setItem('books', JSON.stringify(myLibrary));
    }
    //creates the card
    e.preventDefault();
/*     myLibrary.forEach((book) => generateCards(book)); */
    closeModal();
}

function closeModal() {
    //i get annoying console log errors that don't actually break anything if this isnt here
    //'event' might be deprecated, but i can't put an event parameter because of the submit
    //button also calling this event, and this works without causing useless errors so... it stays
    if(event.target.className == 'modal-button cancel-button'){
        event.preventDefault()
    }
    title.value ='';
    author.value ='';
    pages.value ='';
    readStatus.checked=false;
    dialog.close();
}

//event listeners

//loads stored books on window open
window.addEventListener('load', () => myLibrary.forEach((book) => generateCards(book)));
//shows modal
addBookButton.addEventListener('click', () => {dialog.showModal()});
//handles modal buttons
submitBtn.addEventListener('click', createBook)
cancelBtn.addEventListener('click', closeModal)