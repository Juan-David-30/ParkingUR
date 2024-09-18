const tipo = document.getElementById('tipo');
const placa = document.getElementById('placa');

tipo.addEventListener('change', (event)=>{


    if(event.target.value == '1')
    {
        placa.pattern = '[A-Za-z]{3}[0-9]{3}';
        placa.title = 'Formato de placa 3 letras 3 números';
    }
    else if (event.target.value == '0')
    {
        placa.pattern = '[A-Za-z]{3}[0-9]{2}[A-Za-z]';
        placa.title = 'Formato de placa 3 letras 2 números 1 letra';
    }
});