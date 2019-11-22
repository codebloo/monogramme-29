/*
/* Product customizer
/* Syncs front-end with Bold Product Options
*/

/* App container */
const bold_el = document.querySelector('.bold_options');
/* Class added once the app loads */
const load_class = 'bold_options_loaded';
const swatch_id = 'swatch-id';

/* Load custom options */
const loadCustom = (newNodes) => {
  const pickbox = newNodes[0].querySelector('select');
  const swatch_collections = newNodes[0].querySelectorAll('.bold_option_swatch');

  console.log('Fancifying custom option ...');

  /* Fix "Choose Choose" in dropdowns */
  pickbox[0].text = pickbox[0].text.replace("Choose Choose", "Choose");

  /* Scan for swatches */
  swatch_collections.forEach( swatch_collection => {
    const title = swatch_collection.querySelector('.bold_option_title').innerText.toLowerCase().replace(/\s/g, '-');
    const swatches = swatch_collection.querySelector('.bold_option_element');
    const button_html = `
      <button class="button button--outline js-modal"
       data-modal-prefix-class="simple-animated"
       data-modal-content-id="${title}"
       data-modal-close-text=""
       data-modal-close-title="Close window">
        Click to select style
      </button>`;

    /* Give swatches an ID and hide them in a modal */
    swatches.id = title;
    swatches.classList.add('hidden');
    // Add modal toggle button
    swatches.insertAdjacentHTML('beforebegin', button_html);
  });
};

// Watch the DOM for changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') loadCustom(mutation.addedNodes);
  });
});

// Watch for changes to the container
observer.observe(bold_el, {
  childList: true
});
