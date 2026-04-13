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
      if (translatedText.includes("<")) {
        element.innerHTML = translatedText;
      } else {
        element.textContent = translatedText;
      }
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

  const altElements = document.querySelectorAll("[data-i18n-alt]");
  for (const element of altElements) {
    const key = element.dataset.i18nAlt;
    const translated = translations[locale]?.[key];
    if (translated) {
      element.setAttribute("alt", translated);
    }
  }
}

function getResolvedLocale(locale) {
  return locale === "en" ? "en-US" : "es-ES";
}

function updateDynamicContent(locale) {
  const reloj = document.getElementById("reloj");
  if (reloj) {
    reloj.textContent = new Intl.DateTimeFormat(getResolvedLocale(locale), {
      timeStyle: "medium",
    }).format(new Date());
  }

  const dateBox = document.getElementById("intl-demo-date");
  if (dateBox) {
    const rawDate = dateBox.dataset.date;
    dateBox.textContent = formatDate(new Date(rawDate), locale);
  }

  const shortDateBox = document.getElementById("intl-demo-short-date");
  if (shortDateBox) {
    const rawShortDate = shortDateBox.dataset.date;
    shortDateBox.textContent = formatShortDate(new Date(rawShortDate), locale);
  }

  const intlNumberBox = document.getElementById("intl-demo-number");
  if (intlNumberBox) {
    const rawNumber = intlNumberBox.dataset.number;
    intlNumberBox.textContent = formatNumber(Number(rawNumber), locale);
  }

  const currencyBox = document.getElementById("intl-demo-currency");
  if (currencyBox) {
    const rawCurrency = currencyBox.dataset.currency;
    currencyBox.textContent = formatCurrency(Number(rawCurrency), locale);
  }

  const percentBox = document.getElementById("intl-demo-percent");
  if (percentBox) {
    const rawPercent = percentBox.dataset.percent;
    percentBox.textContent = formatPercent(Number(rawPercent), locale);
  }

  const numberBox = document.getElementById("numeroElegido");
  const numberSelect = document.getElementById("numeroFavorito");
  if (numberBox && numberSelect) {
    const label =
      translations[locale]?.["contact.selectedNumber"] ||
      "Número seleccionado:";
    numberBox.textContent =
      label + " " + formatNumber(Number(numberSelect.value), locale);
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
function formatShortDate(dateValue, locale) {
  return new Intl.DateTimeFormat(getResolvedLocale(locale), {
    dateStyle: "short",
    timeStyle: "short",
  }).format(dateValue);
}

/* ReqI18N7 */
function formatCurrency(amountValue, locale) {
  const currencyCode = locale === "en" ? "USD" : "EUR";
  return new Intl.NumberFormat(getResolvedLocale(locale), {
    style: "currency",
    currency: currencyCode,
  }).format(amountValue);
}

/* ReqI18N7 */
function formatPercent(percentValue, locale) {
  return new Intl.NumberFormat(getResolvedLocale(locale), {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(percentValue);
}

/* ReqI18N7 */
function formatDate(dateValue, locale) {
  return new Intl.DateTimeFormat(getResolvedLocale(locale), {
    dateStyle: "long",
    timeStyle: "short",
  }).format(dateValue);
}

/* ReqI18N7 */
function formatNumber(numberValue, locale) {
  return new Intl.NumberFormat(getResolvedLocale(locale), {
    style: "decimal",
  }).format(numberValue);
}

/* ReqI18N8 */
function buildTimelineSummary(locale) {
  const summary = document.getElementById("timeline-summary");
  const dateBox = document.getElementById("intl-demo-date");
  const shortDateBox = document.getElementById("intl-demo-short-date");
  const numberBox = document.getElementById("intl-demo-number");
  const currencyBox = document.getElementById("intl-demo-currency");
  const percentBox = document.getElementById("intl-demo-percent");

  if (
    !summary ||
    !dateBox ||
    !shortDateBox ||
    !numberBox ||
    !currencyBox ||
    !percentBox
  ) {
    return;
  }

  const formattedDate = formatDate(new Date(dateBox.dataset.date), locale);
  const formattedShortDate = formatShortDate(
    new Date(shortDateBox.dataset.date),
    locale,
  );
  const formattedNumber = formatNumber(
    Number(numberBox.dataset.number),
    locale,
  );
  const formattedCurrency = formatCurrency(
    Number(currencyBox.dataset.currency),
    locale,
  );
  const formattedPercent = formatPercent(
    Number(percentBox.dataset.percent),
    locale,
  );

  const template =
    translations[locale]?.["timeline.dynamicSummary"] ||
    "El Apple I se presentó el {date}. El Intel 4004 fue lanzado el {shortDate}. El valor histórico mostrado para el número de transistores es {number}, el precio histórico aproximado es {currency} y el crecimiento simbólico mostrado es {percent}.";

  const text = template
    .replace("{date}", formattedDate)
    .replace("{shortDate}", formattedShortDate)
    .replace("{number}", formattedNumber)
    .replace("{currency}", formattedCurrency)
    .replace("{percent}", formattedPercent);

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
