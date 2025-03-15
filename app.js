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

