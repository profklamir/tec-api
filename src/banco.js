import mysql from 'mysql2';  // importando módulo


// armazenando dados de conexão em uma constante.
// Sintaxe retirada direto da documentação do pacote


// LOCAL
// const conexao = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'escola-api'
// });


// REMOTO
const conexao = mysql.createConnection({
    host: 'db4free.net',
    user: 'testedb11',
    password: 'Senac@123',
    database: 'bdteste11'
});

// conectando e passando mensagem de erro ou sucesso
// erro é um objeto e tem a propriedade message que devolve uma mensagem de acordo com o erro encontrado.
conexao.connect(erro => {
    if(erro){
        console.error(`Erro ao conectar: ${erro.message}`);
    } else {
        //console.log(`Banco de dados conectado com sucesso!`)
        console.log(`Banco de dados conectado em ${conexao.config.host}`);
    }
});

export default conexao;