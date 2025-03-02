document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('tasks');
    const taskForm = document.getElementById('task-form');

    // Função para carregar tarefas

    const loadTasks = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            if (!response.ok) throw new Error('Erro ao carregar tarefas');
            const tasks = await response.json();
            taskList.innerHTML = tasks.map(task => `
                <li>
                    <strong>${task.title}</strong>
                    <p>${task.completed ? 'Concluída' : 'Pendente'}</p>
                    <button onclick="editTask(${task.id})">Editar</button>
                    <button onclick="deleteTask(${task.id})">Excluir</button>
                </li>
            `).join('');
        } catch (error) {
            alert(error.message);
        }
    };


    // Função para adicionar uma nova tarefa

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const userId = document.getElementById('userId').value;
            const title = document.getElementById('title').value;

            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: parseInt(userId), title, completed: false })
            });
            if (!response.ok) throw new Error('Erro ao adicionar tarefa');

            alert('Tarefa adicionada com sucesso!');
            loadTasks();
        } catch (error) {
            alert(error.message);
        }
    });

// Função para editar uma tarefa
window.editTask = async (taskId) => {
    try {
        const newTitle = prompt('Digite o novo título da tarefa:');
        if (newTitle) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle })
            });
            if (!response.ok) throw new Error('Erro ao editar tarefa');

            alert('Tarefa editada com sucesso!');
            loadTasks();
        }
    } catch (error) {
        alert(error.message);
    }};
// Função para excluir uma tarefa
    window.deleteTask = async (taskId) => {
    try {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Erro ao excluir tarefa');

            alert('Tarefa excluída com sucesso!');
            loadTasks();
        }
    } catch (error) {
        alert(error.message);
    }};

    
    
   
});