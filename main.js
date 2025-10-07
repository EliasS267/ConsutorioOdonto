document.getElementById("formCliente").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  // idade ainda não está sendo salva no banco
  // const idade = document.getElementById("idade").value;

  try {
    const response = await fetch(
      "https://consultorioodonto-production.up.railway.app/clientes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, telefone }),
      }
    );

    if (response.ok) {
      const cliente = await response.json();
      alert(`Cliente ${cliente.nome} cadastrado com sucesso!`);
      document.getElementById("formCliente").reset();
    } else {
      alert("Erro ao cadastrar cliente.");
    }
  } catch (error) {
    console.error(error);
    alert("Falha ao conectar com o servidor.");
  }
});
