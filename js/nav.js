function getBasePath() {
  const path = window.location.pathname.toLowerCase();

  if (path.indexOf("/pages/") !== -1) {
    return "../";
  }

  return "";
}

function getCurrentPage() {
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf("/") + 1).toLowerCase();
}

function crearMenu() {
  const menu = document.getElementById("menuNav");

  if (!menu) {
    return;
  }

  const base = getBasePath();
  const actual = getCurrentPage();

  menu.innerHTML = "";

  const paginas = [
    {
      texto: "Inicio",
      enlace: base + "index.html",
      archivo: "index.html",
      key: "nav.home"
    },
    {
      texto: "Línea de tiempo",
      enlace: base + "pages/timeline.html",
      archivo: "timeline.html",
      key: "nav.timeline"
    },
    {
      texto: "Contacto",
      enlace: base + "pages/contact.html",
      archivo: "contact.html",
      key: "nav.contact"
    },
    {
      texto: "Curiosidades",
      enlace: base + "pages/curiosidades.html",
      archivo: "curiosidades.html",
      key: "nav.curiosities"
    },
    {
      texto: "Museo de la Informática",
      enlace: "https://museodeinformatica.org.ar/",
      externo: true,
      key: "nav.museum"
    },
    {
      texto: "Más información",
      enlace: "https://es.wikipedia.org/wiki/Historia_de_la_computaci%C3%B3n",
      externo: true,
      key: "nav.moreInfo"
    },
    {
      texto: "HTML",
      enlace: "https://developer.mozilla.org/es/docs/Web/HTML",
      externo: true,
      key: "nav.html"
    }
  ];

  for (const pagina of paginas) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = pagina.enlace;
    a.textContent = pagina.texto;
    a.setAttribute("data-i18n", pagina.key);

    if (pagina.externo) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else if (actual === pagina.archivo) {
      a.className = "activo";
    }

    li.appendChild(a);
    menu.appendChild(li);
  }

  const liDark = document.createElement("li");
  const btnDark = document.createElement("button");
  btnDark.type = "button";
  btnDark.textContent = "🌙 Modo oscuro";
  btnDark.setAttribute("data-i18n", "nav.darkMode");
  btnDark.onclick = cambiarTema;
  liDark.appendChild(btnDark);
  menu.appendChild(liDark);

  const liReloj = document.createElement("li");
  const reloj = document.createElement("span");
  reloj.id = "reloj";
  reloj.textContent = "00:00:00";
  liReloj.appendChild(reloj);
  menu.appendChild(liReloj);
}

function cambiarTema() {
  document.body.classList.toggle("oscuro");
}

function actualizarReloj() {
  const ahora = new Date();
  const reloj = document.getElementById("reloj");

  if (!reloj) {
    return;
  }

  const savedLocale = localStorage.getItem("preferredLanguage") || "es";
  const resolvedLocale = savedLocale === "en" ? "en-US" : "es-ES";

  reloj.textContent = new Intl.DateTimeFormat(resolvedLocale, {
    timeStyle: "medium"
  }).format(ahora);
}

function InitNav() {
  crearMenu();
  actualizarReloj();
  setInterval(actualizarReloj, 1000);
}