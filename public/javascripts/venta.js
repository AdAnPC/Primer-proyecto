
  const cantidadInput = document.getElementById('cantidad');
  const precioInput = document.getElementById('precio');
  const totalInput = document.getElementById('total');

  function calcularTotal() {
    const cantidad = parseFloat(cantidadInput.value) || 0;
    const precio = parseFloat(precioInput.value) || 0;
    totalInput.value = (cantidad * precio).toFixed(2);
  }

  cantidadInput.addEventListener('input', calcularTotal);
  precioInput.addEventListener('input', calcularTotal);

