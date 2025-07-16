import { ENCUESTAS } from './constants.js'; 

document.getElementById('encuesta-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const opinion = document.getElementById('opinion').value.trim();
  const email = document.getElementById('email').value.trim();
  const terminos = document.getElementById('terminos').checked;
  const puntuacion = document.getElementById('slider').value;

  if (!opinion || !email || !terminos) {
    alert("Por favor completa todos los campos requeridos.");
    return;
  }

  const datos = {
    opinion,
    email,
    puntuacion,
    fecha: new Date().toISOString()
  };

  try {
    const resp = await fetch(ENCUESTAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (resp.ok) {
      document.getElementById('modal').classList.add('show');
    } else {
      alert("Hubo un error al enviar la encuesta.");
    }
  } catch (err) {
    console.error(err);
    alert("Error de conexión.");
  }
});

document.getElementById('omitir-btn').addEventListener('click', () => {
  window.location.href = 'login.html'; 
});

const slider = document.getElementById('slider');
const valorSlider = document.getElementById('valor-slider');

slider.addEventListener('input', () => {
  valorSlider.textContent = slider.value;
});
