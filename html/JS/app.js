// validação de numero 
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.substring(0,11)
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

// validação de email 
function validacaoEmail(field) {
    const email = field.value.trim();  // Remove espaços no início e no fim
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1);

    // Validações:
    if (
        usuario.length >= 1 &&  // usuário não pode ser vazio
        dominio.length >= 3 &&  // domínio deve ter ao menos 3 caracteres
        usuario.search(" ") === -1 &&  // usuário não pode ter espaços
        dominio.search(" ") === -1 &&  // domínio não pode ter espaços
        dominio.search(".") !== -1 &&  // domínio deve ter pelo menos um ponto
        dominio.indexOf(".") >= 1 &&  // o ponto não pode estar no início
        dominio.lastIndexOf(".") < dominio.length - 1 // o ponto não pode estar no final
    ) {
        // Se for válido:
        document.getElementById("msgemail").innerHTML = "E-mail válido";
        document.getElementById("msgemail").style.color = "green";  // Mensagem verde
    } else {
        // Se for inválido:
        document.getElementById("msgemail").innerHTML = "<font color='red'>E-mail inválido </font>";
        document.getElementById("msgemail").style.color = "red";  // Mensagem vermelha
    }
}

// validação de cpf 
let cpf = document.querySelector("#cpf");

cpf.addEventListener("blur", function(){
   if(cpf.value) cpf.value = cpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/,"-");
});

// validação de cep 

const handleZipCode = (event) => {
    let input = event.target
    input.value = zipCodeMask(input.value)
  }
  
  const zipCodeMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.substring(0,8)
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
  }

//Seleção de checkbox
function selecionarCheckbox(checkbox) {
    // Seleciona todos os checkboxes dentro da div container
    var checkboxes = document.querySelectorAll('.container input[type="checkbox"]');

    // Se o checkbox foi marcado, desmarca todos os outros
    checkboxes.forEach(function(item) {
        if (item !== checkbox) {
            item.checked = false; // Desmarca os outros checkboxes
        }
    });
}

// Validação do formulário
function validarFormulario(event) {
    event.preventDefault();  // Impede o envio do formulário

    // Obtendo os valores dos campos
    const nome = document.getElementById('nome').value;
    const nascimento = document.getElementById('nascimento').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.querySelector('input[name="email"]').value;
    const telefone = document.querySelector('input[name="telefone"]').value;
    const sexo = document.getElementById('sexo').value;
    const cep = document.querySelector('input[name="CEP"]').value;
    const termo1 = document.querySelector('input[name="termo"]:checked');
    const termo2 = document.querySelector('input[name="checkbox"]:checked');
  
    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!nome || !nascimento || !cpf || !email || !telefone || !sexo || !cep || !termo1 || !termo2) {
        alert('Por favor, preencha todos os campos obrigatórios e aceite os termos.');
        return;
    }

    // Validando o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Verificando se foi selecionada apenas uma trilha
    const checkboxes = document.querySelectorAll('.custom-checkbox input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

    if (checkedCount !== 1) {
        alert('Você deve selecionar apenas uma trilha de aprendizagem.');
        return;
    }

    // Se passar por todas as validações
    alert('Formulário enviado com sucesso!');
    // Aqui você pode enviar o formulário ou realizar outra ação
}

// Evento para o botão de envio
window.onload = function() {
    let botaoMensagem = document.getElementById("mensagem");
    botaoMensagem.onclick = function () {
        validarFormulario(Event);
    };
}
