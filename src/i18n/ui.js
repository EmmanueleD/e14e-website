// Configurazione i18n UI
export const defaultLang = 'en';
export const showDefaultLang = false;

// Lingue supportate e loro etichette
export const languages = {
  en: 'English',
  es: 'Español'
};

// Mappatura delle route tradotte
export const routes = {
  es: {
    'services': 'servizi',
    'servizi': 'servizi',  // Aggiungiamo anche la versione italiana per la traduzione inversa
    'about': 'sobre',
    'contact': 'contact',
    'client-projects': 'client-projects',
    'portfolio': 'portfolio'  // Manteniamo anche il vecchio nome per retrocompatibilità
  }
};
