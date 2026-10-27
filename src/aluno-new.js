import { pool } from './banco-new.js';

/* Funções para o CRUD */
async function ler(res) {
    // Comando SQL a ser executado
    const sql = "SELECT * FROM alunos ORDER BY nome";

    try {
        // Executa a query usando o pool de conexões com Promises
        const [resultados] = await pool.query(sql);

        // Se não houver resultados
        if(resultados.length === 0) {
            // Indicamos o status 204 (sem conteúdo) e encerra
            res.status(204).end();
            return;
        }

        // Se der certo, status 200 (OK) e apresenta JSON
        res.status(200).json(resultados);
        
    } catch (erro) {
        // Se erro, status 400 e exibir o erro
        res.status(400).json({
            mensagem: `Erro ao acessar dados: ${erro.message}`,
            codigo: erro.code
        });
    }
}

export { ler };