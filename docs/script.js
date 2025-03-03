//get the html elements

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');

//create a task counter
var taskCtr = 0;

//create array to save to local storage
var taskArray = [];

//add event listener to the form

taskForm.addEventListener('submit', addTask);

//function to add task

function addTask(event){
    event.preventDefault()
    const taskText = taskInput.value.trim();
    
    if(taskText !== ""){
        const taskItem = document.createElement('li');
        
        /* //Opción 1: Crear todos los elementos con innerHTML
        taskItem.innerHTML = `
        <input type="checkbox" id = 'taskCheck' class = 'm-2'/><span id="${taskText}" contentEditable="true" class="task-text">${taskText}</span>
        <button id = 'delete-btn' class ='bg-red-600 m-2 px-2 rounded-full text-xs text-gray-300'>X</button>`;
        */ //Opción 2: Crear elemento por elemento y usar append. Optimizar con una función que cree todos lo elementos.

        const input = document.createElement('input');
        const span = document.createElement('span');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('X');
        const spanText = document.createTextNode(taskText);
        input.type = 'checkbox';
        input.id = 'taskCheck';
        input.setAttribute('class','mr-2 ml-3');
        span.id = taskText;
        span.contentEditable = 'true';
        span.setAttribute('class','task-text');
        btn.id = 'delete-btn';
        btn.setAttribute('class', 'bg-red-600 m-2 px-2 rounded-full text-xs text-gray-300');
        btn.appendChild(btnText);
        span.appendChild(spanText);
        taskList.append(taskItem);
        taskItem.appendChild(input);
        taskItem.appendChild(span);
        taskItem.appendChild(btn);
       
        taskInput.value = "";
        taskCtr++;
        counter.innerHTML = `Total Tasks: ${taskCtr}`;
       
        //add event to delete button
        const deleteBtn = taskItem.querySelector('#delete-btn');
        deleteBtn.addEventListener('click', deleteTask);

         //add event to checkbox
        const checkBx = taskItem.querySelector('#taskCheck');
        checkBx.addEventListener('click', crossTask);      
    }

    function crossTask(event){
        const textCheck = event.target.parentElement;
        textCheck.style.textDecoration = 'line-through';
    }

    function deleteTask(event){
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
        taskCtr--;
        counter.innerHTML = `Total Tasks: ${taskCtr}`;      
    }

}

//Local storage functions
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveList);

function saveList(){
    
    //loop to go through the current tasks, and put them in the array to save to local storage
    const allTasks = document.querySelectorAll('#taskList li span');
    let i=0;
    allTasks.forEach(element => {
        taskArray[i] = element.textContent;
        i++;
    });

    let taskString = JSON.stringify(taskArray);
    localStorage.setItem('tString', taskString);
    
}

function loadList(){
    const loadArray = JSON.parse(localStorage.getItem('tString'));
    if(loadArray !== null){
        for(let i=0; i<loadArray.length; i++){
            loadTasks(loadArray[i]);
        }
    }
    
}

function loadTasks(i){
    const taskItem = document.createElement('li');

    taskItem.innerHTML = `
    <input type="checkbox" id = 'taskCheck' class = 'mr-2 ml-3'/><span contentEditable="true" class="task-text">${i}</span>
    <button id = 'delete-btn' class ='bg-red-600 m-2 px-2 rounded-full text-xs text-gray-300'>X</button>`;

    taskList.append(taskItem);
    taskArray[taskCtr]=i;
    taskInput.value = "";
    taskCtr++;
    counter.innerHTML = `Total Tasks: ${taskCtr}`;
       
    const deleteBtn = taskItem.querySelector('#delete-btn');
    deleteBtn.addEventListener('click', deleteTask);

    const checkBx = taskItem.querySelector('#taskCheck');
    checkBx.addEventListener('click', crossTask);
    
    function crossTask(event){
        const textCheck = event.target.parentElement;
        textCheck.style.textDecoration = 'line-through';  
    }
    
    function deleteTask(event){
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
        taskCtr--;
        counter.innerHTML = `Total Tasks: ${taskCtr}`;
        
    }
}

//Clear all tasks function

const clearAll = document.getElementById('clearAll');
clearAll.addEventListener('click', deleteAll);

function deleteAll(){
    let response = confirm('Are you sure you want to delete all tasks?');
    if (response) {
        taskList.innerHTML='';
        taskCtr=0;
        counter.innerHTML = `Total Tasks: ${taskCtr}`;
        //localStorage.clear();
    } else {
        return;
    }
}

//Task filtering
const taskFilter = document.getElementById('taskFilter');
taskFilter.addEventListener('input', filterFunction);
    
function filterFunction() {
    const filterText = taskFilter.value.toLowerCase();
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(task => {
        const taskTxt = task.querySelector('.task-text').textContent.toLowerCase();
        if (taskTxt.includes(filterText)){
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
};


//Task Completion: Done
//Task Editing: Done
//Task Counter: Done
//Task Filtering: Done
//LocalStorage persistence: Done
//Button to clear all task, prompt for confirming: Done
//Responsive design: Done
//Mejoras: 
//1. Evento para que el form del filtro aparezca cuando se cree la primera tarea. toggle visibility.
//2. Quitar el line-through cuando se quite el check. 
//4. Mejorar el responsive en lo más pequeño.
//3. Función para crear los elementos.
