const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');

todoInput.addEventListener('keyup', e => {
    if (e.key === 'Enter' && e.target.value !== '') {
        createTodo(e.target.value, todoList);
        e.target.value = '';
    }
})

function createTodo(description, parentElement) {
    const todoItem = document.createElement('p');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = description;
    todoItem.addEventListener('click', e => {
        if (e.button === 0) {
            e.target.classList.toggle('done');
        }
    });
    todoItem.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.target.remove();
    })
    
    parentElement.append(todoItem);
}