function agregarInput() {
    // Crear un nuevo elemento input
    var nuevoInput = document.createElement("input");
    nuevoInput.type = "text";
    nuevoInput.className = "edit-button";

    // Agregar el nuevo input debajo del original
    var contenedor = document.getElementById("Skills-container");
    contenedor.appendChild(nuevoInput);
  }