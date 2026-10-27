import express from "express";
import { ler, inserir, lerUM, atualizar, excluir} from './src/aluno.js';
import cors from 'cors';

const app = express();
const porta = process.env.PORT || 8080;

// Habilitando CORS
app.use(cors());

// Habilitando o express a funcionar com dados JSON
app.use(express.json());
// Habilitando o express a funcionar com dados a partir de inputs
app.use(express.urlencoded({extended:true}));


// configurando rotas
    app.get('/', (req, res) => {
        res.send(`API de alunos com Node.js, Express e MySQL`);
});

// GET: endpoint (rota) para todos os alunos da API
app.get('/alunos', (req, res) => {
    // res.send(`Dados de todos os alunos`);
    ler(res);
});

// GET: Endpoint (rota) para dados de UM aluno da API
// A sintaxe do expressa exige que usemos : (dois pontos)
app.get('/alunos/:id', (req, res) => {
    // res.send(`Dados de UM aluno`);
    // Capturando valor do parâmetro ID vindo da URL (poderíamos ter escolhid qualquer outro nome ao invés de ID)
    const id = parseInt(req.params.id);
    lerUM(id, res);
});


// POST: Endpoint para inserir novos alunos
app.post('/alunos', (req, res) => {
    // res.send(`Aluno inserido com sucesso!`);

    // Capturando dados a partir da requisição
    const novoAluno = req.body;
    inserir(novoAluno, res);
});


// PUT: Endpoint para atualiza TODOS os dados de UM aluno
// app.put('/alunos/:id', (req, res) => {
//     res.send(`Aluno atualizado com sucesso!`);
// });


// PATCH: Endpoint para atualizar todos/alguns dados de UM aluno
app.patch('/alunos/:id', (req, res) => {
    // res.send(`Dados do aluno atualizados com sucesso!`);
    const id = parseInt(req.params.id);
    const aluno = req.body;
    atualizar(id, aluno, res);
});


// DELETE: endpoint para excluir alunos
app.delete('/alunos/:id', (req, res) => {
    // res.send(`Aluno excluído com sucesso!`);
    const id = parseInt(req.params.id);
    excluir(id, res);
});



// configurando a execução do servidor Express
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});