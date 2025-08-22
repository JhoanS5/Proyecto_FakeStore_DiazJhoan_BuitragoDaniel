// Este código se ejecuta una vez que el contenido de la página se ha cargado completamente.
document.addEventListener('DOMContentLoaded', () => {
  const btnFiltros = document.querySelector('.btn-filtros');
  const sidebar = document.querySelector('.sidebar');

  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }

  // Muestra la barra lateral y el 'overlay'. También deshabilita el scroll de la página principal.
  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Oculta la barra lateral y el 'overlay'. Habilita nuevamente el scroll de la página principal.
  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }



  // Verifica que los elementos existan antes de asignar eventos para evitar errores.
  if (btnFiltros && sidebar) {
    btnFiltros.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    });
  }
});