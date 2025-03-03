function inicializarAplicacao() {
    document.addEventListener('DOMContentLoaded', () => {
        const listaTarefas = document.getElementById('tarefas');
        const formularioTarefa = document.getElementById('formulario-tarefa');
        const filtroUsuario = document.getElementById('filtroUsuario');

        let todasTarefas = []; // Array para armazenar todas as tarefas
        let tarefasFiltradas = []; // Array para armazenar tarefas filtradas

        // Função para carregar tarefas
        const carregarTarefas = async () => {
            try {
                const resposta = await fetch('https://jsonplaceholder.typicode.com/todos');
                if (!resposta.ok) throw new Error('Erro ao carregar tarefas');
                todasTarefas = await resposta.json(); // Armazena todas as tarefas
                tarefasFiltradas = todasTarefas; // Inicialmente, tarefasFiltradas contém todas as tarefas
                renderizarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        };
         // Função para renderizar as tarefas
         const renderizarTarefas = () => {
            listaTarefas.innerHTML = tarefasFiltradas.map(tarefa => `
            <li>
                <strong>${tarefa.title}</strong>
                <p>Usuário: ${tarefa.userId}</p>
                <p>${tarefa.completed ? 'Concluída' : 'Pendente'}</p>
                <p>${tarefa.description || ''}</p>
                <button class="btn-editar" onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                ${!tarefa.completed ? `<button class="btn-concluir" onclick="concluirTarefa(${tarefa.id})">Concluir</button>` : ''}
            </li>
        `).join('');
        };
         // Função para filtrar tarefas por usuário
         window.filtrarTarefas = () => {
            const idUsuario = filtroUsuario.value;
            if (idUsuario) {
                tarefasFiltradas = todasTarefas.filter(tarefa => tarefa.userId === parseInt(idUsuario));
            } else {
                tarefasFiltradas = todasTarefas;
            }
            renderizarTarefas();
        };
         // Função para adicionar uma nova tarefa
         formularioTarefa.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const idUsuario = document.getElementById('idUsuario').value;
                const titulo = document.getElementById('titulo').value;
                const descricao = document.getElementById('descricao').value;

                const resposta = await fetch('https://jsonplaceholder.typicode.com/todos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: parseInt(idUsuario), title: titulo, description: descricao, completed: false })
                });
                if (!resposta.ok) throw new Error('Erro ao adicionar tarefa');

                const novaTarefa = await resposta.json();

                // Adiciona a nova tarefa aos arrays
                todasTarefas.unshift(novaTarefa);
                filtrarTarefas();

                renderizarTarefas(); // Renderiza as tarefas novamente
                alert('Tarefa adicionada com sucesso!');
                formularioTarefa.reset();
            } catch (erro) {
                alert(erro.message);
            }
        });
    });
}
inicializarAplicacao();