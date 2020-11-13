// DOM Elemenets

const taskInput = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addTask');
const filterTasksInput = document.querySelector('#filterInput');
const taskList = document.querySelector('#taskList')
const clearTasksBtn = document.querySelector('#clearTasks');


// On load event to fire off all events

window.addEventListener('load', loadEvents);

// Function on load

function loadEvents() {
    //Get tasks from Local Storage
    getTasksFromLS();
    // Add new task
    addTaskBtn.addEventListener('click', addTask);
    //Delete task
    taskList.addEventListener('click', deleteTask);
    //Filter tasks
    filterTasksInput.addEventListener('keyup', filterTasks);
    //Clear all tasks
    clearTasksBtn.addEventListener('click', clearTasks);
};




// Add new task 

function addTask(e){
    if(taskInput.value === ''){
        alert('Type in your task')
    }else {
        taskList.innerHTML += `
    <li class="list-group-item border-bottom border-info text-primary d-flex justify-content-between">
        ${taskInput.value}
        <a href="#" class="delete-item">
            <i class="fa fa-trash"></i>
        </a>
    </li>
    `
    }
    // Add task in local storage
    addTaskInLS(taskInput.value);
    //Clear task input
    taskInput.value = '';
};

// Delete Task

function deleteTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
            
            // Delete from LS
            deleteTaskFromLS(e.target.parentElement.parentElement.innerText.trim())
        }
    }
};


// Filter tasks

function filterTasks(){
    let tasks = document.querySelectorAll('.list-group-item');
    let text = filterTasksInput.value.toLowerCase()
    tasks.forEach(task => {
        if(task.innerText.toLowerCase().indexOf(text) != -1){
            task.classList.add('d-flex');
        }else {
            task.classList.remove('d-flex');
            task.style.display = 'none'
        }
    })
};


// Clear tasks function

function clearTasks(){
    if(confirm('Are You Sure?')){
        do {
            taskList.firstChild.remove();
        }while (taskList.firstChild);
    
        // Clear tasks from local storage
        clearTasksFromLS();
    }
};

// LOCAL STORAGE FUNCTIONS


//Add task in local storage
function addTaskInLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage on load
function getTasksFromLS(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        taskList.innerHTML += `
    <li class="list-group-item border-bottom border-info text-primary d-flex justify-content-between">
        ${task}
        <a href="#" class="delete-item">
            <i class="fa fa-trash"></i>
        </a>
    </li>
    `
    })
}

// Delete task from local storage
function deleteTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach((task, index) => {
      if(task == taskItem){
         tasks.splice(index, 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks from local storage
function clearTasksFromLS(){
    localStorage.clear();
}