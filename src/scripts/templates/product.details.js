import {load} from '@shopify/theme-sections';
import '../sections/product';
console.log("rae rae");
import { tns } from "tiny-slider/src/tiny-slider";
var slider = tns({
    container: '.slider',
    items: 4,
    nav: false
  });

load('*');
