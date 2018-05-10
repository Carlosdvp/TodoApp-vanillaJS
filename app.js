'use strict';

// ToDo App v11 - Destroy all for loops

// 1. the toggleAll method should use forEach
// 2. the displayTodos method should use forEach


// The Object
var todoList = {};

// The Array as a property of the Object
todoList.todos = [];

// The Methods

// Add todos
todoList.addTodo = function(todoText) {
	todoList.todos.push({
		todoText: todoText,
		completed: false
	});
}

// Change Todos
todoList.changeTodo = function(position, todoText) {
	todoList.todos[position].todoText = todoText;
}

// Delete Todos
todoList.deleteTodo = function(position) {
	todoList.todos.splice(position, 1);	
}

// Togggle Completed
todoList.toggleCompleted = function(position) {
	var todo = todoList.todos[position];
	todo.completed = !todo.completed;
}

// Toggle All
todoList.toggleAll = function() {
	var totalTodos = this.todos.length,
			completedTodos = 0;
	// get number of completed todos
	this.todos.forEach(function(todo) {
		if (todo.completed) {
			completedTodos++;
		};
	})
	// if everything is true make everything false else make everything true
	this.todos.forEach(function(todo) {
		if (completedTodos === totalTodos) {
			todo.completed = false;
		} else {
			todo.completed = true;
		};
	})
}


// Event Listeners - Handlers

var handlers = {};

// The Event Handler Methods

handlers.addTodo = function() {
	var todoTextInput = document.getElementById('addTodoTextInput');
	todoList.addTodo(todoTextInput.value);
	todoTextInput.value = '';
	views.displayTodos();
}

handlers.changeTodo = function() {
	var todoPosition = document.getElementById('todoPosition'),
			changeTodoText = document.getElementById('changeTodoText');
	// first value in the changeTodo method needs to be a number
	todoList.changeTodo(parseInt(todoPosition.value), changeTodoText.value);
	todoPosition.value = '';
	changeTodoText.value = ''; 
	views.displayTodos();
}

handlers.deleteTodo = function(position) {
	todoList.deleteTodo(position);
	views.displayTodos();
}

handlers.toggleCompleted = function(position) {
	var toggleCompletedInput = document.getElementById('toggleCompletedInput');
	todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
	toggleCompletedInput.value = '';
	views.displayTodos();
}

handlers.toggleAll = function() {
	todoList.toggleAll();
	views.displayTodos();
}


// New Object for the things that the user sees - view fuctions
var views = {};

// The Views Methods

// Method to display todos
views.displayTodos = function() {
	var todoUl = document.querySelector('ul');
	// we need to clear the Ul every time we run this method to reflect current contents of the todo list
	todoUl.innerHTML = '';
	// then loop through each item and create it's li element
	todoList.todos.forEach(function(todo, position) {
		// Inserting elements into the DOM - There should be an Li for every todo
		var todoLi = document.createElement('li');
		// then we create the todo with .completed variable
		var todoTextCompleted = '';
		// next the logic to check if each item is completed or not
		if (todo.completed) {
			todoTextCompleted = `(x) ${todo.todoText}`;
		} else {
			todoTextCompleted = `( ) ${todo.todoText}`;
		};
		// lets add an id to each li for the li's position
		todoLi.id = position;
		// we grab the todoText property of each todo object and add it to the list
		todoLi.textContent = todoTextCompleted;
		// lets append the delete button here
		todoLi.appendChild(this.createDeleteBtn());
		todoUl.appendChild(todoLi);
	}, this)
}

// Method to create delete buttons
views.createDeleteBtn = function() {
	var deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.className = 'delete-button';
	return deleteButton;
}

// Method for the event listeners
views.setupEventListeners = function() {
	// first we grab the ul 
	var todosUl = document.querySelector('ul');
	// and add the event listeners
	todosUl.addEventListener('click', function(e) {
		// lets get the element clicked on
		var elementClicked = e.target;
		// now we make sure it is a button
		if (elementClicked.className === 'delete-button') {
			handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
		} 
	})
}

views.setupEventListeners();