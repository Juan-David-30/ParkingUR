document.addEventListener('DOMContentLoaded', function() {
    const botones = document.querySelectorAll('.btn');
    const inputPlaca = document.getElementById('placa-input');
    const mensajeAdvertencia = document.getElementById('mensaje-advertencia');
    const btnSubir = document.getElementById('btn-subir');
    
    let tipoVehiculo = null; // Variable que almacena 0 para moto y 1 para carro
  
    // Evento para manejar la selección de vehículo
    botones.forEach(boton => {
      boton.addEventListener('click', function() {
        // Remover la clase 'seleccionado' de todos los botones
        botones.forEach(b => b.classList.remove('seleccionado'));
  
        // Agregar la clase 'seleccionado' al botón que se ha hecho clic
        this.classList.add('seleccionado');
  
        // Asignar el valor a la variable según el vehículo seleccionado
        if (this.getAttribute('data-vehiculo') === 'carro') {
          tipoVehiculo = 1; // 1 para carro
          inputPlaca.placeholder = 'Placa: 3 letras y 3 números';
          inputPlaca.maxLength = 6;
        } else if (this.getAttribute('data-vehiculo') === 'moto') {
          tipoVehiculo = 0; // 0 para moto
          inputPlaca.placeholder = 'Placa: 3 letras, 2 números y 1 letra';
          inputPlaca.maxLength = 6;
        }
  
        mensajeAdvertencia.style.display = 'none';
      });
    });
  
    // Evento para validar la placa
    inputPlaca.addEventListener('blur', function() {
      const valorPlaca = inputPlaca.value.toUpperCase(); // Convertir a mayúsculas
      let regex;
  
      if (tipoVehiculo === 1) { // Validación para carro
        regex = /^[A-Z]{3}[0-9]{3}$/; // 3 letras seguidas de 3 números
      } else if (tipoVehiculo === 0) { // Validación para moto
        regex = /^[A-Z]{3}[0-9]{2}[A-Z]{1}$/; // 3 letras, 2 números y 1 letra
      }
  
      // Mostrar advertencia si la placa no cumple con el formato
      if (!regex.test(valorPlaca)) {
        mensajeAdvertencia.textContent = 'Formato de placa incorrecto. Por favor, verifica y vuelve a intentar.';
        mensajeAdvertencia.style.display = 'block';
      } else {
        mensajeAdvertencia.style.display = 'none'; // Ocultar el mensaje si el formato es correcto
      }
    });
  
    // Evento para el botón "Subir"
    btnSubir.addEventListener('click', function() {
      const valorPlaca = inputPlaca.value.toUpperCase(); // Convertir a mayúsculas
      let regex;
  
      // Verificar que se haya seleccionado un vehículo antes de enviar
      if (tipoVehiculo === null) {
        alert('Por favor, selecciona un tipo de vehículo antes de subir la placa.');
        return;
      }
  
      if (tipoVehiculo === 1) { // Validación para carro
        regex = /^[A-Z]{3}[0-9]{3}$/; // 3 letras seguidas de 3 números
      } else if (tipoVehiculo === 0) { // Validación para moto
        regex = /^[A-Z]{3}[0-9]{2}[A-Z]{1}$/; // 3 letras, 2 números y 1 letra
      }
  
      // Validar la placa antes de enviar
      if (!regex.test(valorPlaca)) {
        mensajeAdvertencia.textContent = 'Formato de placa incorrecto. Por favor, verifica y vuelve a intentar.';
        mensajeAdvertencia.style.display = 'block';
      } else {
        // Aquí deberías incluir la lógica para enviar la placa a la base de datos.
        // Ejemplo con una solicitud AJAX:
        console.log('Enviando placa a la base de datos:', valorPlaca, 'Tipo de vehículo:', tipoVehiculo);
        alert('Placa enviada correctamente: ' + valorPlaca);
        
        // Limpiar el campo y la selección
        inputPlaca.value = '';
        botones.forEach(b => b.classList.remove('seleccionado'));
        tipoVehiculo = null;
        mensajeAdvertencia.style.display = 'none';
      }
    });
  });
  