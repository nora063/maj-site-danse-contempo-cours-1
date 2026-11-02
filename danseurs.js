(function () {
  // Pas d'animation pour les personnes qui l'ont désactivée dans leur système
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Quatre poses dessinées en SVG (traits fins) + un tutu optionnel
  const poses = [
    { // arabesque
      corps: `<circle cx="50" cy="16" r="8" fill="currentColor" stroke="none"/>
              <path d="M50 27 L52 70 M51 36 L18 24 M51 36 L84 42 M52 70 L50 126 M50 126 L60 129 M52 70 L96 78"/>`,
      jupe: `<path d="M52 66 L40 82 L64 80 Z" fill="currentColor" fill-opacity="0.5" stroke="none"/>`
    },
    { // grand jeté
      corps: `<circle cx="50" cy="30" r="8" fill="currentColor" stroke="none"/>
              <path d="M50 41 L50 78 M50 48 L20 32 M50 48 L80 32 M50 78 L8 98 M50 78 L94 66"/>`,
      jupe: `<path d="M50 74 L38 86 L62 84 Z" fill="currentColor" fill-opacity="0.5" stroke="none"/>`
    },
    { // pirouette
      corps: `<circle cx="50" cy="26" r="8" fill="currentColor" stroke="none"/>
              <path d="M50 37 L50 80 M50 46 L32 10 M50 46 L68 10 M50 80 L50 130 M50 80 L74 98 L52 104"/>`,
      jupe: `<path d="M50 74 L34 90 L66 90 Z" fill="currentColor" fill-opacity="0.5" stroke="none"/>`
    },
    { // développé à la seconde
      corps: `<circle cx="50" cy="16" r="8" fill="currentColor" stroke="none"/>
              <path d="M50 27 L50 74 M50 36 L10 46 M50 36 L90 46 M50 74 L48 128 M48 128 L58 131 M50 74 L92 56"/>`,
      jupe: `<path d="M50 70 L36 86 L64 86 Z" fill="currentColor" fill-opacity="0.5" stroke="none"/>`
    }
  ];

  const couleurs = ["#b0583a", "#a8927a", "#2b211a", "#c98a6b"];
  const NOMBRE = 12; // nombre de danseurs à l'écran

  const conteneur = document.createElement("div");
  conteneur.className = "pluie-danseurs";
  conteneur.setAttribute("aria-hidden", "true");
  document.body.appendChild(conteneur);

  function aleatoire(min, max) {
    return min + Math.random() * (max - min);
  }

  // Donne au danseur une nouvelle apparence et une nouvelle trajectoire
  function configurer(el) {
    const pose = poses[Math.floor(Math.random() * poses.length)];
    const avecJupe = Math.random() < 0.5;

    el.style.left = aleatoire(0, 96) + "vw";
    el.style.width = aleatoire(40, 90) + "px";
    el.style.color = couleurs[Math.floor(Math.random() * couleurs.length)];
    el.style.setProperty("--derive", aleatoire(-80, 80) + "px");
    el.style.setProperty("--opacite", aleatoire(0.25, 0.55));
    el.style.setProperty("--decalage", -aleatoire(0, 4) + "s");

    el.innerHTML =
      `<svg viewBox="0 0 100 140">${pose.corps}${avecJupe ? pose.jupe : ""}</svg>`;
  }

  for (let i = 0; i < NOMBRE; i++) {
    const el = document.createElement("div");
    el.className = "danseur";

    const duree = aleatoire(12, 22);
    el.style.animationDuration = duree + "s";
    // Délai négatif : les danseurs sont déjà répartis dans la page au chargement
    el.style.animationDelay = -aleatoire(0, duree) + "s";

    configurer(el);

    // À chaque nouveau tour (le danseur est alors invisible), on le change
    el.addEventListener("animationiteration", function (e) {
      if (e.animationName === "chute") configurer(el);
    });

    conteneur.appendChild(el);
  }
})();