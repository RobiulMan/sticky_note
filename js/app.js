let search = document.querySelector('#searching')
let noteArea = document.querySelector('#note-area')
let noteTitle = document.querySelector('#title')
let dateSetter = document.querySelector('#set-dates')
let noteBodyText = document.querySelector('#body-text')
let addBtn = document.querySelector('#add-btn')
let colorBtn = document.querySelector('#color-btn')
let plates = document.querySelectorAll('.plate')


//l L

loadEventListners()
//load all event listeners
function loadEventListners() {
    //date function 
    dates()

    //add content function
    addBtn.addEventListener('click', addContent)

    //color vasiable event function
    colorBtn.addEventListener('click', colorvBtnVasiuble)
}

//add sticky note content
function addContent(e) {
    //check input filed
    if(noteTitle.value === '' && noteBodyText.value === '') {
        alert('add something')
        return false
    }

    //creat note element
    const rootNoteElement = elementMaker('div', 'modal-root col-md-6 col-lg-4')
    const seconderyNoteElement = elementMaker('div', 'modals')
    const noteContinerElement = elementMaker('div', 'modal-content')
    const noteHeadElement = elementMaker('div', 'modal-header')
    const noteHeadTextElemnt = elementMaker('h5', '')
    const notsBodyElement = elementMaker('div', 'modal-body')
    const noteBodyTextElement = elementMaker('p', 'lead fix-size')
    const notesDatesElement = elementMaker('div', 'dates mt-2 m col-8 d-flex justify-content-center')
    const notesDatesTextElement = elementMaker('small','')
    
    notesDatesTextElement.appendChild(document.createTextNode(`Last Update: ${dates()}`))
    notesDatesElement.appendChild(notesDatesTextElement)
    noteBodyTextElement.appendChild(document.createTextNode(noteBodyText.value))
    noteHeadTextElemnt.appendChild(document.createTextNode(noteTitle.value))
    noteContinerElement.appendChild(noteHeadElement)
    noteHeadElement.appendChild(noteHeadTextElemnt)
    noteContinerElement.appendChild(notesDatesElement)
    noteContinerElement.appendChild(notsBodyElement)
    notsBodyElement.appendChild(noteBodyTextElement)
    
    seconderyNoteElement.appendChild(noteContinerElement)
    rootNoteElement.appendChild(seconderyNoteElement)
    noteArea.appendChild(rootNoteElement)
    
    noteBodyText.value = ''
    noteTitle.value = ''
   
    

    e.preventDefault()
}


//color vasiable function
function colorvBtnVasiuble(e) {
    
    let getColorPrantElement = e.target.parentElement.parentElement.lastElementChild
    if(getColorPrantElement.classList[1] === undefined) {
        getColorPrantElement.className = 'color-plate active-color'
    }else {
        getColorPrantElement.className = 'color-plate'
    }
    e.preventDefault()
}
//this function makes element with class return the element
function elementMaker(tagName, nameOfClass) {
    const element = document.createElement(tagName)
    element.className = nameOfClass

    return element
}

//dates function 
function dates() {
    let monthName = ['January', 
    'February',
    'March',
    'April',
    'May', 
    'June', 
    'July', 
    'August', 
    'September',
    'October',
    'November',
    'December']
    let datemakers = new Date()
    dateSetter.innerHTML = `Today : ${datemakers.getDate()} ${monthName[datemakers.getMonth()]} ${datemakers.getFullYear()}`

    return `${datemakers.getDate()} ${monthName[datemakers.getMonth()]} ${datemakers.getFullYear()}`
}

// <div class="row" id="note-area">
// <div class="modal-root col-md-6 col-lg-4">
//   <div class="modals">
//     <div class="modal-content">

//       <div class="modal-header">
//         <input type="text" id="title" class="form-control modal-head-text" name="" id="" placeholder="Type a title ...">
//       </div>

//       <div class="dates mt-2 m col-7 d-flex justify-content-center">
//         <small id="set-dates">Today: 02 decumbor 2008</small>
//       </div>

//       <div class="modal-body">
//         <textarea id="body-text" class="form-control modal-head-text" placeholder="Type a description ..." ></textarea>
//       </div>

//       <div class="btns">
//         <div class=" d-flex justify-content-center">
//             <a href="#" class="icon-btn" id="add-btn">
//               <!-- <span class="material-icons"> post_add </span> -->
//               <span class="material-icons" > add_task </span>
//             </a>
//             <a href="#" class="icon-btn" id="color-btn">
//               <span class="material-icons"> palette </span>
//             </a>
          
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
