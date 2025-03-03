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
    });
}
inicializarAplicacao();