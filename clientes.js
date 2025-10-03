document.getElementById("formCliente").addEventListener("submit", function (e) {
  e.preventDefault(); // impede o envio tradicional

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const idade = document.getElementById("idade").value;

  fetch("clientes.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, telefone, idade }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Aqui você mostra a mensagem
      alert("✅ Cadastro concluído com sucesso!");

      // Limpa os campos (opcional)
      document.getElementById("formCliente").reset();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar cliente:", error);
      alert("❌ Erro ao cadastrar cliente.");
    });
});
