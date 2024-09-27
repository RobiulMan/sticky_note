// DOM Element Selectors
const search = document.querySelector('#searching');
const noteArea = document.querySelector('#note-area');
const noteTitle = document.querySelector('#title');
const dateSetter = document.querySelector('#set-dates');
const noteBodyText = document.querySelector('#body-text');
const addBtn = document.querySelector('#add-btn');

// Event Listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getCard);
    addBtn.addEventListener('click', addContent);
    noteArea.addEventListener('click', deleteAction);
    noteArea.addEventListener('click', editAction);
    noteArea.addEventListener('click', reWriteAction);
    search.addEventListener('keyup', searchingAction);
}

loadEventListeners();
updateDateDisplay();

// Core Functions
function getCard() {
    const data = getDataFromLocalStorage();
    data.forEach(createNoteElement);
}

function addContent(e) {
    e.preventDefault();
    if (noteTitle.value === '' || noteBodyText.value === '') {
        alert('Please add a title and content');
        return;
    }
    createNoteElement([noteTitle.value, noteBodyText.value]);
    storeDataInLocalStorage(noteTitle.value, noteBodyText.value);
    clearInputFields();
}

function deleteAction(e) {
    if (!e.target.closest('.removeBtn')) return;
    e.preventDefault();
    const parentElement = e.target.closest('.modal-root');
    showDeleteConfirmation(parentElement);
}

function editAction(e) {
    if (!e.target.closest('.editBtn')) return;
    e.preventDefault();
    const parentElement = e.target.closest('.modal-content');
    enableEditMode(parentElement);
}

function reWriteAction(e) {
    if (!e.target.closest('.rewrite')) return;
    e.preventDefault();
    const parentElement = e.target.closest('.modal-content');
    saveEditedNote(parentElement);
}

function searchingAction(e) {
    const searchText = e.target.value.toLowerCase();
    const noteCards = document.querySelectorAll('.modal-root');
    noteCards.forEach(card => {
        const title = card.querySelector('.modal-header h5').textContent.toLowerCase();
        card.style.display = title.includes(searchText) ? 'block' : 'none';
    });
}

// Helper Functions
function createNoteElement(noteData) {
    const [title, body] = noteData;
    const noteElement = createElementWithClass('div', 'modal-root col-md-6 col-lg-4 mb-3');
    noteElement.innerHTML = `
        <div class="modals">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>${title}</h5>
                </div>
                <div class="dates mt-2 m col-8 d-flex justify-content-center">
                    <small>Last Update: ${getCurrentDate()}</small>
                </div>
                <div class="modal-body">
                    <p class="fix-size">${body}</p>
                </div>
                <div class="btns">
                    <div class="d-flex justify-content-center">
                        <a class="icon-btn editBtn"><span class="material-icons">edit</span></a>
                        <a class="icon-btn removeBtn"><span class="material-icons">delete_outline</span></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    noteArea.appendChild(noteElement);
}

function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('data')) || [];
}

function storeDataInLocalStorage(title, bodyText) {
    const data = getDataFromLocalStorage();
    data.push([title, bodyText]);
    localStorage.setItem('data', JSON.stringify(data));
}

function removeCardFromLocalStorage(cardItem) {
    const title = cardItem.querySelector('.modal-header h5').textContent;
    const data = getDataFromLocalStorage().filter(item => item[0] !== title);
    localStorage.setItem('data', JSON.stringify(data));
}

function showDeleteConfirmation(parentElement) {
    const alertBox = createDeleteAlertBox();
    document.body.appendChild(alertBox);
    document.body.firstElementChild.style.filter = 'blur(8px)';
    
    const cancelBtn = alertBox.querySelector('.cancle');
    const deleteBtn = alertBox.querySelector('.delete');
    
    cancelBtn.addEventListener('click', removeAlertBox);
    deleteBtn.addEventListener('click', () => {
        parentElement.remove();
        removeCardFromLocalStorage(parentElement);
        removeAlertBox();
    });
}

function enableEditMode(parentElement) {
    const headerText = parentElement.querySelector('.modal-header h5');
    const bodyText = parentElement.querySelector('.modal-body p');
    const editButton = parentElement.querySelector('.editBtn');

    const inputItem = createElementWithClass('input', 'form-control modal-head-text');
    inputItem.value = headerText.textContent;
    const textareaItem = createElementWithClass('textarea', 'form-control modal-head-text');
    textareaItem.value = bodyText.textContent;

    headerText.replaceWith(inputItem);
    bodyText.replaceWith(textareaItem);
    editButton.replaceWith(createRewriteButton());
}

function saveEditedNote(parentElement) {
    const headerInput = parentElement.querySelector('.modal-header input');
    const bodyTextarea = parentElement.querySelector('.modal-body textarea');
    const rewriteBtn = parentElement.querySelector('.rewrite');

    const headerTextElement = createElementWithClass('h5', '');
    headerTextElement.textContent = headerInput.value;
    const bodyTextElement = createElementWithClass('p', 'fix-size');
    bodyTextElement.textContent = bodyTextarea.value;

    headerInput.replaceWith(headerTextElement);
    bodyTextarea.replaceWith(bodyTextElement);
    rewriteBtn.replaceWith(createEditButton());

    updateLocalStorage(parentElement);
}

function updateLocalStorage(parentElement) {
    const data = getDataFromLocalStorage();
    const index = Array.from(noteArea.children).indexOf(parentElement.closest('.modal-root'));
    data[index] = [
        parentElement.querySelector('.modal-header h5').textContent,
        parentElement.querySelector('.modal-body p').textContent
    ];
    localStorage.setItem('data', JSON.stringify(data));
}

// Utility Functions
function createElementWithClass(tagName, className) {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

function getCurrentDate() {
    return new Date().toUTCString().match(/\d{2}.*\d{4}/g).join('');
}

function updateDateDisplay() {
    dateSetter.innerHTML = `Today: ${getCurrentDate()}`;
}

function clearInputFields() {
    noteTitle.value = '';
    noteBodyText.value = '';
}

function createDeleteAlertBox() {
    const alertBox = createElementWithClass('div', 'alert-box');
    alertBox.innerHTML = `
        <div class="col-6 d-flex justify-content-center">
            <div class="alerts position-absolute p-5 bg-light top-50 start-50 translate-middle">
                <div class="alert-content">
                    <div class="alert-header">
                        <p class="h5">Are you sure?</p>
                    </div>
                    <div class="alert-body mt-3 mb-3">
                        <p class="lead">Do you want to delete this item?</p>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="cancle">Cancel</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return alertBox;
}

function removeAlertBox() {
    document.querySelector('.alert-box').remove();
    document.body.firstElementChild.removeAttribute('style');
}

function createRewriteButton() {
    const rewriteBtn = createElementWithClass('a', 'icon-btn rewrite');
    rewriteBtn.innerHTML = '<span class="material-icons">add_task</span>';
    return rewriteBtn;
}

function createEditButton() {
    const editBtn = createElementWithClass('a', 'icon-btn editBtn');
    editBtn.innerHTML = '<span class="material-icons">edit</span>';
    return editBtn;
}