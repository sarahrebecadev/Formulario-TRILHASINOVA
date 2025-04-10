//Mascara de telefone
function aplicarMascaraTelefone(input) {
  let telefone = input.value.replace(/\D/g, ''); // Remove tudo que não for número

  if (telefone.length <= 10) { 
    telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // Para números fixos
  } else { 
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Para números celulares
  }

  input.value = telefone;
}

// Validação de e-mail mais robusta
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
  const msgData = document.getElementById("msgDATA");
  data = data.trim();
  
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
    msgData.innerHTML = "<span style='red'>Data inválida </span>";
    return false;
  }

  const [diaStr, mesStr, anoStr] = data.split('/');
  const dia = parseInt(diaStr, 10);
  const mes = parseInt(mesStr, 10);
  const ano = parseInt(anoStr, 10);

  if (mes < 1 || mes > 12 || dia < 1) {
    msgData.innerHTML = "<span style='red'>Data inválida </span>";
    return false;
  }

  const diasNoMes = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((ano % 400 === 0) || (ano % 100 !== 0 && ano % 4 === 0)) diasNoMes[2] = 29;
  if (dia > diasNoMes[mes]) {
    msgData.innerHTML = "<span style='red'>Data inválida </span>";
    return false;
  }

  const hoje = new Date();
  const dataNasc = new Date(ano, mes - 1, dia);
  if (dataNasc > hoje) {
    msgData.innerHTML = "<span style='red'>Data inválida </span>";
    return false;
  }

  msgData.innerHTML = "<span style='green'>Data válida </span>";
  return true;
}

// Máscara de CPF
function aplicarMascaraCPF(input) {; 
  let cpf = input.value.replace(/\D/g, '')
  if (cpf.length <= 11) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); 
  }
  input.value = cpf;
}

//Validação de CPF
function validaCPF(cpf) {
  const msgCPF = document.getElementById("msgCPF");
  cpf = cpf.replace(/\D/g, ''); // Remove qualquer caractere não numérico

  // Verifica se o CPF tem exatamente 11 dígitos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    msgCPF.innerHTML = "<span style='red'>CPF inválido! </span>";
    return false;
  }

  // Validação dos dois dígitos verificadores
  let soma = 0;
  let resto;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(9))) {
    msgCPF.innerHTML = "<span style='red'>CPF inválido! </span>";
    return false;
  }

  soma = 0;

  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(10))) {
    msgCPF.innerHTML = "<span style='red'>CPF inválido! </span>";
    return 'CPF inválido';
  }

  msgCPF.innerHTML = "<span style='green'>CPF válido! </span>";
  return 'CPF válido';
}


// Máscara de CEP
function mascaraCEP(input) {
  const valor = input.value.replace(/\D/g, '');
  input.value = valor.replace(/^(\d{5})(\d)/, '$1-$2');
}

// Validação de CEP com API 
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
  
  checkboxes.forEach(item => {
    if (item !== checkbox) {
      item.checked = false;
    }
  });
}
  
