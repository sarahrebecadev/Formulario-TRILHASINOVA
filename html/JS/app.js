// Validação de número de telefone
const handlePhone = (event) => {
  let input = event.target;
  input.value = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, '');
  value = value.substring(0, 11);
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

// Validação de e-mail com expressão regular mais robusta
function validacaoEmail(field) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(field.value);

  const msgEmail = document.getElementById("msgemail");
  if (isValid) {
    msgEmail.innerHTML = "<font color='green'>E-mail válido </font>";
  } else {
    msgEmail.innerHTML = "<font color='red'>E-mail inválido </font>";
  }
  return isValid;
}

// Máscara de data
function formatarData(input) {
  let valor = input.value.replace(/\D/g, '');
  
  // Aplica a máscara
  if (valor.length > 4) {
    valor = valor.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  } else if (valor.length > 2) {
    valor = valor.replace(/(\d{2})(\d{0,2})/, '$1/$2');
  }

  input.value = valor;
}

// Validação de data
function validaData(data) {
  data = data.trim();
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;

  const [diaStr, mesStr, anoStr] = data.split('/');
  const dia = parseInt(diaStr, 10);
  const mes = parseInt(mesStr, 10);
  const ano = parseInt(anoStr, 10);

  if (mes < 1 || mes > 12 || dia < 1) return false;

  const diasNoMes = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((ano % 400 === 0) || (ano % 100 !== 0 && ano % 4 === 0)) diasNoMes[2] = 29;
  if (dia > diasNoMes[mes]) return false;

  const hoje = new Date();
  const dataNasc = new Date(ano, mes - 1, dia);
  return dataNasc <= hoje;
}

// Máscara de CPF
let cpf = document.querySelector("#cpf");

cpf.addEventListener("blur", function() {
  if (cpf.value) cpf.value = cpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/, "-");
});

// Validação de CPF
function validaCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) return "CPF deve ter 11 dígitos";
  if (/^(\d)\1{10}$/.test(cpf)) return "CPF inválido (números repetidos)";

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return "CPF inválido";

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return "CPF inválido";

  return "CPF válido";
}

// Máscara de CEP
function mascaraCEP(input) {
  const valor = input.value.replace(/\D/g, '');
  input.value = valor.replace(/^(\d{5})(\d)/, '$1-$2');
}

// Validação de CEP
(function() {
  const cep = document.querySelector("input[name=cep]");
  cep.addEventListener('blur', e => {
    const value = cep.value.replace(/[^0-9]+/, '');
    const url = `https://viacep.com.br/ws/${value}/json/`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.logradouro) {
          document.querySelector('input[name=rua]').value = json.logradouro;
          document.querySelector('input[name=cidade]').value = json.localidade;
          document.querySelector('input[name=estado]').value = json.uf;
        }
      });
  });
})();

// Seleção de checkbox
function selecionarCheckbox(checkbox) {
  const checkboxes = document.querySelectorAll('.container input[type="checkbox"]');
  checkboxes.forEach(function(item) {
    if (item !== checkbox) {
      item.checked = false;
    }
  });
}

// Validação do formulário
function validarFormulario(event) {
  event.preventDefault();

  let formularioValido = true;
  const elementos = {
    nome: document.getElementById('nome'),
    data: document.getElementById('data'),
    cpf: document.getElementById('cpf'),
    email: document.querySelector('input[name="email"]'),
    telefone: document.querySelector('input[type="tel"]'),
    sexo: document.getElementById('sexo'),
    cep: document.querySelector('input[name="cep"]'),
    termo1: document.querySelectorAll('.box_termo input[type="checkbox"]')[0],
    termo2: document.querySelectorAll('.box_termo input[type="checkbox"]')[1],
    trilhas: document.querySelectorAll('.container input[type="checkbox"]')
  };

  // Mensagens de erro dinâmicas
  const mensagemErro = (campo, mensagem) => {
    const msgElement = document.getElementById(campo);
    if (msgElement) {
      msgElement.innerHTML = `<font color='red'>${mensagem}</font>`;
    }
  };

  if (!elementos.nome.value.trim()) {
    mensagemErro("msgNome", "Por favor, preencha seu nome completo");
    formularioValido = false;
  }

  if (!validaData(elementos.data.value)) {
    mensagemErro("msgData", "Data de nascimento inválida (use DD/MM/AAAA)");
    formularioValido = false;
  }

  if (!elementos.cpf.value || elementos.cpf.value.replace(/\D/g, '').length !== 11) {
    mensagemErro("msgCpf", "CPF inválido (deve ter 11 dígitos)");
    formularioValido = false;
  }

  if (!validacaoEmail(elementos.email)) {
    mensagemErro("msgEmail", "Por favor, insira um e-mail válido");
    formularioValido = false;
  }

  if (elementos.telefone.value.replace(/\D/g, '').length < 11) {
    mensagemErro("msgTelefone", "Telefone inválido (inclua DDD)");
    formularioValido = false;
  }

  if (!elementos.sexo.value) {
    mensagemErro("msgSexo", "Selecione seu sexo");
    formularioValido = false;
  }

  if (elementos.cep.value.replace(/\D/g, '').length !== 8) {
    mensagemErro("msgCep", "CEP inválido");
    formularioValido = false;
  }

  // Verificar checkboxes de trilha
  const trilhasSelecionadas = Array.from(elementos.trilhas).filter(cb => cb.checked).length;
  if (trilhasSelecionadas !== 1) {
    mensagemErro("msgTrilhas", "Selecione exatamente UMA trilha de aprendizagem");
    formularioValido = false;
  }

  // Verificar termos
  if (!elementos.termo1.checked || !elementos.termo2.checked) {
    mensagemErro("msgTermos", "Aceite todos os termos para continuar");
    formularioValido = false;
  }

  // Se tudo estiver válido
  if (formularioValido) {
    alert('✅ Inscrição concluída com sucesso!');

    setTimeout(() => {
      window.location.href = "Pagina.html"; // Voltar para a página de login
    }, 500);
  }
}

// Configuração inicial quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('input[name="email"]').addEventListener('blur', function() {
    validacaoEmail(this);
  });

  document.getElementById('mensagem').addEventListener('click', validarFormulario);

  // Evento de clique no botão de cancelamento
  document.querySelector('.Cancelar').addEventListener('click', function() {
    if (confirm('Deseja realmente cancelar? Os dados preenchidos serão apagados.')) {
      window.location.href = "index.html"; // Redireciona para a página inicial
    }
  });
});
