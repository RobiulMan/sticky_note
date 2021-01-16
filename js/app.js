let search = document.querySelector('#searching')
let noteArea = document.querySelector('#note-area')
let noteTitle = document.querySelector('#title')
let dateSetter = document.querySelector('#set-dates')
let noteBodyText = document.querySelector('#body-text')
let addBtn = document.querySelector('#add-btn')

//get html card element


/**
 * future i will implamentrion the color area
 */
// let colorBtn = document.querySelector('#color-btn')
// let plates = document.querySelectorAll('.plate')



//l L

loadEventListners()
//load all event listeners
function loadEventListners() {
    
    //DOM load event 
    document.addEventListener('DOMContentLoaded', getCard)
    
    //date function 
    dates()
    
    //add content event
    addBtn.addEventListener('click', addContent)

    //delete event 
    noteArea.addEventListener('click', deleteAction)

    //edit event 
    noteArea.addEventListener('click', editAction)

    // rewrightin event 
    noteArea.addEventListener('click', reWriteAction)

    //search event 
    search.addEventListener('keyup', searchingAction)
    
/**
* @color future i will implamentrion the color area
**/
    //color plate event 
    // colorBtn.addEventListener('click', colorvBtnPlate)

    // //color plate selectore event
    // plates.forEach(item => item.addEventListener('click', colorSelectore))
}

//get card from LS
function getCard() {
    let data;
    if(localStorage.getItem('data') === null) {
        data = []
    }else{
        data = JSON.parse(localStorage.getItem('data'))
    }
    data.forEach(function(item) {
        
    //creat note element
    const rootNoteElement = elementMaker('div', 'modal-root col-md-6 col-lg-4 mb-3')
    const seconderyNoteElement = elementMaker('div', 'modals')
    const noteContinerElement = elementMaker('div', 'modal-content')
    const noteHeadElement = elementMaker('div', 'modal-header')
    const noteHeadTextElemnt = elementMaker('h5', '')
    const notsBodyElement = elementMaker('div', 'modal-body')
    const noteBodyTextElement = elementMaker('p', 'fix-size')
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
    noteHeadTextElemnt.appendChild(document.createTextNode(item[0]))
    noteBodyTextElement.appendChild(document.createTextNode(item[1]))
    noteContinerElement.appendChild(noteHeadElement)
    noteHeadElement.appendChild(noteHeadTextElemnt)
    noteContinerElement.appendChild(notesDatesElement)
    noteContinerElement.appendChild(notsBodyElement)
    notsBodyElement.appendChild(noteBodyTextElement)
    noteContinerElement.appendChild(editeBtnElement)
    
    
    seconderyNoteElement.appendChild(noteContinerElement)
    rootNoteElement.appendChild(seconderyNoteElement)
    noteArea.appendChild(rootNoteElement)

    })
}

//sticky note event
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
    const rootNoteElement = elementMaker('div', 'modal-root col-md-6 col-lg-4 mb-3')
    const seconderyNoteElement = elementMaker('div', 'modals')
    const noteContinerElement = elementMaker('div', 'modal-content')
    const noteHeadElement = elementMaker('div', 'modal-header')
    const noteHeadTextElemnt = elementMaker('h5', '')
    const notsBodyElement = elementMaker('div', 'modal-body')
    const noteBodyTextElement = elementMaker('p', 'fix-size')
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

    
    storeDataFromLocalStoreage(noteTitle.value, noteBodyText.value)
    noteBodyText.value = ''
    noteTitle.value = ''
   
    

    e.preventDefault()
}



function storeDataFromLocalStoreage(title, bodyText) {
    let data;
    if(localStorage.getItem('data') === null) {
        data = []
    }else{
        data = JSON.parse(localStorage.getItem('data'))
    }
    data.push([title, bodyText])
    localStorage.setItem('data', JSON.stringify(data))
}


