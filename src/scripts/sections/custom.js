/*
/* Product customizer
/* Syncs front-end with Bold Product Options
*/

/* The Bold Product Options container */
const bold_el = document.querySelector('.bold_options');
const popup_class = 'popup_options';

// Convert swatches into a popup and button
const loadSwatchPopup = ({ swatchContainer, option }) => {

  /* Unique ID from the title and a random number */
  const title = option.querySelector('.bold_option_title').innerHTML;
  const swatchCollectionID = `${title.toLowerCase().replace(/\s/g, '-').replace(/\W/g, '')}-${Math.floor(Math.random() * 100)}`;

  /* Create popup content */
  let swatchList = '<ul class="swatch-popup">';

  /* Copy swatch values */
  [...swatchContainer.children].forEach((swatch, index) => {
    const bgImg = swatch.querySelector('.bold_option_value_swatch span').style.backgroundImage;
    const swatchImage = bgImg.replace('url(','').replace(')','').replace(/\"/gi, "");
    const { className, value } = swatch.querySelector('input');
    swatchList += `
    <li data-value="${value}" data-classname="${className}" data-id="${swatchCollectionID}" data-image="${swatchImage}">
      <div class="swatch" style="background-image: url('${swatchImage}')"></div>
      ${value}
    </li>`
  });
  swatchList += `</ul>`;

  // Insert the toggle button and popup content
  swatchContainer.insertAdjacentHTML('beforebegin', `
  <button class="button button--outline js-modal"
  id="btn-${swatchCollectionID}"
   data-modal-prefix-class="simple-animated"
   data-modal-title="${title}"
   data-modal-content-id="${swatchCollectionID}"
   data-modal-close-text=""
   data-modal-close-title="Close window">
    Click to select style
  </button>
  <div class="selectedSwatch"></div>
  <div class="hidden" id="${swatchCollectionID}">
    ${swatchList}
  </div>`);

  // Mark the swatch container
  swatchContainer.className += ` ${popup_class}`;
}

const fixDropdown = newNode => {
  const dropdown = newNode.querySelector('select');
  if (dropdown) dropdown[0].text = dropdown[0].text.replace("Choose Choose", "Choose");
};

// Watch the DOM for changes and do stuff with the changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(newNode => {
        // If it's a new set of swatches, make it a popup
        const convertSwatchToPopup = newNode.classList && newNode.classList.contains('bold_option_element') && !newNode.classList.contains(popup_class);
        if (convertSwatchToPopup) loadSwatchPopup({ swatchContainer: newNode, option: mutation.target });
      });
    }
  })
});

// Tell the observer what element to watch
observer.observe(bold_el, {
  childList: true,
  subtree: true
});

/* Select a swatch in the popup */
$(document).on('click','.simple-animated-modal__wrapper li', function(){
    const swatchValue = $(this).data('value');
    const className = $(this).data('classname');
    const itemId = $(this).data('id');
    const swatchImage = $(this).data('image');

    $(`button[data-modal-content-id="${itemId}"]`)
      .attr('data-image', swatchImage)
      .html(swatchValue)
      .addClass('selected')
      .next().css("background-image", `url('${swatchImage}')`);

    $(`.${className}[value="${swatchValue}"]`).trigger('click');

    $( "#js-modal-close" ).trigger( "click" );
});
