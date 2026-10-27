// URL base da API
const API_URL = 'http://localhost:8080';

// Elementos do DOM
const formAluno = document.getElementById('formAluno');
const tabelaAlunos = document.getElementById('tabelaAlunos');
const mediaGeral = document.getElementById('mediaGeral');
const btnOrdenarCrescente = document.getElementById('btnOrdenarCrescente');
const btnOrdenarDecrescente = document.getElementById('btnOrdenarDecrescente');
const btnSalvarEdicao = document.getElementById('btnSalvarEdicao');

// Elementos do modal de edição
const modalEdicao = new bootstrap.Modal(document.getElementById('modalEdicao'));
const editId = document.getElementById('editId');
const editNome = document.getElementById('editNome');
const editPrimeira = document.getElementById('editPrimeira');
const editSegunda = document.getElementById('editSegunda');

// Função para carregar todos os alunos
async function carregarAlunos() {
    try {
        const response = await fetch(`${API_URL}/alunos`);
        if (!response.ok) throw new Error('Erro ao carregar alunos');
        const alunos = await response.json();
        exibirAlunos(alunos);
        calcularMediaGeral(alunos);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar alunos. Verifique se a API está rodando.');
    }
}

// Função para calcular a média de um aluno
function calcularMediaAluno(primeira, segunda) {
    return ((parseFloat(primeira) + parseFloat(segunda)) / 2).toFixed(1);
}

// Função para exibir alunos na tabela
function exibirAlunos(alunos) {
    tabelaAlunos.innerHTML = '';
    alunos.forEach(aluno => {
        const media = calcularMediaAluno(aluno.primeira, aluno.segunda);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.id}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.primeira}</td>
            <td>${aluno.segunda}</td>
            <td>${media}</td>
            <td>
                <button class="btn btn-primary btn-acoes" onclick="abrirModalEdicao(${aluno.id}, '${aluno.nome}', ${aluno.primeira}, ${aluno.segunda})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-acoes" onclick="excluirAluno(${aluno.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tabelaAlunos.appendChild(tr);
    });
}

// Função para calcular e exibir a média geral
function calcularMediaGeral(alunos) {
    if (alunos.length === 0) {
        mediaGeral.textContent = 'Média: 0.0';
        return;
    }
    const somaMedias = alunos.reduce((acc, aluno) => {
        return acc + parseFloat(calcularMediaAluno(aluno.primeira, aluno.segunda));
    }, 0);
    const media = (somaMedias / alunos.length).toFixed(1);
    mediaGeral.textContent = `Média: ${media}`;
}

// Função para adicionar novo aluno
async function adicionarAluno(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const primeira = document.getElementById('primeira').value;
    const segunda = document.getElementById('segunda').value;

    try {
        const response = await fetch(`${API_URL}/alunos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, primeira, segunda }),
        });

        if (!response.ok) throw new Error('Erro ao adicionar aluno');
        
        formAluno.reset();
        carregarAlunos();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao adicionar aluno');
    }
}

// Função para abrir o modal de edição
function abrirModalEdicao(id, nome, primeira, segunda) {
    editId.value = id;
    editNome.value = nome;
    editPrimeira.value = primeira;
    editSegunda.value = segunda;
    modalEdicao.show();
}

// Função para salvar as alterações de um aluno
async function salvarEdicao() {
    const id = editId.value;
    const nome = editNome.value;
    const primeira = editPrimeira.value;
    const segunda = editSegunda.value;

    try {
        const response = await fetch(`${API_URL}/alunos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, primeira, segunda }),
        });

        if (!response.ok) throw new Error('Erro ao atualizar aluno');
        
        modalEdicao.hide();
        carregarAlunos();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar aluno');
    }
}

// Função para excluir aluno
async function excluirAluno(id) {
    if (!confirm('Tem certeza que deseja excluir este aluno?')) return;

    try {
        const response = await fetch(`${API_URL}/alunos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao excluir aluno');
        
        carregarAlunos();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir aluno');
    }
}

// Função para ordenar alunos
function ordenarAlunos(crescente = true) {
    const linhas = Array.from(tabelaAlunos.getElementsByTagName('tr'));
    const alunosOrdenados = linhas.map(linha => ({
        id: linha.cells[0].textContent,
        nome: linha.cells[1].textContent,
        primeira: parseFloat(linha.cells[2].textContent),
        segunda: parseFloat(linha.cells[3].textContent),
        media: parseFloat(linha.cells[4].textContent)
    }));

    alunosOrdenados.sort((a, b) => {
        return crescente ? a.media - b.media : b.media - a.media;
    });

    exibirAlunos(alunosOrdenados);
}

// Event Listeners
formAluno.addEventListener('submit', adicionarAluno);
btnOrdenarCrescente.addEventListener('click', () => ordenarAlunos(true));
btnOrdenarDecrescente.addEventListener('click', () => ordenarAlunos(false));
btnSalvarEdicao.addEventListener('click', salvarEdicao);

// Carregar alunos ao iniciar a página
carregarAlunos(); 