// Função para alternar entre seções
function mostrar(secao) {
  document.getElementById("cadastro").style.display = "none";
  document.getElementById("lista").style.display = "none";
  document.getElementById("agendamentos").style.display = "none";
  document.getElementById("agenda_hoje").style.display = "none";

  document.getElementById(secao).style.display = "block";

  if (secao === "lista") {
    carregarClientes();
  }
}

// Função para carregar os clientes do banco e atualizar a tabela + datalist
function carregarClientes() {
  fetch("clientes.php")
    .then((res) => res.json())
    .then((dados) => {
      const tabela = document.getElementById("tabelaClientes");
      const listaNomes = document.getElementById("nomesClientes");

      tabela.innerHTML = "";
      listaNomes.innerHTML = "";

      dados.forEach((c) => {
        tabela.innerHTML += `
          <tr>
            <td>${c.id}</td>
            <td>${c.nome}</td>
            <td>${c.telefone}</td>
            <td>${c.idade}</td>
          </tr>`;

        listaNomes.innerHTML += `<option value="${c.nome}">`;
      });
    })
    .catch((erro) => {
      console.error("Erro ao carregar clientes:", erro);
    });
}

// Tudo acontece após o carregamento da página
window.addEventListener("load", () => {
  // Mostrar a seção de cadastro ao abrir
  mostrar("cadastro");

  // Carrega lista de clientes ao iniciar
  carregarClientes();

  // Eventos dos botões do menu
  document
    .getElementById("btnClientes")
    .addEventListener("click", () => mostrar("cadastro"));
  document
    .getElementById("btnListaClientes")
    .addEventListener("click", () => mostrar("lista"));
  document
    .getElementById("btnAgendamentos")
    .addEventListener("click", () => mostrar("agendamentos"));
  document
    .getElementById("btnAgendaHoje")
    .addEventListener("click", () => mostrar("agenda_hoje"));

  // Evento de envio do formulário de cadastro
  document
    .getElementById("formCliente")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const dados = new FormData(this);
      const msgDiv = document.getElementById("mensagem");

      fetch("salvar_cliente.php", {
        method: "POST",
        body: dados,
      })
        .then((res) => res.text())
        .then((retorno) => {
          // Exibe a mensagem e aplica estilos conforme sucesso ou erro
          msgDiv.style.display = "block";
          msgDiv.textContent = retorno;

          if (retorno.toLowerCase().includes("sucesso")) {
            msgDiv.style.backgroundColor = "#d4edda"; // verde claro
            msgDiv.style.color = "#155724"; // verde escuro
            msgDiv.style.border = "1px solid #c3e6cb";
          } else {
            msgDiv.style.backgroundColor = "#f8d7da"; // vermelho claro
            msgDiv.style.color = "#721c24"; // vermelho escuro
            msgDiv.style.border = "1px solid #f5c6cb";
          }

          this.reset();
          carregarClientes();

          // Esconde a mensagem depois de 5 segundos
          setTimeout(() => {
            msgDiv.style.display = "none";
          }, 5000);
        })
        .catch((erro) => {
          msgDiv.style.display = "block";
          msgDiv.textContent = "Erro ao cadastrar cliente. Tente novamente.";
          msgDiv.style.backgroundColor = "#f8d7da";
          msgDiv.style.color = "#721c24";
          msgDiv.style.border = "1px solid #f5c6cb";
          console.error("Erro na requisição:", erro);
        });
    });
});
