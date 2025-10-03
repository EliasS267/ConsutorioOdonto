<?php
header("Content-Type: text/plain; charset=UTF-8");

// Conexão com o banco de dados PostgreSQL
$host = "localhost";
$port = "5432";
$dbname = "Dentista";
$user = "postgres";
$password = "boot";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    http_response_code(500);
    echo "Erro na conexão com o banco de dados.";
    exit;
}

// Recebe os dados do formulário via POST
$nome = $_POST['nome'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$idade = $_POST['idade'] ?? '';

if (empty($nome) || empty($telefone) || empty($idade)) {
    http_response_code(400);
    echo "Todos os campos são obrigatórios.";
    exit;
}

// Insere os dados na tabela 'clientes'
$query = "INSERT INTO clientes (nome, telefone, idade) VALUES ($1, $2, $3)";
$result = pg_query_params($conn, $query, [$nome, $telefone, $idade]);

if ($result) {
    echo "Cadastro concluído com sucesso";
} else {
    http_response_code(500);
    echo "Erro ao cadastrar cliente.";
}
?>
