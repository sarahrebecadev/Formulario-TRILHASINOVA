//Ainda não ta pronto essa parte de pdf
/* Quando o botão de gerar PDF for clicado
document.getElementById('gerarPdf').addEventListener('click', function() {
  // Pega os dados do formulário
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;
  const cpf = document.getElementById('cpf').value;
  const sexo = document.getElementById('sexo').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const cep = document.getElementById('cep').value;
  const rua = document.getElementById('Rua').value;
  const cidade = document.getElementById('Cid').value;
  const estado = document.getElementById('Est').value;

  // Usando jsPDF para gerar o PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.text('Formulário de Inscrição', 10, 10);
  doc.text(`Nome: ${nome}`, 10, 20);
  doc.text(`Data de Nascimento: ${data}`, 10, 30);
  doc.text(`CPF: ${cpf}`, 10, 40);
  doc.text(`Sexo: ${sexo}`, 10, 50);
  doc.text(`E-mail: ${email}`, 10, 60);
  doc.text(`Telefone: ${telefone}`, 10, 70);
  doc.text(`CEP: ${cep}`, 10, 80);
  doc.text(`Rua: ${rua}`, 10, 90);
  doc.text(`Cidade: ${cidade}`, 10, 100);
  doc.text(`Estado: ${estado}`, 10, 110); 

 // Salva o PDF

  doc.save('inscricao_programa_trilhas.pdf');

}); */





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
function aplicarMascaraCPF(input) {; 
  let cpf = input.value.replace(/\D/g, '')
  if (cpf.length <= 11) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); 

  }      
   input.value = cpf;                              
}



//Validação de CPF
function validaCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove qualquer caractere não numérico

  // Verifica se o CPF tem exatamente 11 dígitos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return "CPF inválido!";

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
    return "CPF inválido!";
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
    return "CPF inválido!";
  }



  return "CPF válido!";
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
          document.querySelector('input[name=cidade]').value = json.localidade;          document.querySelector('input[name=estado]').value = json.uf;

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

  

// Função de validação do formulário ao clicar no botão de inscrição
function validarFormulario(event) {
  event.preventDefault(); // Previne o envio do formulário
  let formularioValido = true;

  // Exibe a tela de carregamento
  document.getElementById('carregando').style.display = 'flex';
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
    estado: document.getElementById('Est'),

  };



  // Limpar as mensagens de erro anteriores
  document.querySelectorAll(".input-group div[id^='msg']").forEach(msg => {
    msg.innerHTML = '';

  });

  // Validando campos obrigatórios

  if (!elementos.nome.value.trim()) {
    camposFaltando.push('Nome');
    formularioValido = false;

  }



  if (!elementos.data.value.trim()) {
    camposFaltando.push('Data de Nascimento');
    formularioValido = false;

  }



  if (!elementos.cpf.value.trim()) {
    camposFaltando.push('CPF');
    formularioValido = false;

  }



  if (!elementos.email.value.trim()) {
    camposFaltando.push('E-mail');
    formularioValido = false;

  }



  if (!elementos.telefone.value.trim()) {
    camposFaltando.push('Telefone');
    formularioValido = false;

  }



  if (!elementos.sexo.value.trim()) {
    camposFaltando.push('Sexo');
    formularioValido = false;

  }



  if (!elementos.cep.value.trim()) {
    camposFaltando.push('CEP');
    formularioValido = false;

  }



  if (!elementos.rua.value.trim()) {
    camposFaltando.push('Rua');
    formularioValido = false;

  }



  if (!elementos.cidade.value.trim()) {
    camposFaltando.push('Cidade');
    formularioValido = false;

  }



  if (!elementos.estado.value.trim()) {
    camposFaltando.push('Estado');
    formularioValido = false;

  }



  // Se algum campo estiver faltando

  if (!formularioValido) {
    alert(`Por favor, preencha os seguintes campos: ${camposFaltando.join(', ')}`);
    
    // Esconde a tela de carregamento em caso de erro
    document.getElementById('carregando').style.display = 'none';
    return;

  }



  // Caso o formulário seja válido, você pode realizar as ações desejadas (como gerar PDF ou enviar)
  alert('✅ Inscrição concluída com sucesso!');
  // Simula um tempo de processamento, e então redireciona
  setTimeout(() => {
    // Esconde a tela de carregamento
    document.getElementById('carregando').style.display = 'none';
    window.location.href = "Pagina.html"; // Redireciona para a próxima página
  }, 2000); // 2 segundos de delay para o exemplo

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
