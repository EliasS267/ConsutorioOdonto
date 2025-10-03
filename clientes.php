<?php
$host = "localhost";
$db   = "Dentista";   // nome do banco
$user = "postgres";   // usuário do banco
$pass = "sua_senha";  // coloque sua senha aqui

$conn = pg_connect("host=$host dbname=$db user=$user password=$pass");

if (!$conn) {
    http_response_code(500);
    echo "❌ Erro na conexão com o banco de dados.";
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$nome = $input['nome'];
$telefone = $input['telefone'];
$idade = $input['idade'];

$sql = "INSERT INTO clientes (nome, telefone, idade) VALUES ($1, $2, $3)";
$result = pg_query_params($conn, $sql, array($nome, $telefone, $idade));

if ($result) {
    echo "✅ Cliente cadastrado com sucesso!";
} else {
    http_response_code(500);
    echo "❌ Erro ao cadastrar cliente.";
}

pg_close($conn);
?>
