/* ReqJ1 */
function getForm() {
  return document.getElementById("formularioContacto");
}

/* ReqJ2 */
function writeNumber() {
  const sel = document.getElementById("numeroFavorito");
  const p = document.getElementById("numeroElegido");

  if (!sel || !p) {
    return;
  }

  const savedLocale = localStorage.getItem("preferredLanguage") || "es";
  const resolvedLocale = savedLocale === "en" ? "en-US" : "es-ES";
  const formattedNumber = new Intl.NumberFormat(resolvedLocale, {
    style: "decimal",
  }).format(Number(sel.value));

  p.textContent =
    savedLocale === "en"
      ? "Selected number: " + formattedNumber
      : "Número seleccionado: " + formattedNumber;
}

/* ReqJ2 */
function writeColor() {
  const sel = document.getElementById("colorFavorito");
  const p = document.getElementById("colorHexa");

  if (!sel || !p) {
    return;
  }

  const c = sel.value;
  let rgb = "";

  switch (c) {
    case "red":
      rgb = "FF0000";
      break;
    case "green":
      rgb = "00FF00";
      break;
    case "blue":
      rgb = "0000FF";
      break;
    case "white":
      rgb = "FFFFFF";
      break;
    case "grey":
      rgb = "7F7F7F";
      break;
    case "black":
      rgb = "000000";
      break;
    default:
      rgb = "000000";
      break;
  }

  const savedLocale = localStorage.getItem("preferredLanguage") || "es";
  const label = savedLocale === "en" ? "Hex color:" : "Color hexadecimal:";

  p.textContent = label + " #" + rgb;
}

function SelectStudent() {
  const radio = document.getElementById("estudiante");
  if (radio) {
    radio.checked = true;
  }
  updatePreview();
}

function SelectTeacher() {
  const radio = document.getElementById("profesor");
  if (radio) {
    radio.checked = true;
  }
  updatePreview();
}

function idCorrecto(id) {
  const l = id.length;

  if (l !== 9) {
    return false;
  }

  for (let i = 0; i < 8; i++) {
    if (id[i] < "0" || id[i] > "9") {
      return false;
    }
  }

  if (id[8] < "A" || id[8] > "Z") {
    return false;
  }

  return true;
}

/* ReqJ3 */
function CheckID() {
  const input = document.getElementById("identificador");
  const linea = document.getElementById("lineaID");

  if (!input || !linea) {
    return false;
  }

  input.value = input.value.toUpperCase();

  if (input.value === "") {
    input.classList.remove("valid");
    input.classList.remove("invalid");
    linea.style.color = "black";
    return false;
  }

  if (idCorrecto(input.value)) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    linea.style.color = "black";
    return true;
  }

  input.classList.add("invalid");
  input.classList.remove("valid");
  linea.style.color = "red";
  return false;
}

function legalAge(birthdate, today) {
  today.setFullYear(today.getFullYear() - 18);
  return today >= birthdate;
}

function CheckLegalAge() {
  const fecha = document.getElementById("fechaNacimiento");
  const linea = document.getElementById("lineaID");

  if (!fecha || !linea) {
    return;
  }

  const hoy = new Date();
  const valorFecha = fecha.valueAsDate;

  if (valorFecha && legalAge(valorFecha, hoy)) {
    linea.style.display = "block";
  } else {
    linea.style.display = "none";
  }
}

function contarCaracteres() {
  const texto = document.getElementById("mensaje");
  const contador = document.getElementById("contador");

  if (!texto || !contador) {
    return;
  }

  const savedLocale = localStorage.getItem("preferredLanguage") || "es";
  const label = savedLocale === "en" ? "Characters:" : "Caracteres:";

  contador.textContent = label + " " + texto.value.length;
}

/* ReqJ3 */
function checkValidityState(field) {
  if (!field) {
    return;
  }

  if (field.value === "") {
    field.classList.remove("valid");
    field.classList.remove("invalid");
    return;
  }

  if (field.checkValidity()) {
    field.classList.add("valid");
    field.classList.remove("invalid");
  } else {
    field.classList.add("invalid");
    field.classList.remove("valid");
  }
}

