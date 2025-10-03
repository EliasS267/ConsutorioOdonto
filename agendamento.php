<?php include "conexao.php"; ?>

<h2>Agendar Consulta</h2>
<form method="POST">
  <label>Cliente:</label>
  <select name="cliente_id" required>
    <?php
    $clientes = $conn->query("SELECT * FROM clientes ORDER BY nome");
    while($c = $clientes->fetch_assoc()){
      echo "<option value='{$c['id']}'>{$c['nome']}</option>";
    }
    ?>
  </select><br><br>
  
  <input type="date" name="data" required>
  <input type="time" name="hora" required>
  <input type="text" name="servico" placeholder="Serviço" required>
  <button type="submit">Agendar</button>
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cliente_id = $_POST["cliente_id"];
    $data = $_POST["data"];
    $hora = $_POST["hora"];
    $servico = $_POST["servico"];

    $sql = "INSERT INTO agendamentos (cliente_id, data, hora, servico) 
            VALUES ('$cliente_id','$data','$hora','$servico')";
    $conn->query($sql);
    echo "<p>✅ Agendamento realizado!</p>";
}
?>

<h2>Todos os Agendamentos</h2>
<table border="1">
<tr><th>Data</th><th>Hora</th><th>Cliente</th><th>Serviço</th></tr>
<?php
$sql = "SELECT a.data, a.hora, a.servico, c.nome 
        FROM agendamentos a 
        JOIN clientes c ON a.cliente_id = c.id 
        ORDER BY a.data, a.hora";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()){
  echo "<tr>
          <td>{$row['data']}</td>
          <td>{$row['hora']}</td>
          <td>{$row['nome']}</td>
          <td>{$row['servico']}</td>
        </tr>";
}
?>
</table>
