//Event handling
var taskInput=document.getElementById("item");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");
    //input (checkbox)
    var checkBox=document.createElement("input");
	//label
	var label=document.createElement("label");
	//input (text)
	var editInput=document.createElement("input");
	//button.edit
	var editButton=document.createElement("button");
    //button.delete
	var deleteButton=document.createElement("button");

	label.innerText=taskString;

	//Each element, needs appending
	checkBox.type="checkbox";
	editInput.type="text";
    
    //innerText encodes special characters, HTML does not.
	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";
    
    //and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

var addTask=function(){
	console.log("Add Task...");
	//Create a new list item with the text from the #new-task:
	var listItem=createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";
}

//Edit an existing task.
var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");

var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){
        //switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
        //toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}

//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");
        var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
		console.log("Incomplete Task...");
	//Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #incomplete-tasks.
	var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
	console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick=addTask;
// addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
	//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");

            //Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}

//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
    }
	
	
	//////
	// Load the todos from localstorage.
    // We need to use JSON.parse to turn the string retrieved from an array into a string
	var list = JSON.parse(localStorage.getItem("todolist"));
	
	// Save the todos into localstorage.
    // We need to use JSON.stringify to turn the list from an array into a string
    localStorage.setItem("todolist", JSON.stringify(list));

 	// Checks to see if the todolist exists in localStorage and is an array currently
    // If not, set a local list variable to an empty array
    // Otherwise list is our current list of todos
    if (!Array.isArray(list)) {
      list = [];
    }

    // render our todos on page load
    renderTodos(list);


//store list on local storage
// let itemsArray = []
// const form = document.querySelector('form')
// const ul = document.querySelector('ul')
// const button = document.querySelector('button')
// // const input = document.getElementById('item')
// let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
// or
// if (localStorage.getItem('items')) {
//     items = JSON.parse(localStorage.getItem('items'))
// } else {
//     items = []
// }

// localStorage.setItem('items', 'incomplete-tasks', 'completed-tasks', JSON.stringify(itemsArray))
// const data = JSON.parse(localStorage.getItem('items', 'incomplete-tasks', 'completed-tasks'))

// const liMaker = text => {
//   const li = document.createElement('li')
//   li.textContent = text
//   ul.appendChild(li)
// }

// form.addEventListener('submit', function(e) {
//   e.preventDefault()

//   itemsArray.push(input.value)
//   localStorage.setItem('items', 'incomplete-tasks', 'completed-tasks', JSON.stringify(itemsArray))
//   liMaker(input.value)
//   input.value = ''
// })

// data.forEach(item => {
//   liMaker(item)
// })

// button.addEventListener('click', function() {
//   localStorage.clear()
//   while (ul.firstChild) {
//     ul.removeChild(ul.firstChild)
//   }
// })

/////
// When users click "item"
// $("#item").on("click", function(event) {
// 	// This line prevents the page from refreshing when a user hits "enter".
// 	event.preventDefault();

// 	// Clear the HTML from the greeting header
// 	// $("#uncompleted-tasks", "#completed-tasks").html("");

// 	// Grab the user input
// 	var userinput = $("#item").val().trim();

// 	// Clear absolutely everything stored in localStorage using localStorage.clear()
// 	localStorage.clear();

// 	// Store the username into localStorage using "localStorage.setItem"
// 	localStorage.setItem("input", userinput);

// 	// And display that name for the user using "localStorage.getItem"
// 	$("#uncompleted-tasks", "#completed-tasks").text(localStorage.getItem("input"));

//   });

//   // By default (upon load) show the name stored in localStorage using "localStorage.getItem"
//   $("#uncompleted-tasks", "#completed-tasks").text(localStorage.getItem("input"));
