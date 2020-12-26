const search = document.querySelector('#searching')
const noteArea = document.querySelector('#note-area')
const noteTitle = document.querySelector('#title')
const dateSetter = document.querySelector('#set-dates')
const noteBodyText = document.querySelector('#body-text')
const addBtn = document.querySelector('#add-btn')
const colorBtn = document.querySelector('#color-btn')
//l L

loadEventListners()
//load all event listeners
function loadEventListners() {
    
    addBtn.addEventListener('click', addContent)
}

//add sticky note content
function addContent(e) {
    //check input filed
    if(noteTitle.value === '' || noteBodyText.value === '') {
        alert('add something')
    }

    //creat note element
    const rootNoteElement = elementMaker('div', 'modal-root col-md-6 col-lg-4')
    const seconderyNoteElement = elementMaker('div', 'modals')
    const noteContinerElement = elementMaker('div', 'modal-content')
    const noteHeadElement = elementMaker('div', 'modal-header')
    const noteHeadTextElemnt = elementMaker('p', 'lead')
    const notsBodyElement = elementMaker('div', 'modal-body')
    const noteBodyTextElement = elementMaker('p', 'lead')

    noteBodyTextElement.appendChild(document.createTextNode(noteBodyText.value))
    noteHeadTextElemnt.appendChild(document.createTextNode(noteTitle.value))
    noteContinerElement.appendChild(noteHeadElement)
    noteHeadElement.appendChild(noteHeadTextElemnt)
    noteContinerElement.appendChild(notsBodyElement)
    notsBodyElement.appendChild(noteBodyTextElement)
    
    seconderyNoteElement.appendChild(noteContinerElement)
    rootNoteElement.appendChild(seconderyNoteElement)
    noteArea.appendChild(rootNoteElement)
    

    e.preventDefault()

    
}

//this function makes element with class return the element
function elementMaker(tagName, nameOfClass) {
    const element = document.createElement(tagName)
    element.className = nameOfClass

    return element
}


// <div class="modal-root col-md-6 col-lg-4">
// <div class="modals">
//   <div class="modal-content">
//     <div class="modal-header">
//       <input type="text" id="title" class="form-control modal-head-text" name="" id="" placeholder="type you heading">
//     </div>
//     <div class="dates mt-2 m col-8 d-flex align-self-center justify-content-center">
//       <p id="set-dates">Today: 02 decumbor 2008</p>
//     </div>
//     <div class="modal-body">
//       <textarea name="" id="body-text" class="form-control modal-head-text" id="" cols="" rows=""></textarea>
//     </div>

//     <div class="btns">
//       <div class=" d-flex justify-content-center">
//           <a href="#" class="icon-btn" id="add-btn">
//             <!-- <span class="material-icons"> post_add </span> -->
//             <span class="material-icons" > add_task </span>
//           </a>
//           <a href="#" class="icon-btn" id="color-btn">
//             <span class="material-icons"> palette </span>
//           </a>
        
//       </div>
//     </div>
//   </div>
// </div>
// </div>