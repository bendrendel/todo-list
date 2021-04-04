const todoInput = document.querySelector('.todo-input');
const todoContainer = document.querySelector('.todo-container');

loadStorage();

todoInput.addEventListener('keyup', e => {
    if (e.key === 'Enter' && e.target.value !== '') {
        createTodo(e.target.value, false);
        e.target.value = '';
    }
});

function createTodo(description, done) {
    const todoItem = document.createElement('p');
    todoItem.innerHTML = description;
    todoItem.classList.add('todo-item');
    
    if (done) {
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
    
    todoContainer.append(todoItem);
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
            createTodo(storedItem.description, storedItem.done);
        })
    };
}