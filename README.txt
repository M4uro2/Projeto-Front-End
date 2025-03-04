Arquivo index.html:
No head, adicionamos, o titulo da página atrvés da tag <title>, e referenciamos o aqruivo style.css na tag <link>.
No body, fizemos a estrutura básica do código adicionando um formulário para o usúario adicionar tarefás colocando seu Id, descrição e titulo da tarefa.
No primeiro <section>, utilizamos a tag <form> para criar o formulário de adicionar tarefás.
Colocamos um <label> para identificar o campo que sera preenchido com o <input>.

No segundo <section>, adicionamos a opção de filtrar por id de usuário dentro de uma <div> e depois listamos as tarefas através do <ul>.
E no fim colocamos o rodapé através do <footer>, colocando ano e o titulo da página, e referencimaos o arquivo javascript,js através da tag <script>.

Arquivo style.css:
No css, no body Definimos a fonte padrão como 'Roboto', Arial, ou sans-serif, colocamos um fundo cinza claro, a fonte da cor preta e tiramos margens e preenchimentos padrão.
No h2, Centralizamos o texto, colocando uma a cor como um azul escuro e adicionamos uma margem inferior.
Em header, Definimos o fundo como azul e a cor da fonte como branco e centralizamos o texto.
Nas Lista de Tarefas:Definimos o fundo como branco, adicionamos uma margem inferior de 20px e botamos bordas arredondadas.

No formulário de Adição de Tarefas, utilizamos no <form>,um fundo branco, bordas arredondadas e uma margem inferior de 40px.
No label, adicionamos uma margem inferior de 10px.
no button, colocamos um Fundo azul, definimos o texto branco, bordas arredondadas, cursor de ponteiro, e tamanho de fonte de 16px, e no hover definimos um azul mais escuro.

No id#filtrar: Definimos para exbir em bloco e  adicionamos uma margem inferior de 10px.
Nos botões de ações do codigo de javascprit, no botão de editar, definimos uma cor verde, com bordas arredondadas e um cursor de ponteiro.
No botão de excluir, definimos uma cor vermelha.
No botão de concluir, definimos uma cor laranja.

A responsividade de foi feita com no maximo de largura de 768px.
Nosso rodapé foi feito com um fundo azul escuro e centralizamos o texto.

Arquivo javascprit.js:
Fizemos uma funçao para inicializar a aplicação. Esta função é chamada quando o script é carregado. Ela adiciona um evento que aguarda o carregamento completo do DOM (DOMContentLoaded) antes de executar o código dentro dela.
Elementos do DOM:
listaTarefas: Elemento HTML onde as tarefas serão listadas.
formularioTarefa: Formulário para adicionar novas tarefas.
filtroUsuario: Campo de entrada para filtrar tarefas por ID de usuário.

Utilizamos Arrays de Tarefas: todasTarefas que vai Armazenar todas as tarefas carregadas e tarefasFiltradas que irá Armazenar as tarefas que correspondem ao filtro aplicado.

Fizemos uma função carregarTarefas que faz uma requisição GET para carregar tarefas de um endpoint simulado.
Ele rmazena as tarefas no array todasTarefas e inicializa tarefasFiltradas com todas as tarefas.
Depois chama renderizarTarefas para exibir as tarefas na página.

Criamos a função renderizarTarefas para atualizar o HTML da lista de tarefas (listaTarefas) com base nas tarefas filtradas.
Para cada tarefa, cria um item de lista (<li>) com informações da tarefa e botões para editar, excluir e concluir.

Depois criamos uma função de filtrarTarefas que filtra as tarefas com base no ID do usuário inserido no campo filtroUsuario.
Atualiza tarefasFiltradas e chama renderizarTarefas para exibir as tarefas filtradas.

Fizemos a função AdiconarTarefa em um evento submit do formulário formularioTarefa que é interceptado para adicionar uma nova tarefa.
Faz uma requisição POST para adicionar a tarefa ao servidor simulado.
Atualiza os arrays de tarefas e re-renderiza a lista de tarefas.

Fizemos a função editarTarefa que permite editar o titulo de uma tarefa já criada.
Faz uma requisição PATCH para atualizar a tarefa no servidor simulado.
Atualiza o título da tarefa nos arrays locais e re-renderiza a lista de tarefas.

Fizemos uma função de excluirTarefa que exclui uma tarefa já existente.
Faz uma requisição DELETE para remover a tarefa do servidor simulado.
Remove a tarefa dos arrays locais e re-renderiza a lista de tarefas.

Criamos uma função para concluirTarefa que conclui uma tarefa pendente.
Faz uma requisição PATCH para atualizar o status da tarefa no servidor simulado.
Atualiza o status da tarefa nos arrays locais e re-renderiza a lista de tarefas.

E por fim chamamos o inicializarAplicacao para iniciar o processo de carregamento e gerenciamento das tarefas quando a página é carregada.

Como usar?

Para adicionar uma tarefa basta informar o id do usuário, colocar uma descrição(opcional), e colocar o titulo da tarefa.
Para filtrar uma terefa basta, informar o id do usuário e clicar no botão azul "filtar".
Para editar uma terefa basta clicar no botão verde "editar" que fica dentro da tarefa.
Para excluir uma terefa basta clicar no botão vermelho "excluir" que fica dentro da tarefa.
Para concluir umaterefa basta clicar no botão laranja "concluir" que fica dentro da tarefa.

Este projeto foi desenvolvido pelos alunos Carlos Miguel, Célio Gabriel e Mauro Severiano.
