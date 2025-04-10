document.addEventListener('DOMContentLoaded', function() {
  // Funções auxiliares
  function formatCpf(cpf) {
      cpf = cpf.replace(/\D/g, '');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return cpf;
  }

  function unformatCpf(cpf) {
      return cpf.replace(/\D/g, '');
  }

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

  function validatePassword(password) {
      return password.length >= 6;
  }

  function showMessage(element, message, isError = true) {
      element.textContent = message;
      element.style.display = 'block';
      element.style.color = isError ? '#ff3333' : '#33cc33';
      setTimeout(() => {
          element.style.display = 'none';
      }, 5000);
  }

  function showLoading(message) {
      const loadingText = document.querySelector('.loading-text');
      const loadingOverlay = document.getElementById('loadingOverlay');
      loadingText.textContent = message;
      loadingOverlay.style.display = 'flex';
  }

  function hideLoading() {
      const loadingOverlay = document.getElementById('loadingOverlay');
      loadingOverlay.style.display = 'none';
  }

  // Formatação automática do CPF
  function setupCpfInput(inputId) {
      const input = document.getElementById(inputId);
      if (input) {
          input.addEventListener('input', function(e) {
              e.target.value = formatCpf(e.target.value);
          });
      }
  }

  // Configuração do formulário de login
  if (document.getElementById('form-login')) {
      setupCpfInput('cpfLogin');
      
      document.getElementById('form-login').addEventListener('submit', function(e) {
          e.preventDefault();
          
          const cpf = unformatCpf(document.getElementById('cpfLogin').value);
          const password = document.getElementById('senhaLogin').value.trim();
          const messageElement = document.querySelector('#form-login .span-required');

          if (!validateCpf(document.getElementById('cpfLogin').value)) {
              showMessage(messageElement, 'CPF inválido. Por favor, verifique o número.');
              return;
          }

          if (!validatePassword(password)) {
              showMessage(messageElement, 'Senha deve ter no mínimo 6 caracteres.');
              return;
          }

          showLoading('Validando credenciais...');

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
              
              localStorage.setItem('usuarioLogado', JSON.stringify(user));
              
              setTimeout(() => {
                  window.location.href = 'Participante.html';
              }, 1000);
          }, 1000);
      });
  }

  // Configuração do formulário de cadastro
  if (document.getElementById('formCadastro')) {
      setupCpfInput('cpfCadastro');
      
      document.getElementById('formCadastro').addEventListener('submit', function(e) {
          e.preventDefault();
          
          const cpf = unformatCpf(document.getElementById('cpfCadastro').value);
          const password = document.getElementById('senhaCadastro').value.trim();
          const confirmPassword = document.getElementById('confirmaSenhaCadastro').value.trim();
          const messageElement = document.querySelector('#formCadastro .span-required');

          if (!validateCpf(document.getElementById('cpfCadastro').value)) {
              showMessage(messageElement, 'CPF inválido. Por favor, verifique o número.');
              return;
          }

          if (!validatePassword(password)) {
              showMessage(messageElement, 'Senha deve ter no mínimo 6 caracteres.');
              return;
          }

          if (password !== confirmPassword) {
              showMessage(messageElement, 'As senhas não coincidem.');
              return;
          }

          showLoading('Cadastrando usuário...');

          setTimeout(() => {
              const users = JSON.parse(localStorage.getItem('users')) || [];
              
              if (users.some(u => u.cpf === cpf)) {
                  hideLoading();
                  showMessage(messageElement, 'CPF já cadastrado.');
                  return;
              }

              users.push({ cpf, password });
              localStorage.setItem('users', JSON.stringify(users));
              
              hideLoading();
              showMessage(messageElement, 'Cadastro realizado com sucesso!', false);
              
              setTimeout(() => {
                  window.location.href = 'index.html';
              }, 1000);
          }, 1000);
      });
  }
});