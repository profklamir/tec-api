import conexao from './banco.js';

/* Funções paraa o CRUD */
function ler( res ){
    // Comando SQL a ser executado
    const sql = "SELECT * FROM alunos ORDER BY nome";

    // Executa a query a partir da conexão
    conexao.query(sql, (erro, resultados) => {
         // Função com os parâmetros de erro e resultados

        // Se não houver resultados
        if(resultados.length === 0) {
            // Indicamos o status 204 )sem conteúdo) e encerra
            res.status(204).end();
            return;     // força a interrupção do script caso a condição seja verdadeira. Equivalente a die( ) e exit no PHP.
        }

        // Verificação básica por erro
        if(erro){
            // Se erro, statuss 400 e exibir o erro (mesmo que a mensagem nem sempre seria claro)
            res.status(400).json(erro.code);
        } else {
            // Se der certo, status 200 (OK) e apresenta JSON
            res.status(200).json(resultados);
        }
    });
}



// Função INSERIR ALUNO
function inserir(aluno, res) {
    const sql = "INSERT INTO alunos SET ?";

    conexao.query(sql, aluno, (erro) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(201).json({"status" : "aluno inserido!"});
        }
    });
}


function lerUM(id, res){
    const sql = "SELECT * FROM alunos WHERE id = ?";
    conexao.query(sql, id, (erro, resultados) => {

        if(resultados.length === 0){
            res.status(204).end();
            return;
        }

        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(200).json(resultados[0]);
        }
    });
}


function atualizar(id, aluno, res){
    const sql = "UPDATE alunos SET ? WHERE id = ?";
    conexao.query(sql, [aluno, id], (erro, resultados) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            // Saída mais simples
            // res.status(200).json({"status" : "atualizado com sucesso"});

            // Saída mais detalhada
            // ... operaador espalhador de objetos (spread operator)
            res.status(200).json( {...aluno, id} );
        }    
    });
}


function excluir(id, res) {
    const sql = "DELETE FROM alunos WHERE id = ?";
    conexao.query(sql, id, (erro, resultados) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(200).json({ "status" : "aluno excluído", id});
        }
    });

}


export { ler, inserir, lerUM, atualizar, excluir};