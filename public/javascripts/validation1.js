document.addEventListener('DOMContentLoaded', function() {
    const botones = document.querySelectorAll('.btn');
    const inputPlaca = document.getElementById('placa-input');
    let tipoVehiculoSeleccionado = null;
  
    // Evento para manejar la selección de vehículo
    botones.forEach(boton => {
      boton.addEventListener('click', function() {
        // Remover la clase 'seleccionado' de todos los botones
        botones.forEach(b => b.classList.remove('seleccionado'));
  
        // Agregar la clase 'seleccionado' al botón que se ha hecho clic
        this.classList.add('seleccionado');
        tipoVehiculoSeleccionado = this.getAttribute('data-vehiculo');
  
        // Limpiar el valor del input y establecer el placeholder adecuado
        inputPlaca.value = '';
        if (tipoVehiculoSeleccionado === 'carro') {
          inputPlaca.placeholder = 'Placa: 3 letras y 3 números';
          inputPlaca.maxLength = 6;
        } else if (tipoVehiculoSeleccionado === 'moto') {
          inputPlaca.placeholder = 'Placa: 3 letras, 2 números y 1 letra';
          inputPlaca.maxLength = 6;
        }
        
  