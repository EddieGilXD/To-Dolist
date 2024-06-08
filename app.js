class Node {
    constructor(task) {
        this.task = task;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }
    
    addTask(task) {
        const newNode = new Node(task);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
    
    removeTask(index) {
        if (index === 0 && this.head) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        let previous = null;
        let count = 0;

        while (current && count < index) {
            previous = current;
            current = current.next;
            count++;
        }

        if (current) {
            previous.next = current.next;
        }
    }
    
    getTasks() {
        const tasks = [];
        let current = this.head;

        while (current) {
            tasks.push(current.task);
            current = current.next;
        }

        return tasks;
    }
}

const taskList = new LinkedList();

function saveTasks() {
    const tasks = taskList.getTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => taskList.addTask(task));
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value;

    if (task) {
        taskList.addTask(task);
        taskInput.value = '';
        saveTasks();  
        displayTasks();
    }
}

function removeTask(index) {
    taskList.removeTask(index);
    saveTasks();  
    displayTasks();
}

function displayTasks() {
    const tasks = taskList.getTasks();
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeTask(index);
        listItem.appendChild(removeButton);
        taskListElement.appendChild(listItem);
    });
}

loadTasks();
displayTasks();