class CadastroCliente {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.nomeInput = this.form.querySelector("#nome");
    this.telefoneInput = this.form.querySelector("#telefone");
    this.idadeInput = this.form.querySelector("#idade");
    this.mensagemDiv = this.form.querySelector("#mensagem");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(event) {
    event.preventDefault();

    const nome = this.nomeInput.value.trim();
    const telefone = this.telefoneInput.value.trim();
    const idade = this.idadeInput.value.trim();

    if (!nome || !telefone || !idade) {
      this.showMensagem("Por favor, preencha todos os campos.", false);
      return;
    }

    const dados = { nome, telefone, idade };

    // Aqui você pode testar com uma URL fake para ver se o JS está funcionando
    // fetch("clientes.php", { ...
    fetch("clientes.php", {
      // Exemplo fake endpoint para teste
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Veja a resposta no console para debugar

        this.showMensagem("✅ Cadastro concluído com sucesso!", true);
        this.form.reset();
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar cliente:", erro);
        this.showMensagem("❌ Erro na comunicação com o servidor.", false);
      });
  }

  showMensagem(msg, sucesso = true) {
    this.mensagemDiv.style.display = "block";
    this.mensagemDiv.textContent = msg;

    if (sucesso) {
      this.mensagemDiv.style.backgroundColor = "#d4edda";
      this.mensagemDiv.style.color = "#155724";
      this.mensagemDiv.style.border = "1px solid #c3e6cb";
    } else {
      this.mensagemDiv.style.backgroundColor = "#f8d7da";
      this.mensagemDiv.style.color = "#721c24";
      this.mensagemDiv.style.border = "1px solid #f5c6cb";
    }

    setTimeout(() => {
      this.mensagemDiv.style.display = "none";
    }, 5000);
  }
}

window.addEventListener("load", () => {
  new CadastroCliente("formCliente");
});
