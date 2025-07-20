document.addEventListener("DOMContentLoaded", () => {
  const mainScreen = document.querySelector(".main-screen");
  const initialHeartButton = document.querySelector(".initial-heart-button");
  const contentWrapper = document.querySelector(".content-wrapper");
  const backgroundOverlay = document.querySelector(".background-overlay");
  const countdownDisplay = document.getElementById("countdown");
  const forgivenessPoemElement = document.getElementById("forgivenessPoem");

  // --- Configuración ---
  const startDate = new Date("2024-10-05T00:00:00"); // Fecha de inicio

  const forgivenessPoemText = `Perdón por las veces que me expresé mal,
por las palabras que no debí decir,
por los silencios que dolieron más que solo la mirada,
y por los momentos en los que no supe que decir.

Perdón por exgerar tus gestos,
por no pensar bien antes que molestarme,
por a veces irme sin decir nada
y por las veces que dudaste de lo que sentías.

Hoy solo quiero que sepas
que cada error lleva en sí un aprendizaje,
y cada lágrima una promesa:
la de seguir creciendo para merecerte.`;

  function typePoem(text, element, speed = 40) {
    let index = 0;
    element.textContent = "";

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }

    type();
  }
  // --- Fin Configuración ---

  // Actualiza contador de tiempo
  function updateCountdown() {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownDisplay.textContent = `Desde ${startDate.toLocaleDateString(
      "es-ES",
      { year: "numeric", month: "long", day: "numeric" }
    )}: ${months} meses, ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Lógica al hacer clic en el corazón
  initialHeartButton.addEventListener("click", () => {
    mainScreen.classList.add("fade-out");
    backgroundOverlay.classList.add("active");

    mainScreen.addEventListener(
      "transitionend",
      () => {
        mainScreen.style.display = "none";
        contentWrapper.classList.remove("hidden");
        contentWrapper.classList.add("visible");

        // Espera un momento y luego empieza a escribir el poema
        setTimeout(() => {
          typePoem(forgivenessPoemText, forgivenessPoemElement, 40);
        }, 1000);
      },
      { once: true }
    );
  });
});
