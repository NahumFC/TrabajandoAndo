    // Obtener elementos
    var botones = document.getElementsByClassName('apply-button');
    var avisos = document.getElementsByClassName('aviso');

    for (var i = 0; i < botones.length; i++) {
      botones[i].addEventListener('click', function() {
        var aviso = this.nextElementSibling;
        aviso.innerText = 'Usted ha aplicado a la vacante correctamente';
        aviso.style.display = 'block';
      });
    }


     // Obtener elementos
     var botones = document.getElementsByClassName('acept-button');
     var avisos = document.getElementsByClassName('aviso2');
 
     for (var i = 0; i < botones.length; i++) {
       botones[i].addEventListener('click', function() {
         var aviso = this.nextElementSibling;
         aviso.innerText = 'Felicidades, se aceptó correctamente';
         aviso.style.display = 'block';
       });
     }

    function verPerfilE() {
      window.location.href = 'perfilE-Alumno';
    }

    function verPerfilA() {
      window.location.href = 'perfilA-Empresa';
    }