const forms = document.getElementsByTagName("form")
const modal = document.getElementById("modal_container")
const accept = document.getElementById('aceptar_btn')
const cancel = document.getElementById('rechazar_btn')

let focusedForm;

for (form of forms) 
{
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 
        focusedForm = form
        modal.style.display = 'block'; 
    });
}

accept.addEventListener('click', function () {
    modal.style.display = 'none';
    // Podemos añadir validación extra
    focusedForm.submit();
});

cancel.addEventListener('click', function () {
    modal.style.display = 'none'; 
});
