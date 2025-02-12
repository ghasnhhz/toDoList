// When loading the page, load from localStorage.
let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate: '2022-12-22',
}, {
  name:'wash dishes',
  dueDate:'2022-12-22',
}];

renderTodoList();

function renderTodoList() {

  let todoListHTML = '';

  // (todoObject, index) => on behalf of function(todoObject, index).
  todoList.forEach((todoObject, index) => {
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;
    todoListHTML += html; 
  })

  // Update the inner HTML after the loop completes
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  // if we used the queryselector,it would select only first button.
  // foreach(() =>): in function, we have two parametres, 1. The value name
  // in the list, 2. the index.
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
        renderTodoList();

        // Whenever we update the todo list, save in localStorage.
        saveToStorage();
    })
  });
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
})

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;  

  const dueDateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dueDateInputElement.value;

  if (name) {
    todoList.push({
      //name: name,
      //dueDate: dueDate,
      // If the name of the property and the value's name are
      // the same, we can only write the property's name.
      name,
      dueDate,
    });
  }

  inputElement.value = '';

  renderTodoList();

  // Whenever we update the todo list, save in localStorage.
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}