//delete card event
function deleteAction(e) {
    let pareantElement = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode

    //delet alert function
    const deletFunction = deleteAlert()
    deletFunction.style.display = 'block';

    if(e.target.parentNode.classList.contains('removeBtn')) {

        document.body.appendChild(deletFunction)
        
        const asscessdeletFunProp = deletFunction.firstChild.firstChild.firstChild.lastElementChild.childNodes
        document.body.firstElementChild.style.filter = 'blur(8px)';
        
        
       //delet alert delete btn event
        asscessdeletFunProp[1].addEventListener('click', (e) => {
            pareantElement.remove('modal-root')
            removeCardFromLocalStoreage(pareantElement)
            
            //remove from LS
            deletFunction.remove()
            document.body.firstElementChild.removeAttribute('style')
            
            e.preventDefault()
        })

       //delet alert cancle btn event
        asscessdeletFunProp[0].addEventListener('click', (e) => {
            deletFunction.remove()
            document.body.firstElementChild.removeAttribute('style')
            e.preventDefault()
        })
       
        
       
        
        console.log(deletFunction)
        
    }
    e.preventDefault()
}

//remove from LS
function removeCardFromLocalStoreage(cardItem) {
    //carrent element textContent selected 
    let cartItemsTite = cardItem.firstChild.firstChild.firstChild.firstChild.textContent
    
    let data;
    if(localStorage.getItem('data') === null) {
        data = []
    }else{
        data = JSON.parse(localStorage.getItem('data'))
    }
    
    data.forEach(function(item, index) {
        if(cartItemsTite === item[0]) { data.splice(index, 1) }
    })

    localStorage.setItem('data', JSON.stringify(data))
    
}

//edit content action
function editAction(e) {
    let parentElement, headerText, bodyText, headTextElemnt, bodyTextElemnt, editButton;
    

    if(e.target.parentNode.classList.contains('editBtn')) {
            parentElement = e.target.parentNode.parentNode.parentNode.parentNode
            headerText = parentElement.childNodes[0].childNodes[0].innerText
            bodyText = parentElement.childNodes[2].childNodes[0].innerText
            headTextElemnt = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].firstChild
            bodyTextElemnt = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[2].firstChild
            editButton = e.target.parentNode.parentNode.parentNode.parentNode.lastChild.firstChild.firstChild
            // console.log(editButton.classList.contains('editBtn'))

        const reWriteItem  = elementMaker('a', 'icon-btn rewrite')
        reWriteItem.innerHTML = `<span class="material-icons" > add_task </span>`

            
        //creat
        const inputItem = elementMaker('input', 'form-control modal-head-text')
        inputItem.value = headerText
        const textareaItem = elementMaker('textarea', 'form-control modal-head-text')
        textareaItem.setAttribute('gramm_editor', 'false')
        textareaItem.value = bodyText

        
        editButton.parentNode.replaceChild(reWriteItem, editButton)
        headTextElemnt.parentNode.replaceChild(inputItem ,headTextElemnt)
        bodyTextElemnt.parentNode.replaceChild(textareaItem , bodyTextElemnt)
        
        
        
    }
    e.preventDefault()
}

function reWriteAction(e) {
    
    let data;
    if(localStorage.getItem('data') === null) {
        data = []
    }else{
        data = JSON.parse(localStorage.getItem('data'))
    }
    let parentElement, headerText, bodyText, reWriteBtn;
    if(e.target.parentNode.classList.contains('rewrite')) {
        
        parentElement = e.target.parentNode.parentNode.parentNode.parentNode
        headerText = parentElement.firstChild.firstChild
        bodyText = parentElement.childNodes[2].firstChild
        reWriteBtn = e.target.parentNode.parentNode.parentNode.parentNode.lastChild.firstChild.firstChild

        

        const editBtn  = elementMaker('a', 'icon-btn editBtn')
        editBtn.innerHTML = `<span class="material-icons">edit</span>`

        const headerTextElement = elementMaker('h5', '')
        headerTextElement.appendChild(document.createTextNode(headerText.value))
        const bodyTextElement = elementMaker('p', 'fix-size')
        bodyTextElement.setAttribute('gramm_editor', 'false')
        bodyTextElement.appendChild(document.createTextNode(bodyText.value))

        
        
        headerText.parentNode.replaceChild(headerTextElement, headerText)
        bodyText.parentNode.replaceChild(bodyTextElement, bodyText)
        reWriteBtn.parentNode.replaceChild(editBtn, reWriteBtn)
        

        //selected element notes
        let [skip, ...noteAreasElement] = noteArea.children
        
        data.forEach(function(item, index) {
            if(noteAreasElement[index] === parentElement.parentNode.parentNode){
                data[index] = [headerText.value, bodyText.value]
            }
               
        })
        localStorage.setItem('data', JSON.stringify(data))
        
    }
    e.preventDefault()
    
}

