// validação de cpf 
let cpf = document.querySelector("#cpf");

cpf.addEventListener("blur", function(){
   if(cpf.value) cpf.value = cpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/,"-");
});


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