// Função de validação do formulário
function validarFormulario(event) {
  event.preventDefault(); // Previne o envio do formulário inicialmente
  
  let formularioValido = true;
  let camposFaltando = [];

  const elementos = {
    nome: document.getElementById('nome'),
    data: document.getElementById('data'),
    cpf: document.getElementById('cpf'),
    email: document.querySelector('input[name="email"]'),
    telefone: document.querySelector('input[type="tel"]'),
    sexo: document.getElementById('sexo'),
    cep: document.querySelector('input[name="cep"]'),
    rua: document.getElementById('Rua'),
    cidade: document.getElementById('Cid'),
    numero: document.getElementById('number'),
    estado: document.getElementById('Est'),
    checkbox: document.getElementById('checkbox'),
    termo1: document.getElementById('termo1'),
    termo2: document.getElementById('termo2'),
  };

  // Limpar as mensagens de erro anteriores e remover bordas vermelhas
  document.querySelectorAll(".input-group div[id^='msg']").forEach(msg => {
    msg.innerHTML = '';
  });
  document.querySelectorAll("input, select").forEach(input => {
    input.style.borderColor = ""; // Remove a borda vermelha
  });

  // Validando campos obrigatórios
  if (!elementos.nome.value.trim()) {
    camposFaltando.push('Nome');
    formularioValido = false;
    elementos.nome.style.border = '2px solid red', // Muda a borda para vermelho
    mensagemErro('msgNome', 'O campo Nome é obrigatório');
  }

  if (!elementos.data.value.trim()) {
    camposFaltando.push('Data de Nascimento');
    formularioValido = false;
    elementos.data.style.border = ' 2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgData', 'O campo Data de Nascimento é obrigatório');
  }

  if (!elementos.cpf.value.trim()) {
    camposFaltando.push('CPF');
    formularioValido = false;
    elementos.cpf.style.border = '2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgCpf', 'O campo CPF é obrigatório');
  }

  if (!elementos.email.value.trim()) {
    camposFaltando.push('E-mail');
    formularioValido = false;
    elementos.email.style.border= '2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgEmail', 'O campo E-mail é obrigatório');
  }

  if (!elementos.telefone.value.trim()) {
    camposFaltando.push('Telefone');
    formularioValido = false;
    elementos.telefone.style.border = '2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgTelefone', 'O campo Telefone é obrigatório');
  }

  if (!elementos.sexo.value.trim()) {
    camposFaltando.push('Sexo');
    formularioValido = false;
    elementos.sexo.style.border = '2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgSexo', 'O campo Sexo é obrigatório');
  }

  if (!elementos.cep.value.trim()) {
    camposFaltando.push('cep');
    formularioValido = false;
    elementos.cep.style.border = '2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgCep', 'O campo CEP é obrigatório');
  }

  if (!elementos.rua.value.trim()) {
    camposFaltando.push('Rua');
    formularioValido = false;
    elementos.rua.style.border = '2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgRua', 'O campo Rua é obrigatório');
  }

  if (!elementos.cidade.value.trim()) {
    camposFaltando.push('Cidade');
    formularioValido = false;
    elementos.cidade.style.border = '2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgCidade', 'O campo Cidade é obrigatório');
  }
  
  if (!elementos.numero.value.trim()) {
  camposFaltando.push('Número');
  formularioValido = false;
  elementos.numero.style.border = '2px solid red';
  mensagemErro('msgNumero', 'O campo Número é obrigatório');
}

  if (!elementos.estado.value.trim()) {
    camposFaltando.push('Estado');
    formularioValido = false;
    elementos.estado.style.border = '2px solid red'; // Muda a borda para vermelho
    mensagemErro('msgEstado', 'O campo Estado é obrigatório');
  }

  // Validando os checkboxes
  if (!elementos.termo1.checked) {
    camposFaltando.push('Termo1');
    formularioValido = false;
    mensagemErro('msgTermo1', 'Você deve aceitar o Termo 1');
  }

  if (!elementos.termo2.checked) {
    camposFaltando.push('Termo2');
    formularioValido = false;
    mensagemErro('msgTermo2', 'Você deve aceitar o Termo 2');
  }


  // Se algum campo estiver faltando
  if (!formularioValido) {
    alert(`Por favor, preencha os seguintes campos: ${camposFaltando.join(', ')}`);
    return;
  }

  // Se todos os campos estiverem preenchidos corretamente
  alert('✅ Inscrição concluída com sucesso!');

  // Exibe a tela de carregamento
  document.getElementById('carregando').style.display = 'flex'; // Exibe a tela de carregamento

  setTimeout(() => {
    document.getElementById('carregando').style.display = 'none';
    window.location.href = "index.html"; 
  }, 1000); // Delay de 1 segundo
}

// Função para mostrar a mensagem de erro
function mensagemErro(campo, mensagem) {
  const msgElement = document.getElementById(campo);
  if (msgElement) {
    msgElement.innerHTML = `<font color='red'>${mensagem}</font>`;
  }
}

// Configuração inicial para quando a página carregar
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
