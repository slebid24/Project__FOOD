import tabs from "./modules/tabs";
import modal from "./modules/modal";
import forms from "./modules/forms";
import slider from "./modules/slider";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import {openModal} from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  
   const timerTimeout = setTimeout(() => openModal(".modal", timerTimeout), 500000);
   // вызов функции появления мод окна через некотор. время
   const deadline = new Date();
   deadline.setTime((new Date() - ((new Date().getHours() * 60 * 60 * 1000) + 
   (new Date().getSeconds() * 60 * 1000) + 
   (new Date().getMilliseconds()))) +
   (24 * 3600 * 1000) * 6);
   // Дедлайн таймера


   tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
   modal("[data-modal]", ".modal", timerTimeout);
   forms("form", timerTimeout);
   slider({
      container : ".offer__slider",
      slide: ".offer__slide",
      nextArrow: ".offer__slider-next",
      prevArrov: ".offer__slider-prev",
      currentCounterA: "#current",
      totalCounterA: "#total",
      wrapper: ".offer__slider-wrapper",
      field: ".offer__slider-inner"
   });
   timer(".timer", deadline);
   cards();
   calc();
});