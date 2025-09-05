const form = document.getElementById('form');
const addNewBookBtn = document.getElementById('add-new-book');
const tracker = document.getElementById('tracker');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const descriptionInput = document.getElementById('description');
const addBookBtn = document.getElementById('add-book');
const closeFormBtn = document.getElementById('x');

const popUp = document.getElementById('modal');
const cancelBtn = document.getElementById('cancel');
const discardBtn = document.getElementById('discard');

function hideTracker(){
addNewBookBtn.classList.toggle('hide-tracker');
tracker.classList.toggle('hide-tracker');
}
hideTracker();

function openForm(){
hideTracker();
form.classList.toggle('hide');
}
addNewBookBtn.addEventListener('click',openForm);

const bookData = [];
let currentBook = {};


const addEntry = (e)=>{
    e.preventDefault();
if(!titleInput.value.trim()){
    alert('enter a value');
    return;
}

    const bookArrIndex = bookData.findIndex((item)=>currentBook.id === item.id);
    const book ={
        id : currentBook.id || `${titleInput.value.trim().toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: `${titleInput.value}`,
        author: `${authorInput.value}`,
        description: `${descriptionInput.value}`
    }
   if(bookArrIndex===-1){
    bookData.unshift(book);
   } else{
    bookData[bookArrIndex]=book;
   }
//    bookData.unshift(book);
updateBook();
    openForm();
    reset();
}
 const updateBook =()=>{
        tracker.innerHTML="";
    bookData.forEach(({id,title,author,description})=>{
        tracker.innerHTML += `<div id="${id}">
                <p><strong>Title: </strong>${title}</p>
                <p><strong>Author: </strong>${author}</p>
                <p><strong>Description: </strong>${description}</p>
                <button onclick="editBook(this)">Edit</button>
                <button onclick="deleteBook(this)">Delete</button>
                </div>`
    })
}
form.addEventListener('submit',addEntry)
const reset = ()=>{
    titleInput.value = "";
    authorInput.value = "";
    descriptionInput.value= "";
    currentBook = {};
addBookBtn.innerText= "Add Book";
}

discardBtn.addEventListener('click',discardForm);
function discardForm(){
    reset();
    openForm();
    popUp.close();
}

function cancelExit(){
    popUp.close();
}
cancelBtn.addEventListener('click',cancelExit);

function closeForm(){
    popUp.showModal();
}
closeFormBtn.addEventListener('click',closeForm);

const editBook = (buttonEl)=>{
    const bookArrIndex = bookData.findIndex((item)=>item.id === buttonEl.parentElement.id);
    currentBook = bookData[bookArrIndex];
     titleInput.value = currentBook.title;
  authorInput.value = currentBook.author;
  descriptionInput.value = currentBook.description;
  addBookBtn.innerText = "update book";
  
  openForm();
}
const deleteBook =(buttonEl)=>{
    const bookArrIndex = bookData.findIndex((item)=>item.id===buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    bookData.splice(bookArrIndex,1);
}