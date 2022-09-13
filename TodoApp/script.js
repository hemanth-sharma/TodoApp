let todo = [];
const inputField = document.getElementById("input-field");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementsByClassName("delete-btn");

const taskField = document.getElementById("task-field");


let taskFromLocalStorage = JSON.parse(localStorage.getItem("todo"));
if(taskFromLocalStorage){
    todo = taskFromLocalStorage;
    // load with previous task and display them
    for(let i=0; i < todo.length; i++){
        render(todo[i]);
    }

}
// Listening for mouse click on + icon
inputBtn.addEventListener("click", function(event){
    // reading input value
    const task = inputField.value;
    if(task === ""){
        inputField.classList.add("warning");
    }
    else{
        // storing task in local storage 
        todo.push(task);
        localStorage.setItem("todo", JSON.stringify(todo));
        render(task);
        
    }
    
});
// Listening for enter key in input field
inputField.addEventListener("keypress", function(event){
    const task = inputField.value;
    if(event.key === "Enter" && task === ""){
        inputField.classList.add("warning");
        inputField.value = "";
    }
    
    else if(event.key === "Enter"){ 
        let x = task.trim();
        if(!(x === "")){
            // storing task in local storage 
            todo.push(task);
            localStorage.setItem("todo", JSON.stringify(todo));
            render(task);
        }
        else{
            inputField.classList.add("warning");
            inputField.value = "";
        }
        
    }
});

function render(task){
    inputField.classList.remove("warning");

    // creating div container for storing task
    // taskDiv stores task as a whole 
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const taskName = document.createElement("div");
    taskName.innerText = task;
    taskName.setAttribute("contenteditable", "false");
    taskName.classList.add("task-name");

    const taskIcon = document.createElement("div");
    taskIcon.classList.add("task-icon");

    // creating task icons and buttons
    const inputCheckbox = document.createElement("input");
    inputCheckbox.setAttribute("type", "checkbox");
    inputCheckbox.setAttribute("name", "checkbox-btn");
    inputCheckbox.setAttribute("class", "checkbtn");

    const updateBtn = document.createElement("button");
    let pencilIcon = document.createElement("i");
    pencilIcon.setAttribute("class", "fa fa-pencil");
    updateBtn.appendChild(pencilIcon);
    updateBtn.setAttribute('class', "update-btn");
    // updateBtn.setAttribute('class', "click-style");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.setAttribute("class", "delete-btn");

    taskIcon.appendChild(inputCheckbox);
    taskIcon.appendChild(updateBtn);
    taskIcon.appendChild(deleteBtn);

    // inserting child elements into div
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskIcon);

    // inserting created node task into DOM
    taskField.appendChild(taskDiv);

    updateBtn.addEventListener("click", updateTask);
    deleteBtn.addEventListener("click", removeTask);
    inputCheckbox.addEventListener("change", taskCompleted);

    inputField.value = "";

}

function removeTask(event){
    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
    // remove from local storage
    removeFromlocalStorage(event);
}


let oldTask;
let newTask;
function updateTask(event){
    console.log("Update");

    event.target.parentNode.parentNode.parentNode.firstChild.classList.toggle('clicked');
    // Adding a class to the div if its already clicked 
    if(event.target.parentNode.parentNode.parentNode.firstChild.classList.contains("clicked")){
        oldTask = event.target.parentNode.parentNode.parentNode.firstChild.innerText;
        event.target.parentNode.parentNode.parentNode.firstChild.setAttribute("contenteditable", "true");
        event.target.parentNode.parentNode.parentNode.firstChild.focus();
        console.log("value when clicked = === oldtask = ", oldTask);
        event.target.parentNode.classList.add("click-style");
    }
    else{
        event.target.parentNode.classList.remove("click-style");
        event.target.parentNode.parentNode.parentNode.firstChild.setAttribute("contenteditable", "false");
        newTask = event.target.parentNode.parentNode.parentNode.firstChild.innerText;
        console.log("oldtask = ", oldTask);
        console.log("newtask = ", newTask);
        // repacing newTask value in localStorage
        const index = todo.indexOf(oldTask);
        console.log("index = ", index);
        todo.splice(index, 1, newTask);
        localStorage.setItem("todo", JSON.stringify(todo));
    }
    // let task = event.target.parentNode.parentNode.parentNode.firstChild.innerText;
    // console.log(oldTask);
    // console.log(newTask);
    console.log(event.target.parentNode.parentNode.parentNode.firstChild);
}

function removeFromlocalStorage(event){
    const item = event.target.parentNode.parentNode.firstChild.innerText;
    const index = todo.indexOf(item);
    console.log("index = " + index + "\t item = " + item);
    todo.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todo));
}

function taskCompleted(event){
    if(event.target.checked){
        event.target.parentNode.parentNode.firstChild.classList.add("task-done");
    }
    else{
        event.target.parentNode.parentNode.firstChild.classList.remove("task-done");
    }
}