function getCheckedValues(locale) {
  const valores = [];
  const hardware = document.getElementById("hardware");
  const software = document.getElementById("software");
  const historia = document.getElementById("historia");

  if (hardware && hardware.checked) {
    valores.push(translations[locale]?.["contact.hardware"] || "Hardware");
  }

  if (software && software.checked) {
    valores.push(translations[locale]?.["contact.software"] || "Software");
  }

  if (historia && historia.checked) {
    valores.push(translations[locale]?.["contact.history"] || "Historia");
  }

  if (valores.length === 0) {
    return translations[locale]?.["contact.none"] || "Ninguno";
  }

  return valores.join(", ");
}

function getPerfilSeleccionado(locale) {
  console.log(locale)
  const estudiante = document.getElementById("estudiante");
  const profesor = document.getElementById("profesor");

  if (estudiante && estudiante.checked) {
    return translations[locale]?.["contact.student"];
  }

  if (profesor && profesor.checked) {
    return translations[locale]?.["contact.teacher"];
  }

  return translations[locale]?.["contact.profileNotSelected"] || "No seleccionado";
}

function getSelectedOptionText(selectId) {
  const select = document.getElementById(selectId);

  if (!select || select.selectedIndex < 0) {
    return "";
  }

  return select.options[select.selectedIndex].textContent;
}

/* ReqJ2 */
function updatePreview() {
  const preview = document.getElementById("preview-content");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const tema = document.getElementById("temaFavorito");
  const mensaje = document.getElementById("mensaje");
  const comoConocio = document.getElementById("comoConocio");
  const numero = document.getElementById("numeroFavorito");
  const color = document.getElementById("colorFavorito");

  if (!preview) {
    return;
  }

  const savedLocale = localStorage.getItem("preferredLanguage") || "es";

  if (savedLocale === "en") {
    preview.innerHTML =
      "<p><strong>Full name:</strong> " +
      (nombre ? nombre.value : "") +
      "</p>" +
      "<p><strong>Email:</strong> " +
      (correo ? correo.value : "") +
      "</p>" +
      "<p><strong>Phone:</strong> " +
      (telefono ? telefono.value : "") +
      "</p>" +
      "<p><strong>Profile:</strong> " +
      getPerfilSeleccionado(savedLocale) +
      "</p>" +
      "<p><strong>How did you find the site?:</strong> " +
      getSelectedOptionText("comoConocio") +
      "</p>" +
      "<p><strong>Selected number:</strong> " +
      (numero ? numero.value : "") +
      "</p>" +
      "<p><strong>Selected color:</strong> " +
      (color ? color.value : "") +
      "</p>" +
      "<p><strong>Interests:</strong> " +
      getCheckedValues(savedLocale) +
      "</p>" +
      "<p><strong>Favorite topic:</strong> " +
      (tema ? tema.value : "") +
      "</p>" +
      "<p><strong>Message:</strong> " +
      (mensaje ? mensaje.value : "") +
      "</p>";
  } else {
    preview.innerHTML =
      "<p><strong>Nombre:</strong> " +
      (nombre ? nombre.value : "") +
      "</p>" +
      "<p><strong>Correo:</strong> " +
      (correo ? correo.value : "") +
      "</p>" +
      "<p><strong>Teléfono:</strong> " +
      (telefono ? telefono.value : "") +
      "</p>" +
      "<p><strong>Perfil:</strong> " +
      getPerfilSeleccionado(savedLocale) +
      "</p>" +
      "<p><strong>Cómo conoció el sitio:</strong> " +
      getSelectedOptionText("comoConocio") +
      "</p>" +
      "<p><strong>Número seleccionado:</strong> " +
      (numero ? numero.value : "") +
      "</p>" +
      "<p><strong>Color seleccionado:</strong> " +
      (color ? color.value : "") +
      "</p>" +
      "<p><strong>Intereses:</strong> " +
      getCheckedValues(savedLocale) +
      "</p>" +
      "<p><strong>Tema favorito:</strong> " +
      (tema ? tema.value : "") +
      "</p>" +
      "<p><strong>Mensaje:</strong> " +
      (mensaje ? mensaje.value : "") +
      "</p>";
  }
}

