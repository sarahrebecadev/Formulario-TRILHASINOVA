


//calculo de validaçõa do cpf
function somenteNumeros(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito >= 10) primeiroDigito = 0;
    if (primeiroDigito !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito >= 10) segundoDigito = 0;
    if (segundoDigito !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();

    // Referências dos inputs e caixas
    const cpfInput = document.getElementById("cpfCadastro");
    const senhaInput = document.getElementById("senhaCadastro");
    const confirmaInput = document.getElementById("confirmaSenhaCadastro");

    const cpfBox = cpfInput.parentElement;
    const senhaBox = senhaInput.parentElement;
    const confirmaBox = confirmaInput.parentElement;

    let formValido = true;

    // Resetar erros visuais
    [cpfBox, senhaBox, confirmaBox].forEach(box => box.classList.remove("error"));

    // Validações
    if (!validarCPF(cpfInput.value.trim())) {
      cpfBox.classList.add("error");
      formValido = false;
    }

    if (senhaInput.value.trim() === "") {
        senhaBox.classList.add("error");
        formValido = false;
    }

    if (confirmaInput.value.trim() === "" || senhaInput.value !== confirmaInput.value) {
      confirmaBox.classList.add("error");
      formValido = false;
    }
  
  if (formValido) {
    // Mostra a mensagem
    document.getElementById("mensagemEnvio").classList.add("ativo");
  
    // Simula um atraso de envio (tipo carregando no servidor)
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500); // Espera 1,5 segundos antes de redirecionar
  }
  });
