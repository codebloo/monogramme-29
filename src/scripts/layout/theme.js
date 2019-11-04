import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';
import {cookiesEnabled} from '@shopify/theme-cart';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}

const app = new Vue({
  delimiters: ['${', '}'],
  el: '#igapp',
  data: {
      token: '7015798478.1677ed0.77f56ba02135495fb36fbffeddb65b44',
      images: []
  },
  mounted() {
      fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token='+this.token+'&count=6')
          .then((response) => {
          return response.json();
      }).then((myJson) => {
          this.images = myJson.data;
      });
  }
});
