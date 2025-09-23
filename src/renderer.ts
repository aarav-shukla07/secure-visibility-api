// This file provides the logic for the UI (index.html)

// Define the API exposed by the preload script
declare global {
  interface Window {
    api: {
      toggleProtection: (protect: boolean) => void;
    };
  }
}

const protectBtn = document.getElementById('protectBtn');
const unprotectBtn = document.getElementById('unprotectBtn');

protectBtn?.addEventListener('click', () => {
  window.api.toggleProtection(true);
  console.log('Protection enabled.');
});

unprotectBtn?.addEventListener('click', () => {
  window.api.toggleProtection(false);
  console.log('Protection disabled.');
});

// This line tells TypeScript to treat this file as a module, fixing the error.
export {};

