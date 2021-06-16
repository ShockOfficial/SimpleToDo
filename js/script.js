let $todoInput; // Miejsce gdzie użytkwonik wpisuje treść
let $alertInfo; // info o braku zadań / koniecznosci dodania tesktu
let $addBtn; // przycisk add dodaje nowe elementy do listy
let $ulList; // nasza lista zadań tag ul
let $newTask; // Nowe zadanie na liście

let $popup; // pobrany popup
let $popupInfo; // alert w popupie, jak się doda pusty teskt
let $editedTodo; //edytowany todo;
let $popupInput; // teskt wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk 'zatweirdź' w popup'ie;
let $closeTodoBtn; // przycisk od zamykania popup'a
let $idNumber = 0;
let $allTasks;
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};



// Pobieranie naszych elementów
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
};

//Nasłuchiwanie eventów
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
    $popupInput.addEventListener('keyup', enterCheck);


};

// funkcja służąca do dodawania nowych zadań do ToDo Listy.
const addNewTask = function() {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.textContent = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();
    } else {
        $alertInfo.innerText = "Wpisz treść zadania!";
    }
};


// Nasłuchiwanie entara.
const enterCheck = (e) => {
    if (e.key === 'Enter') {
        if (e.target.classList[0] === 'popupInput') {
            changeTodo();
        } else {
            addNewTask();
        }
    }

}

const createToolsArea = () => {
    let toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');

    let completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');

    let editBtn = document.createElement('button');
    editBtn.classList.add('edit');

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');

    $newTask.appendChild(toolsPanel);
    completeBtn.innerHTML = '<i class = "fas fa-check" > </i>';
    editBtn.innerText = 'EDIT';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
};

// zarzązanie kliknięcami w przyciski
const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').classList.contains('edit')) {
        editTask(e);

    } else if (e.target.closest('button').classList.contains('delete')) {

        deleteTask(e);
    }
};


// Edycja istniejącego zadania
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    $popupInfo.textContent = '';
    $popup.style.display = 'flex';
    $popupInput.focus();
};



const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.textContent = '';
    } else {
        $popupInfo.textContent = 'Musisz podać jakąś treść!';
    };

};

const closePopup = () => {
    $popup.style.display = 'none';
};


// Usuwanie zadania
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście.'
    };
};

document.addEventListener('DOMContentLoaded', main);