/* ReqJ5 */
function clearErrorBox() {
  const errorBox = document.getElementById("error-box");

  if (!errorBox) {
    return;
  }

  errorBox.textContent = "";
  errorBox.classList.remove("visible");
}

/* ReqJ5 */
function showError(message) {
  const errorBox = document.getElementById("error-box");

  if (!errorBox) {
    return;
  }

  errorBox.textContent = message;
  errorBox.classList.add("visible");
}

/* ReqJ5 ReqJ6 */
function checkCustomRules() {
  const comoConocio = document.getElementById("comoConocio");
  const mensaje = document.getElementById("mensaje");

  if (!comoConocio || !mensaje) {
    return null;
  }

  if (
    comoConocio.value === "amigo" &&
    mensaje.value.toLowerCase().indexOf("amigo") === -1
  ) {
    mensaje.focus();
    return 'Si seleccionas "Por un amigo o conocido", debes mencionar la palabra "amigo" en el mensaje.';
  }

  return null;
}

/* ReqJ4 ReqJ5 ReqJ6 */
function validateForm() {
  const form = getForm();
  const identificador = document.getElementById("identificador");
  const linea = document.getElementById("lineaID");
  const submitBtn = document.getElementById("submit-btn");

  if (!form) {
    return false;
  }

  clearErrorBox();

  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  if (
    linea &&
    linea.style.display !== "none" &&
    identificador &&
    identificador.value !== ""
  ) {
    if (!CheckID()) {
      showError("El ID introducido no tiene un formato correcto.");
      identificador.focus();
      return false;
    }
  }

  const customError = checkCustomRules();
  if (customError) {
    showError(customError);
    return false;
  }

  if (submitBtn) {
    submitBtn.classList.remove("highlight");
  }

  return true;
}

/* ReqJ7 */
function handleKeydown(event) {
  const submitBtn = document.getElementById("submit-btn");

  if (!submitBtn) {
    return;
  }

  if (event.key === "Enter") {
    submitBtn.classList.add("highlight");
  } else {
    submitBtn.classList.remove("highlight");
  }
}

/* ReqJ8 */
function handleMouseOver(element) {
  if (element) {
    element.classList.add("highlight");
  }
}

/* ReqJ8 */
function handleMouseOut(element) {
  if (element) {
    element.classList.remove("highlight");
  }
}

function ResetVisualState() {
  const preview = document.getElementById("preview-content");
  const contador = document.getElementById("contador");
  const numero = document.getElementById("numeroElegido");
  const color = document.getElementById("colorHexa");
  const submitBtn = document.getElementById("submit-btn");
  const campos = document.querySelectorAll("input, textarea, select");

  clearErrorBox();

  for (const campo of campos) {
    campo.classList.remove("valid");
    campo.classList.remove("invalid");
    campo.classList.remove("highlight");
  }

  const savedLocale = localStorage.getItem("preferredLanguage") || "es";

  if (preview) {
    preview.innerHTML =
      savedLocale === "en"
        ? "<p>The form preview will appear here.</p>"
        : "<p>La vista previa del formulario se mostrará aquí.</p>";
  }

  if (contador) {
    contador.textContent =
      savedLocale === "en" ? "Characters: 0" : "Caracteres: 0";
  }

  if (numero) {
    numero.textContent =
      savedLocale === "en"
        ? "Selected number: 100"
        : "Número seleccionado: 100";
  }

  if (color) {
    color.textContent =
      savedLocale === "en"
        ? "Hex color: #FF0000"
        : "Color hexadecimal: #FF0000";
  }

  if (submitBtn) {
    submitBtn.classList.remove("highlight");
  }

  setTimeout(function () {
    CheckLegalAge();
  }, 0);
}

/* ReqJ1 */
function InitPage() {
  const form = getForm();

  if (!form) {
    return;
  }

  writeNumber();
  writeColor();
  CheckLegalAge();
  contarCaracteres();
  updatePreview();
  clearErrorBox();
}