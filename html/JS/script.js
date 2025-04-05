 const spans = documentquerySelectorAll ('.span-required')
 const campos = documentquerySelectorAll ('.required')

 function setError(index){
    campos[index].style.border= '2px solid #e63636'
 }



// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove qualquer caractere que não seja número

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se o CPF é uma sequência de números repetidos, o que é inválido
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação dos dígitos verificadores
    let soma = 0;
    let resto;

    // Validação do primeiro dígito
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    // Validação do segundo dígito
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}


function cadastrar() {
    const cpf = document.getElementById('cpfCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confirmaSenha = document.getElementById('confirmaSenhaCadastro').value;

    // Verifica se o CPF é válido
    if (!validarCPF(cpf)) {
        alert("Por favor, insira um CPF válido.");
        document.getElementById('cpfCadastro').value = ""; // Limpa o campo CPF
        return;
    }
setError(cpf)
    // Verifica se os campos estão vazios e preenche com uma mensagem padrão
    if (!senha) {
        alert("Por favor, preencha o campo Senha.");
        document.getElementById('senhaCadastro').value = "campo_vazio"; // Ou qualquer valor padrão
        return;
    }
    if (!confirmaSenha) {
        alert("Por favor, preencha o campo Confirmar Senha.");
        document.getElementById('confirmaSenhaCadastro').value = "campo_vazio"; // Ou qualquer valor padrão
        return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Salva os dados no localStorage
    localStorage.setItem(cpf, senha);
    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html"; // redireciona para o formulario
}
function logar() {
    const cpf = document.getElementById('cpfLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    // Verifica se o CPF é válido
    if (!validarCPF(cpf)) {
        alert("Por favor, insira um CPF válido.");
        document.getElementById('cpfLogin').value = ""; // Limpa o campo CPF
        return;
    }

    // Verifica se os campos estão vazios e preenche com uma mensagem padrão
    if (!senha) {
        alert("Por favor, preencha o campo Senha.");
        document.getElementById('senhaLogin').value = "campo_vazio"; // Ou qualquer valor padrão
        return;
    }

    const senhaSalva = localStorage.getItem(cpf);

    if (senhaSalva && senha === senhaSalva) {
        alert("Login realizado com sucesso!");
        window.location.href = "index.html"; // redireciona para a página inicial
    } else {
        alert("CPF ou senha inválidos.");
    }
}
 

