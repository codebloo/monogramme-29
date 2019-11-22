/*
/* Product customizer
/* Syncs front-end with Bold Product Options
*/

/* The Bold Product Options container */
const bold_el = document.querySelector('.bold_options');

/* Handler for customizing custom options (it's customizing all the way down) */
const loadCustom = (newNode) => {
  console.log('Fancifying custom option ...');

  console.log(newNode);

  const title = newNode[0].querySelector('.bold_option_title').innerText;
  const dropdown = newNode[0].querySelector('select');
  const swatch_collections = newNode[0].querySelectorAll('.bold_option_swatch');

  /* Fix "Choose Choose" in dropdowns */
  if (dropdown) dropdown[0].text = dropdown[0].text.replace("Choose Choose", "Choose");

  /* Turn swatches into modal windows */
  swatch_collections.forEach(swatch_container => {
    const swatches = swatch_container.querySelector('.bold_option_element');
    console.log(swatch_container, swatches);
    /* Create a unique ID from the option title and a random number */
    const swatch_collection_id = `${title.toLowerCase().replace(/\s/g, '-')}-${Math.floor(Math.random() * 100)}`;

    /* Markup for a toggle button */
    const toggle_button_html = `
      <button class="button button--outline js-modal"
       data-modal-prefix-class="simple-animated"
       data-modal-title="${title}"
       data-modal-content-id="${swatch_collection_id}"
       data-modal-close-text=""
       data-modal-close-title="Close window">
        Click to select style
      </button>`;

    /* Hide the swatches collection and give it an ID for the toggle button to target */
    swatches.id = swatch_collection_id;
    swatches.classList.add('hidden');
    // Add the toggle button
    swatches.insertAdjacentHTML('beforebegin', toggle_button_html);
  });

};

// Watch the DOM for changes and do stuff with the changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Pass new HTML nodes to our schmancy handler
    if (mutation.type === 'childList') loadCustom(mutation.addedNodes);
  });
});

// Tell the observer what to watch
observer.observe(bold_el, {
  childList: true
});
