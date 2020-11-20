//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const error = document.querySelector(".error-container");
// console.log(filterOption);

//Event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);
todoInput.addEventListener("keyup",removeError);

//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    let todo = todoInput.value.trim();
   // console.log(todo);
    //Check todo
    if(todo != "" && todo != null){
        //Load todo data
        loadTodoList(todo,1,false);
    } else {
        console.log("show");
        error.classList.add("show");
    }

    //CLear todo list input
    todoInput.value = "";
};

function loadTodoList(todo,flag,completedFlag) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    // console.log(todoDiv);
    todoDiv.classList.add("todo");
    if(completedFlag == true){
        todoDiv.classList.add("completed");
    }

    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText= todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    if(flag == 1){
        saveLocalTodo(todo);
    }

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton); 

    //CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");

   
    todoDiv.appendChild(trashButton);

    //APPEND TO LI
    todoList.appendChild(todoDiv);
}

function saveLocalTodo(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let completed = false; 
    let todoObj = {
        todo,
        completed
    }
    todos.push(todoObj);
    localStorage.setItem('todos',JSON.stringify(todos));
}
function deleteCheck(event){
    const item = event.target;
    //console.log(item.classList[0]);
    //Delete item
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // console.log(item.parentElement);
        todo.classList.toggle("fall");
        removeLocalTodo(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        let todoIndex = item.parentElement.childNodes[0].innerText;
        //  console.log(todoIndex);
        todo.classList.toggle("completed");
        let flag = false;
        if(todo.classList.contains("completed")){
            flag = true;
        }
        filterOption.click();
        updateLocalTodo(todoIndex,flag);
    }
}
function removeLocalTodo(todo) {
    let todos;
    let temp = [];
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.childNodes[0].innerText;
    // console.log(todoIndex);
   
    todos.forEach(todoData => {
        // console.log(todoData.todo);
        if(todoData.todo != todoIndex){
            temp.push(todoData);
        }
    });
    localStorage.setItem('todos',JSON.stringify(temp));
}

function updateLocalTodo(todo,flag) {
    let todos;
    let temp = [];
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todoData => {
        if(todoData.todo == todo){
            // console.log(todo);
            let completed = flag; 
            let todoObj = {
                todo,
                completed
            }
            temp.push(todoObj);
        } else {
            temp.push(todoData);
        }
    });
    localStorage.setItem('todos',JSON.stringify(temp));
}




function filterTodo(e) {
    //console.log(todoList);
    const todos = todoList.childNodes;
    // console.log(todos);
    console.log(e);
    for(todo of todos){
        
        switch(e.target.value){
            case "All":
                todo.style.display = "flex";
                break;
            case "Completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "Uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    }
}

function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        loadTodoList(todo.todo,0,todo.completed);
    });
}

function removeError(event){
    if(event.code != "Enter")
        error.classList.remove("show");
}