//searching event
function searchingAction(e) {
    const text = e.target.value.toLowerCase()

    const [skip, ...cardItem]= document.querySelectorAll('.modal-root')

    cardItem.forEach(function(items) {
        const item = items.firstChild.firstChild.firstChild.firstChild
        if(item.textContent.toLowerCase().indexOf(text) != -1) {
            items.style.display = 'block'
        }else{
            items.style.display = 'none'
        }
    })
    e.preventDefault()
}


// //color plate function
// function colorvBtnPlate(e) {
//     let getColorPrantElement = e.target.parentElement.parentElement.lastElementChild.classList
    
//     getColorPrantElement.toggle('active-color')
//     e.preventDefault()
// }






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




/**
 * @reuseable function 
**/

//dates function 
function dates() {
   
    let datemakers = new Date()
    var todyDates = datemakers.toUTCString().match(/\d{2}.*\d{4}/g).join('')
    dateSetter.innerHTML = `Today : ${todyDates}`

    return todyDates
}

//this function makes element with class return the element
function elementMaker(tagName, nameOfClass) {
    const element = document.createElement(tagName)
    element.className = nameOfClass

    return element
}

function deleteAlert() {
    const root = elementMaker('div', 'alert-box')
    const deletAlertBox = elementMaker('div', 'col-6 d-flex justify-content-center')
    const deletbox = elementMaker('div', 'alerts position-absolute p-5 bg-light top-50 start-50 translate-middle')
    
    const deletContent = elementMaker('div', 'alert-content')
    const deletHeader = elementMaker('div', 'alert-header')
    // const modalHeader = elementMaker('div', 'modal-header')
    const headerText = elementMaker('p', 'h5')
    headerText.innerText = 'are you sure?'
    deletHeader.appendChild(headerText)

    const deletAlertBody = elementMaker('div', 'alert-body') 
    const deletAlertBodyText = elementMaker('p','lead')
    deletAlertBodyText.innerText = 'do you want delete item'
    deletAlertBody.appendChild(deletAlertBodyText)
    
    const deletAlertBtn = elementMaker('div', 'd-flex justify-content-center')
    const btnCancle = elementMaker('button', 'cancle')
    btnCancle.innerText = 'Cancle'
    const btnDelete = elementMaker('button', 'delete')
    btnDelete.innerText = 'Delete'

    deletAlertBtn.appendChild(btnCancle)
    deletAlertBtn.appendChild(btnDelete)

    deletContent.appendChild(deletHeader)
    deletContent.appendChild(deletAlertBody)
    deletContent.appendChild(deletAlertBtn)
    deletbox.appendChild(deletContent)
    deletAlertBox.appendChild(deletbox)
    root.appendChild(deletAlertBox)
    
    return root
    
//     <div class="alert-box">
//     <div class="col-6 d-flex justify-content-center">
//       <div class="position-absolute p-5 bg-light top-50 start-50 translate-middle">
//         <div class="alert-content">
//           <div class="alert-header ">
//             <p class="h5">are you suere?</p>
//           </div>
//           <div class="alert-body mt-3 mb-3">
//             <p>do you want delete item </p>
//           </div>
//           <div class="d-flex justify-content-center">
//             <button class="cancle">Cancle</button>
//             <button class="delete">Delete</button>
//           </div>
//         </div>
//       </div>

//     </div>
//   </div>
    
}
// const deletA = deleteAlert()
// deletA.style.display = 'block';
// console.log(document.body.appendChild(deletA))
