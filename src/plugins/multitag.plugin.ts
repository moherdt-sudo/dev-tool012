/**
 * Plugin pour charger dynamiquement le script MultiTag Monetag
 * après la première action utilisateur de la session.
 */

const MULTITAG_SESSION_KEY = 'multitag_loaded';

export function loadMultiTag() {
  // Vérifier si le script a déjà été chargé dans cette session
  if (sessionStorage.getItem(MULTITAG_SESSION_KEY)) {
    return;
  }

  console.log('Chargement du script MultiTag...');

  const script = document.createElement('script');
  script.src = 'https://quge5.com/88/tag.min.js';
  script.dataset.zone = '199836';
  script.async = true;
  script.dataset.cfasync = 'false';

  // Marquer comme chargé dans la session avant même l'injection pour éviter les doubles appels
  sessionStorage.setItem(MULTITAG_SESSION_KEY, 'true');

  document.body.appendChild(script);
}

/**
 * Initialise un écouteur global sur les clics pour déclencher le chargement
 */
export function initMultiTagTrigger() {
  const handleFirstClick = () => {
    loadMultiTag();
    // Une fois chargé, on retire l'écouteur global
    window.removeEventListener('click', handleFirstClick);
    window.removeEventListener('touchstart', handleFirstClick);
  };

  // On écoute le premier clic ou toucher sur la page
  window.addEventListener('click', handleFirstClick, { once: true });
  window.addEventListener('touchstart', handleFirstClick, { once: true });
}

export const multitagPlugin = {
  install: () => {
    // On ne fait rien à l'installation, on attend l'action utilisateur
    initMultiTagTrigger();
  },
};
