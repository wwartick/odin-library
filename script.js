const addBookButton = document.querySelector('.add-book-button');
/* const removeButton = document.querySelectorAll('.remove');
const readButton = document.querySelectorAll('.change-read-status'); */
const dialog = document.querySelector('dialog');
const cancelBtn= dialog.querySelector('.cancel-button');
const submitBtn = dialog.querySelector('.submit-button');
const cardContainer = dialog.querySelector('.card-container');
let title = dialog.querySelector("#title");
let author = dialog.querySelector("#author");
let pages = dialog.querySelector("#pages");
let readStatus = dialog.querySelector('#readStatus');
const myLibrary =[];

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

function generateCards(){
    const cardDiv= document.createElement('div');
    const titleSpan=document.createElement('span');
    const authorSpan=document.createElement('span');
    const pagesSpan=document.createElement('span');
    const dateSpan=document.createElement('span');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    myLibrary.forEach((book) =>{
        

        /* titleSpan.textContent = book.title;
        titleSpan.className = 'title';
        authorSpan.textContent = book.author;
        authorSpan.className = 'author';
        pagesSpan.textContent = book.pages;
        pagesSpan.className = 'pages';
        dateSpan.textContent = book.date;
        dateSpan.className = 'date';
        removeBtn.textContent = 'remove'
        removeBtn.className = 'card-button remove'
        readBtn.textContent = 'Read'
        removeBtn.className = 'card-button change-read-status'

        cardDiv.appendChild(titleSpan);
        cardDiv.appendChild(pagesSpan);
        cardDiv.appendChild(dateSpan);
        cardDiv.appendChild(removeBtn);
        cardDiv.appendChild(readBtn);
        cardContainer.appendChild(cardDiv); */
    })


   console.log(myLibrary);
    
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
    if(title.value === '' || author.value === '' || pages.value === ''){
       return;
    }   else{
        myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookStatus, bookDate));
    }
    //creates the card
    e.preventDefault();
    generateCards();
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
/* readButton.forEach(button => button.addEventListener('click', changeReadStatus))
removeButton.forEach(button => button.addEventListener('click', removeCard)) */
addBookButton.addEventListener('click', () => {dialog.showModal()});
submitBtn.addEventListener('click', createBook)
//closes the modal, clears the fields, doesn't send the data
cancelBtn.addEventListener('click', closeModal)