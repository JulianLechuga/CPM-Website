import translations from "./translations.js"; 

function getSavedLocale() {
  const savedLocale = localStorage.getItem("preferredLanguage");
  return translations[savedLocale] ? savedLocale : "es";
}

/* ReqI18N4 */
function applyTranslations(locale) {
  const elements = document.querySelectorAll("[data-i18n]");
  for (const element of elements) {
    const key = element.dataset.i18n;
    const translatedText = translations[locale]?.[key];
    if (translatedText) {
      element.textContent = translatedText;
    }
  }

/* ReqI18N5 */
  const placeholderElements = document.querySelectorAll(
    "[data-i18n-placeholder]",
  );
  for (const element of placeholderElements) {
    const key = element.dataset.i18nPlaceholder;
    const translatedPlaceholder = translations[locale]?.[key];
    if (translatedPlaceholder) {
      element.setAttribute("placeholder", translatedPlaceholder);
    }
  }

  document.documentElement.lang = locale;
}

function getResolvedLocale(locale) {
  return locale === "en" ? "en-US" : "es-ES";
}

function formatDate(dateValue, locale) {
  return new Intl.DateTimeFormat(getResolvedLocale(locale), {
    dateStyle: "long",
    timeStyle: "short",
  }).format(dateValue);
}

function formatNumber(numberValue, locale) {
  return new Intl.NumberFormat(getResolvedLocale(locale), {
    style: "decimal",
  }).format(numberValue);
}

function updateDynamicContent(locale) {
  const reloj = document.getElementById('reloj');
  if (reloj) {
    reloj.textContent = new Intl.DateTimeFormat(getResolvedLocale(locale), {
      timeStyle: 'medium'
    }).format(new Date());
  }

  const dateBox = document.getElementById('intl-demo-date');
  if (dateBox) {
    const rawDate = dateBox.dataset.date;
    dateBox.textContent = formatDate(new Date(rawDate), locale);
  }

  const intlNumberBox = document.getElementById('intl-demo-number');
  if (intlNumberBox) {
    const rawNumber = intlNumberBox.dataset.number;
    intlNumberBox.textContent = formatNumber(Number(rawNumber), locale);
  }

  const numberBox = document.getElementById('numeroElegido');
  const numberSelect = document.getElementById('numeroFavorito');
  if (numberBox && numberSelect) {
    const label = translations[locale]?.['contact.selectedNumber'] || 'Número seleccionado:';
    numberBox.textContent = label + ' ' + formatNumber(Number(numberSelect.value), locale);
  }

  buildTimelineSummary(locale);
}

function initializeLanguageSwitcher(locale) {
  const languageSwitcher = document.querySelector("#language-switcher");
  if (languageSwitcher) {
    languageSwitcher.value = locale;
  }
}

/* ReqI18N6 */
function setLocale(locale) {
  const selectedLocale = translations[locale] ? locale : "es";
  localStorage.setItem("preferredLanguage", selectedLocale);
  applyTranslations(selectedLocale);
  updateDynamicContent(selectedLocale);
  initializeLanguageSwitcher(selectedLocale);

  if (typeof updatePreview === "function") {
    updatePreview();
  }
}

/* ReqI18N7 */
function formatDate(dateValue, locale) {
  return new Intl.DateTimeFormat(getResolvedLocale(locale), {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(dateValue);
} 

/* ReqI18N7 */
function formatNumber(numberValue, locale) {
  return new Intl.NumberFormat(getResolvedLocale(locale), {
    style: 'decimal'
  }).format(numberValue);
}

/* ReqI18N8 */
function buildTimelineSummary(locale) {
  const summary = document.getElementById('timeline-summary');
  const dateBox = document.getElementById('intl-demo-date');
  const numberBox = document.getElementById('intl-demo-number');

  if (!summary || !dateBox || !numberBox) {
    return;
  }

  const rawDate = dateBox.dataset.date;
  const rawNumber = numberBox.dataset.number;

  const formattedDate = formatDate(new Date(rawDate), locale);
  const formattedNumber = formatNumber(Number(rawNumber), locale);

  const template =
    translations[locale]?.['timeline.dynamicSummary'] ||
    'El Apple I se presentó el {date}. Además, el valor histórico de referencia mostrado en esta página es {number}.';

  const text = template
    .replace('{title}', 'Apple I')
    .replace('{date}', formattedDate)
    .replace('{number}', formattedNumber);

  summary.textContent = text;
}

/* ReqI18N1 */
function initializeI18n() {
  const translatableElements = document.querySelectorAll("[data-i18n]");
  const languageSwitcher = document.querySelector("#language-switcher");

  if (translatableElements.length === 0 && !languageSwitcher) {
    console.log("Esta página todavía no está preparada para i18n.");
    return;
  }

  const initialLocale = getSavedLocale();
  applyTranslations(initialLocale);
  updateDynamicContent(initialLocale);
  initializeLanguageSwitcher(initialLocale);
}
