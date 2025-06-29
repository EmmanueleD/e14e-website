// i18n utility functions
import { translations } from './translations';
import { services as servicesData } from './services';
import { defaultLang, showDefaultLang, languages, routes } from './ui';

// Supported languages
export const supportedLanguages = Object.keys(languages);

// Re-export languages for convenience
export { languages };

/**
 * Get the language from URL
 * @param {URL} url - The URL object
 * @returns {string} The language code
 */
export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  if (supportedLanguages.includes(lang)) {
    return lang;
  }
  return defaultLang;
}

/**
 * Create a function that returns translated strings
 * @param {string} lang - The language code
 * @returns {Function} A translation function
 */
export function useTranslations(lang) {
  return function t(key) {
    // Support nested keys like 'nav.home'
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    // Fallback to default language if translation is missing
    if (value === undefined) {
      value = translations[defaultLang];
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) return key; // Return key if not found in default language
      }
    }
    
    return value;
  };
}

/**
 * Create URL for a different language (legacy function)
 * @param {string} path - The current path
 * @param {string} targetLang - The target language
 * @returns {string} The translated path
 */
export function translatePath(path, targetLang) {
  // Handle root path special case
  if (path === '/') {
    return targetLang === defaultLang ? '/' : `/${targetLang}`;
  }
  
  const pathParts = path.split('/');
  const [, lang, ...rest] = pathParts;
  
  // Check if current path has a language prefix
  if (supportedLanguages.includes(lang)) {
    if (targetLang === defaultLang) {
      // If target is default language, remove the language prefix
      return rest.length > 0 ? `/${rest.join('/')}` : '/';
    } else {
      // Replace the language prefix
      return `/${targetLang}/${rest.join('/')}`;
    }
  } else {
    // Current path doesn't have a language prefix (already in default language)
    if (targetLang !== defaultLang) {
      // Add language prefix for non-default language
      return `/${targetLang}${path === '/' ? '' : path}`;
    }
    // Already in default language, keep as is
    return path;
  }
}

/**
 * Create a function to translate paths based on the current language
 * @param {string} lang - The current language
 * @returns {Function} A function that translates paths
 */
export function useTranslatedPath(lang) {
  return function translatePath(path, targetLang = lang) {
    // Handle root path special case
    if (path === '/' || path === '') {
      return targetLang === defaultLang && !showDefaultLang ? '/' : `/${targetLang}`;
    }
    
    // Handle home path with trailing slash
    if (path === '/es/' || path === '/en/') {
      const pathLang = path.substring(1, 3);
      return targetLang === defaultLang && !showDefaultLang ? '/' : `/${targetLang}`;
    }
    
    // Remove leading slash for processing
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Check if this is a service page path
    const serviceMatch = cleanPath.match(/^(?:([a-z]{2})\/)?servizi\/([\w-]+)$/i);
    if (serviceMatch) {
      // Handle service page path translation
      const serviceId = serviceMatch[2];
      if (targetLang === defaultLang && !showDefaultLang) {
        return `/servizi/${serviceId}`;
      } else {
        return `/${targetLang}/servizi/${serviceId}`;
      }
    }
    
    // For other paths
    const parts = cleanPath.split('/');
    
    // Check if the first part is a language code
    let pathWithoutLang = cleanPath;
    if (supportedLanguages.includes(parts[0])) {
      pathWithoutLang = parts.slice(1).join('/');
    }
    
    // Check if we have a translation for the first segment
    const firstSegment = pathWithoutLang.split('/')[0];
    const hasTranslation = 
      routes[targetLang] !== undefined && 
      routes[targetLang][firstSegment] !== undefined;
    
    // If we have a translation, replace the first segment
    let translatedPath = pathWithoutLang;
    if (hasTranslation) {
      const segments = pathWithoutLang.split('/');
      segments[0] = routes[targetLang][firstSegment];
      translatedPath = segments.join('/');
    }
    
    // Add language prefix if needed
    return targetLang === defaultLang && !showDefaultLang
      ? `/${translatedPath}` 
      : `/${targetLang}/${translatedPath}`;
  };
}

/**
 * Get the route name from a URL
 * @param {URL} url - The URL object
 * @returns {string|undefined} The route name or undefined
 */
export function getRouteFromUrl(url) {
  const pathname = new URL(url).pathname;
  const parts = pathname.split('/');
  // Get the last non-empty part
  const path = parts.filter(part => part !== '').pop() || '';
  
  if (path === '') {
    return ''; // Home route
  }
  
  const currentLang = getLangFromUrl(url);
  
  if (defaultLang === currentLang) {
    // If we're in the default language, look for this path in any language's routes
    for (const lang in routes) {
      for (const [key, value] of Object.entries(routes[lang])) {
        if (value === path) {
          return key;
        }
      }
    }
    // If not found in routes, return the path itself
    return path;
  }
  
  // For non-default languages, check if this path is a translated route
  if (routes[currentLang]) {
    // Find the original route key for this translated path
    for (const [key, value] of Object.entries(routes[currentLang])) {
      if (value === path) {
        return key;
      }
    }
  }
  
  // If not found in routes, return the path itself
  return path;
}

/**
 * Get translations for the current language
 * @param {string} lang - The language code
 * @returns {Object} The translations object
 */
export function getTranslations(lang) {
  return translations[lang] || translations[defaultLang];
}

/**
 * Get services for the current language
 * @param {string} lang - The language code
 * @returns {Array} The services array
 */
export function getServices(lang) {
  return servicesData[lang] || servicesData[defaultLang];
}

/**
 * Get a specific service by ID for the current language
 * @param {string} id - The service ID
 * @param {string} lang - The language code
 * @returns {Object|undefined} The service object or undefined
 */
export function getServiceById(id, lang) {
  const services = getServices(lang);
  return services.find(service => service.id === id);
}
