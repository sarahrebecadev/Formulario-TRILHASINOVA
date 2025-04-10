document.addEventListener('DOMContentLoaded', function() {
    // Função para permitir apenas números no CPF
    function somenteNumeros(event) {
        event.target.value = event.target.value.replace(/\D/g, '');
    }

    // Formatação do CPF
    function formatCpf(cpf) {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }

    // Remove formatação do CPF
    function unformatCpf(cpf) {
        return cpf.replace(/\D/g, '');
    }

    // Validação de CPF
    function validateCpf(cpf) {
        cpf = unformatCpf(cpf);
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

    // Validação de senha
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Mostrar mensagem de erro/sucesso
    function showMessage(element, message, isError = true) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.color = isError ? '#ff3333' : '#33cc33';
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }

    // Mostrar tela de carregamento
    function showLoading(message) {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            const loadingText = loadingScreen.querySelector('p');
            loadingText.textContent = message;
            loadingScreen.style.display = 'flex';
        }
    }

    // Esconder tela de carregamento
    function hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }

    // ========== FORMULÁRIO DE LOGIN ==========
    if (document.getElementById('form-login')) {
        const cpfLogin = document.getElementById('cpfLogin');
        const senhaLogin = document.getElementById('senhaLogin');
        
        // Formatação automática do CPF
        cpfLogin.addEventListener('input', function(e) {
            e.target.value = formatCpf(e.target.value);
        });

        document.getElementById('form-login').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cpf = unformatCpf(cpfLogin.value);
            const password = senhaLogin.value.trim();
            const messageElement = document.querySelector('#form-login .span-required');

            // Validações
            if (!validateCpf(cpfLogin.value)) {
                showMessage(messageElement, 'CPF inválido. Por favor, verifique o número.');
                return;
            }

            if (!validatePassword(password)) {
                showMessage(messageElement, 'Senha deve ter no mínimo 6 caracteres.');
                return;
            }

            showLoading('Validando credenciais...');

            // Simular verificação no localStorage
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(u => u.cpf === cpf);

                if (!user) {
                    hideLoading();
                    showMessage(messageElement, 'Usuário não encontrado.');
                    return;
                }

                if (user.password !== password) {
                    hideLoading();
                    showMessage(messageElement, 'Senha incorreta. Tente novamente.');
                    return;
                }

                hideLoading();
                showMessage(messageElement, 'Login realizado com sucesso!', false);
                
                // Armazena usuário logado e redireciona
                localStorage.setItem('loggedUser', JSON.stringify(user));
                setTimeout(() => {
                    window.location.href = 'Participante.html';
                }, 1000);
            }, 1000);
        });
    }

    // ========== FORMULÁRIO DE CADASTRO ==========
    if (document.getElementById('formCadastro')) {
        const cpfCadastro = document.getElementById('cpfCadastro');
        const senhaCadastro = document.getElementById('senhaCadastro');
        const confirmaSenhaCadastro = document.getElementById('confirmaSenhaCadastro');
        
        // Formatação automática do CPF
        cpfCadastro.addEventListener('input', function(e) {
            e.target.value = formatCpf(e.target.value);
        });

        document.getElementById('formCadastro').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cpf = unformatCpf(cpfCadastro.value);
            const password = senhaCadastro.value.trim();
            const confirmPassword = confirmaSenhaCadastro.value.trim();
            const errorSpans = document.querySelectorAll('#formCadastro .span-required');

            // Resetar mensagens de erro
            errorSpans.forEach(span => {
                span.style.display = 'none';
            });

            // Validações
            let isValid = true;

            if (!validateCpf(cpfCadastro.value)) {
                errorSpans[0].textContent = 'CPF inválido. Por favor, verifique o número.';
                errorSpans[0].style.display = 'block';
                isValid = false;
            }

            if (!validatePassword(password)) {
                errorSpans[1].textContent = 'Senha deve ter no mínimo 6 caracteres.';
                errorSpans[1].style.display = 'block';
                isValid = false;
            }

            if (password !== confirmPassword) {
                errorSpans[2].textContent = 'As senhas não coincidem.';
                errorSpans[2].style.display = 'block';
                isValid = false;
            }

            if (!isValid) return;

            showLoading('Cadastrando usuário...');

            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // Verifica se CPF já existe
                if (users.some(u => u.cpf === cpf)) {
                    hideLoading();
                    errorSpans[0].textContent = 'CPF já cadastrado.';
                    errorSpans[0].style.display = 'block';
                    return;
                }

                // Adiciona novo usuário
                users.push({ cpf, password });
                localStorage.setItem('users', JSON.stringify(users));
                
                hideLoading();
                
                // Mensagem de sucesso e redirecionamento
                alert('Cadastro realizado com sucesso! Você será redirecionado para o Formulario.');
                setTimeout(() => {
                    window.location.href = 'Form.html';
                }, 1000);
            }, 1000);
        });
    }
});