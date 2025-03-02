document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('tasks');
    const taskForm = document.getElementById('task-form');
    const userFilter = document.getElementById('userFilter');

    let allTasks = []; // Array para armazenar todas as tarefas
    let filteredTasks = []; // Array para armazenar tarefas filtradas

    // Função para carregar tarefas
    const loadTasks = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            if (!response.ok) throw new Error('Erro ao carregar tarefas');
            allTasks = await response.json(); // Armazena todas as tarefas
            filteredTasks = allTasks; // Inicialmente, filteredTasks contém todas as tarefas
            renderTasks();
        } catch (error) {
            alert(error.message);
        }
    };

    // Função para renderizar as tarefas
    const renderTasks = () => {
        taskList.innerHTML = filteredTasks.map(task => `
            <li>
                <strong>${task.title}</strong>
                <p>Usuário: ${task.userId}</p>
                <p>${task.completed ? 'Concluída' : 'Pendente'}</p>
                <button onclick="editTask(${task.id})">Editar</button>
                <button onclick="deleteTask(${task.id})">Excluir</button>
            </li>
        `).join('');
    };

    // Função para filtrar tarefas por usuário
    window.filterTasks = () => {
        const userId = userFilter.value;
        if (userId) {
            filteredTasks = allTasks.filter(task => task.userId === parseInt(userId));
        } else {
            filteredTasks = allTasks;
        }
        renderTasks();
    };

    // Função para adicionar uma nova tarefa
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const userId = document.getElementById('userId').value;
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;

            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: parseInt(userId), title, description, completed: false })
            });
            if (!response.ok) throw new Error('Erro ao adicionar tarefa');

            const newTask = await response.json();
            
            // Adiciona a nova tarefa aos arrays
            allTasks.unshift(newTask);
            filteredTasks.unshift(newTask);

            renderTasks(); // Renderiza as tarefas novamente
            alert('Tarefa adicionada com sucesso!');
            taskForm.reset();
        } catch (error) {
            alert(error.message);
        }
    });

    // Função para editar uma tarefa
    window.editTask = async (taskId) => {
        try {
            const taskToEdit = allTasks.find(task => task.id === taskId);
            if (!taskToEdit) {
                throw new Error('Tarefa não encontrada');
            }
    
            const newTitle = prompt('Digite o novo título da tarefa:', taskToEdit.title);
            if (newTitle !== null && newTitle !== '') {
                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: newTitle })
                });
                if (!response.ok) throw new Error('Erro ao editar tarefa');
    
                // Atualiza a tarefa nos arrays
                const updateTask = (tasks) => {
                    const taskIndex = tasks.findIndex(task => task.id === taskId);
                    if (taskIndex !== -1) {
                        tasks[taskIndex].title = newTitle;
                    }
                };
                updateTask(allTasks);
                updateTask(filteredTasks);
    
                renderTasks();
                alert('Tarefa editada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao editar tarefa:', error);
            alert(error.message);
        }
    };

    // Função para excluir uma tarefa
    window.deleteTask = async (taskId) => {
        try {
            if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Erro ao excluir tarefa');

                // Remove a tarefa dos arrays
                allTasks = allTasks.filter(task => task.id !== taskId);
                filteredTasks = filteredTasks.filter(task => task.id !== taskId);

                renderTasks();
                alert('Tarefa excluída com sucesso!');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    // Carregar tarefas ao carregar a página
    loadTasks();
});
