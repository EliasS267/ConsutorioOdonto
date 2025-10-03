<?php include "conexao.php"; ?>
<?php $hoje = date("Y-m-d"); ?>

<h2>Agendamentos de Hoje (<?= date("d/m/Y") ?>)</h2>
<table border="1">
<tr><th>Hora</th><th>Cliente</th><th>Serviço</th></tr>
<?php
$sql = "SELECT a.hora, a.servico, c.nome 
        FROM agendamentos a 
        JOIN clientes c ON a.cliente_id = c.id 
        WHERE a.data = '$hoje'
        ORDER BY a.hora";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()){
  echo "<tr>
          <td>{$row['hora']}</td>
          <td>{$row['nome']}</td>
          <td>{$row['servico']}</td>
        </tr>";
}
?>
</table>
