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
         // Função para editar uma tarefa
         window.editarTarefa = async (tarefaId) => {
            try {
                const tarefaParaEditar = todasTarefas.find(tarefa => tarefa.id === tarefaId);
                if (!tarefaParaEditar) {
                    throw new Error('Tarefa não encontrada');
                }

                const novoTitulo = prompt('Digite o novo título da tarefa:', tarefaParaEditar.title);
                if (novoTitulo !== null && novoTitulo !== '') {
                    const resposta = await fetch(`https://jsonplaceholder.typicode.com/todos/${tarefaId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: novoTitulo })
                    });
                    if (!resposta.ok) throw new Error('Erro ao editar tarefa');

                    // Atualiza a tarefa nos arrays
                    const atualizarTarefa = (tarefas) => {
                        const indiceTarefa = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
                        if (indiceTarefa !== -1) {
                            tarefas[indiceTarefa].title = novoTitulo;
                        }
                    };
                    atualizarTarefa(todasTarefas);
                    atualizarTarefa(tarefasFiltradas);

                    renderizarTarefas();
                    alert('Tarefa editada com sucesso!');
                }
            } catch (erro) {
                console.error('Erro ao editar tarefa:', erro);
                alert(erro.message);
            }
        };
         // Função para excluir uma tarefa
         window.excluirTarefa = async (tarefaId) => {
            try {
                if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                    const resposta = await fetch(`https://jsonplaceholder.typicode.com/todos/${tarefaId}`, { method: 'DELETE' });
                    if (!resposta.ok) throw new Error('Erro ao excluir tarefa');

                    // Remove a tarefa dos arrays
                    todasTarefas = todasTarefas.filter(tarefa => tarefa.id !== tarefaId);
                    tarefasFiltradas = tarefasFiltradas.filter(tarefa => tarefa.id !== tarefaId);

                    renderizarTarefas();
                    alert('Tarefa excluída com sucesso!');
                }
            } catch (erro) {
                alert(erro.message);
            }
        };
    });
}
inicializarAplicacao();