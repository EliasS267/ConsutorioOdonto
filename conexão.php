<?php
header("Content-Type: application/json; charset=UTF-8");

// Configuração da conexão com o banco de dados
$host = "localhost";
$port = "5432";
$dbname = "Dentista";
$user = "postgres";
$password = "boot";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
  http_response_code(500);
  echo json_encode(["erro" => "Falha na conexão com PostgreSQL"]);
  exit;
}

// Buscar os clientes
$query = "SELECT id, nome, telefone, idade FROM clientes";
$result = pg_query($conn, $query);

if (!$result) {
  echo json_encode(["erro" => "Erro ao consultar clientes"]);
  exit;
}

// Armazenar os dados dos clientes
$clientes = [];
while ($row = pg_fetch_assoc($result)) {
  $clientes[] = $row;
}

// Retornar os dados como JSON
echo json_encode($clientes);

// Fechar a conexão
pg_close($conn);
?>