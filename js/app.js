let search = document.querySelector('#searching')
let noteArea = document.querySelector('#note-area')
let noteTitle = document.querySelector('#title')
let dateSetter = document.querySelector('#set-dates')
let noteBodyText = document.querySelector('#body-text')
let addBtn = document.querySelector('#add-btn')


/**
 * future i will implamentrion the color area
 */
// let colorBtn = document.querySelector('#color-btn')
// let plates = document.querySelectorAll('.plate')



//l L

loadEventListners()
//load all event listeners
function loadEventListners() {
    //date function 
    dates()
    
    //add content event
    addBtn.addEventListener('click', addContent)

    //delete event 
    noteArea.addEventListener('click', deleteAction)

    //edit event 
    noteArea.addEventListener('click', editAction)

    //rewrightin event 
    // noteArea.addEventListener('click', rewrightAction)
    
/**
* future i will implamentrion the color area
*/
    //color plate event 
    // colorBtn.addEventListener('click', colorvBtnPlate)

    // //color plate selectore event
    // plates.forEach(item => item.addEventListener('click', colorSelectore))
}

//add sticky note content
function addContent(e) {
    //check input filed
    if(noteTitle.value === '') {
        alert('add something')
        return false
    }
    if(noteBodyText.value === '') {
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

    //button area
    const editeBtnElement = elementMaker('div', 'btns')
    const editeBtnContents = elementMaker('div', 'd-flex justify-content-center')
    const editBtn = elementMaker('a', 'icon-btn editBtn')
    const editBtnIcon =  elementMaker('span', 'material-icons')
    const deleteBtn = elementMaker('a', 'icon-btn removeBtn')
    const deleteBtnIcon = elementMaker('span', 'material-icons')

    

    
    editBtnIcon.appendChild(document.createTextNode('edit'))
    editBtn.appendChild(editBtnIcon)
    editeBtnContents.appendChild(editBtn)
    editeBtnElement.appendChild(editeBtnContents)

    
    deleteBtnIcon.appendChild(document.createTextNode('delete_outline'))
    deleteBtn.appendChild(deleteBtnIcon)
    editeBtnContents.appendChild(deleteBtn)

    // <span class="material-icons" > add_task </span>
    notesDatesTextElement.appendChild(document.createTextNode(`Last Update: ${dates()}`))
    notesDatesElement.appendChild(notesDatesTextElement)
    noteBodyTextElement.appendChild(document.createTextNode(noteBodyText.value))
    noteHeadTextElemnt.appendChild(document.createTextNode(noteTitle.value))
    noteContinerElement.appendChild(noteHeadElement)
    noteHeadElement.appendChild(noteHeadTextElemnt)
    noteContinerElement.appendChild(notesDatesElement)
    noteContinerElement.appendChild(notsBodyElement)
    notsBodyElement.appendChild(noteBodyTextElement)
    noteContinerElement.appendChild(editeBtnElement)
    
    
    seconderyNoteElement.appendChild(noteContinerElement)
    rootNoteElement.appendChild(seconderyNoteElement)
    noteArea.appendChild(rootNoteElement)

    noteBodyText.value = ''
    noteTitle.value = ''
   
    

    e.preventDefault()
}


//delete button event
function deleteAction(e) {
    let pareantElement = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    
    if(e.target.parentNode.classList.contains('removeBtn')) {
        pareantElement.remove('modal-root')
    }
    
    
}

//edit content action
function editAction(e) {
    let parentElement, headerText, bodyText, headTextElemnt, bodyTextElemnt, button;

    if(e.target.parentNode.classList.contains('editBtn')) {
            parentElement = e.target.parentNode.parentNode.parentNode.parentNode
            headerText = parentElement.childNodes[0].childNodes[0].innerText
            bodyText = parentElement.childNodes[2].childNodes[0].innerText
            headTextElemnt = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].firstChild
            bodyTextElemnt = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[2].firstChild
            button = e.target.parentNode.parentNode.parentNode.parentNode.lastChild.firstChild.firstChild
            console.log(parentElement)

            const addItem  = elementMaker('a', 'icon-btn')
            addItem.innerHTML = `<span class="material-icons" > add_task </span>`

            
        //creat
        const inputItem = elementMaker('input', 'form-control modal-head-text')
        inputItem.value = headerText
        const textareaItem = elementMaker('textarea', 'form-control modal-head-text')
        textareaItem.value = bodyText
        
        button.parentNode.replaceChild(addItem, button)
        headTextElemnt.parentNode.replaceChild(inputItem ,headTextElemnt)
        bodyTextElemnt.parentNode.replaceChild(textareaItem , bodyTextElemnt)

        button.addEventListener('click', function(e) {
            
        })
        
        
    }
}


// //color plate function
// function colorvBtnPlate(e) {
//     let getColorPrantElement = e.target.parentElement.parentElement.lastElementChild.classList
    
//     getColorPrantElement.toggle('active-color')
//     e.preventDefault()
// }


//this function makes element with class return the element
function elementMaker(tagName, nameOfClass) {
    const element = document.createElement(tagName)
    element.className = nameOfClass

    return element
}

// //color plate event function 
// function colorSelectore(e) {
//     let noteParent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
    
//     for(let i = 0; i < plates.length; i++) {
//         if(e.target.classList[1] === plates[i].classList[1]) {
//             e.target.classList.add('selector')
//             noteParent.classList = `modal-content ${plates[i].classList[1]}`
//             noteTitle.classList = `form-control modal-head-text ${plates[i].classList[1]}`
//             noteBodyText.classList = `form-control modal-head-text ${plates[i].classList[1]}`
            
//         }else{
//             plates[i].classList.remove('selector')
//         }
//     }
//     e.preventDefault()
// }


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
