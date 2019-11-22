import {load} from '@shopify/theme-sections';
import '../sections/product';

console.log("rae rae");
import { tns } from "tiny-slider/src/tiny-slider";

// Bold Product Options customizer
import '../sections/custom';
import '../sections/jquery-accessible-modal-window-aria';
import '../../styles/components/modal.scss';

var slider = tns({
    container: '.slider',
    items: 4,
    nav: false
  });

load('*');
