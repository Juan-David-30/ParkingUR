const inputs_tipo = document.getElementsByName('tipo');
const placa = document.getElementById('placa-input');

inputs_tipo.forEach(tipo => {
    tipo.addEventListener('change', (event)=>{

        if(event.target.value == 'Carro')
        {
            placa.pattern = '[A-Za-z]{3}[0-9]{3}';
            placa.title = 'Formato de placa 3 letras 3 números';
        }
        else if (event.target.value == 'Moto')
        {
            placa.pattern = '[A-Za-z]{3}[0-9]{2}[A-Za-z]';
            placa.title = 'Formato de placa 3 letras 2 números 1 letra';
        }
    }); 
});


const input_placa = document.getElementById('placa-input');

input_placa.addEventListener('change', event => {

    event.target.value = event.target.value.toUpperCase().replace(/\s/g, ''); 
})