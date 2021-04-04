const form = document.querySelector('form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

loadStorage();

form.addEventListener('submit', e => {
    e.preventDefault();

    if (todoInput !== '') {
        createTodo({ description: todoInput.value, done: false });
        todoInput.value = '';
    }
});

function createTodo(todo) {
    const todoItem = document.createElement('li');
    todoItem.innerHTML = todo.description;
    todoItem.classList.add('todo-item');
    
    if (todo.done) {
        todoItem.classList.add('done');
    }

    todoItem.addEventListener('click', e => {
        e.target.classList.toggle('done');
        updateStorage();
    });

    todoItem.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.target.remove();
        updateStorage();
    })
    
    todoList.append(todoItem);
    updateStorage();
}

function updateStorage() {
    const todoItems = document.querySelectorAll('.todo-item');
    const storedItems = [];

    todoItems.forEach(todoItem => {
        const storedItem = {
            description: todoItem.innerHTML,
            done: todoItem.classList.contains('done')
        }
        storedItems.push(storedItem);
    });

    localStorage.setItem('todos', JSON.stringify(storedItems));
}

function loadStorage() {
    if (localStorage.getItem('todos')) {
        const storedItems = JSON.parse(localStorage.getItem('todos'));
        storedItems.forEach(storedItem => {
            createTodo(storedItem);
        })
    };
}