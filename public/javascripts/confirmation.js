const form = document.getElementById("formulario")
const modal = document.getElementById("modal_container")
const accept = document.getElementById('aceptar_btn')
const cancel = document.getElementById('rechazar_btn')


form.addEventListener('submit', function (event) {
    event.preventDefault(); 
    modal.style.display = 'block'; 
});

accept.addEventListener('click', function () {
    modal.style.display = 'none';
    // Podemos añadir validación extra
    form.submit();
});

cancel.addEventListener('click', function () {
    modal.style.display = 'none'; 
});
