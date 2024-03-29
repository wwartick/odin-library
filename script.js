const addBookButton = document.querySelector('.add-book-button');
const dialog = document.querySelector('dialog');
const cancelBtn= dialog.querySelector('.cancel-button');
const submitBtn = dialog.querySelector('.submit-button');
const cardContainer = document.querySelector('.card-container');
const myLibrary = JSON.parse(localStorage.getItem('books')) || [];

//book constructor
class Book{
    constructor(title, author, pages, bookStatus, bookDate){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.bookStatus = bookStatus;
        this.bookDate = bookDate;
    }
}

//event delegator for dynamically created cards
function cardButtonHandler(e){
    //if the remove button is selected, this will find the index of the card
    //and remove it from the library array and local storage,
    //and then reload the page to delete the card
    if(e.target.className === 'card-button remove' ){
        let index = e.target.parentNode.parentNode.id;
        myLibrary.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(myLibrary));
        location.reload();
    }

    //if read/not read button is pressed, it changes the background and text of
    //the card. also gets the index of the selected card/book and changes the
    //read status, and then sets it in local storage as well
    if(e.target.className === 'card-button change-read-status'){
        let index = e.target.parentNode.parentNode.id;
        if (e.target.parentNode.parentNode.className === 'card unread-book'){
            e.target.parentNode.parentNode.className = 'card read-book';
            e.target.textContent= 'Not read';
            myLibrary[index].bookStatus = !myLibrary[index].bookStatus;
        } else {
            e.target.parentNode.parentNode.className = 'card unread-book';
            e.target.textContent= 'Read';
            myLibrary[index].bookStatus = !myLibrary[index].bookStatus;
        }
        localStorage.setItem('books', JSON.stringify(myLibrary));
    }
}

//creates card based on form input
function generateCards(book){
    //create all the necessary elements with these vars
    const cardContainer = document.querySelector('.card-container');
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
    cardDiv.id=myLibrary.indexOf(book)
    if(book.bookStatus ? cardDiv.classList.add('read-book') : cardDiv.classList.add('unread-book'));
    titleSpan.textContent = book.title;
    titleSpan.className = 'title';
    authorSpan.textContent = 'Written by: ' + book.author;
    authorSpan.className = 'author';
    pagesSpan.textContent = 'Pages: ' + book.pages;
    pagesSpan.className = 'pages';
    dateSpan.textContent = 'Added on ' + book.bookDate;
    dateSpan.className = 'date';
    //set classnames and content for the two buttons at the bottom
    btnContainer.className= 'card-button-container'
    removeBtn.textContent = 'Remove'
    removeBtn.className = 'card-button remove'
    if(book.bookStatus ? readBtn.textContent = 'Not read' : readBtn.textContent = 'Read')
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
    let title = dialog.querySelector("#title");
    let author = dialog.querySelector("#author");
    let pages = dialog.querySelector("#pages");
    let readStatus = dialog.querySelector('#readStatus');
    //gets current date on book creation
    let bookDate = new Date().toLocaleDateString();
    //sets true/false for if a book is read depending on checkbox status
    if(readStatus.checked === true ? readStatus.value = true : readStatus.value=false);
    // validates that the form isnt empty and page value is correct
    if(title.value === '' || author.value === '' || pages.value === ''||pages.value > 10000){
       return; 
    }   else{
        //creates the card
        e.preventDefault();
        let submittedBook= new Book(title.value, author.value, pages.value, readStatus.value, bookDate);
        myLibrary.push(submittedBook);
        generateCards(submittedBook);
        localStorage.setItem('books', JSON.stringify(myLibrary));
    }
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

//on page load, generates cards for books
myLibrary.forEach((book) => generateCards(book));
//event listeners
//shows modal
addBookButton.addEventListener('click', () => {dialog.showModal()});
cardContainer.addEventListener('click', cardButtonHandler)
//handles modal buttons
submitBtn.addEventListener('click', createBook)
cancelBtn.addEventListener('click', closeModal)