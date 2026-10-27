import mysql from 'mysql2/promise';  // importando módulo com suporte a Promises

// Criando pool de conexões (mais eficiente que conexões individuais)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escola-api',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Função para testar a conexão
async function testarConexao() {
    try {
        const conexao = await pool.getConnection();
        console.log('Banco de dados conectado com sucesso!');
        conexao.release(); // Importante liberar a conexão de volta para o pool
        return pool;
    } catch (erro) {
        console.error(`Erro ao conectar: ${erro.message}`);
        throw erro;
    }
}

// Executando a função de teste automaticamente
testarConexao()
    .then(() => console.log('Aplicação pronta para uso!'))
    .catch(erro => console.log('Problema ao iniciar aplicação:', erro.message));

// Exportando o pool e a função de teste
export { pool, testarConexao };


/*

Montamos uma linha de segurança para mexer com o banco de dados:
"Vou tentar conectar ao banco" (try)
"Se der certo, aviso que funcionou e libero a conexão" (conexao.release)
"Se der erro, aviso qual foi o problema" (catch)
O fluxo funciona assim:
Tenta pegar uma conexão do pool (await pool.getConnection())
Se conseguir, mostra mensagem de sucesso, libera a conexão e retorna o pool
Se falhar, mostra o erro e repassa esse erro para quem chamou a função

*/