/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
      // КАЛЬКУЛЯТОР
      const result = document.querySelector(".calculating__result span");
      // елемент, где показывается результат
   
      let sex;
      let height;
      let weight; 
      let age;
      let ratio;
   
      if (localStorage.getItem("sex")) {
         sex = localStorage.getItem("sex");
      } else {
         sex = "female";
         localStorage.setItem("sex", "female");
      }
   
      if (localStorage.getItem("ratio")) {
         ratio = localStorage.getItem("ratio");
      } else {
         ratio = 1.375;
         localStorage.setItem("ratio", 1.375);
      }
   
      //Установка значений по умолчанию, и передача их в локалсторейдж. Если в локстр уже что то есть
      // то значения вытягиваются оттуда
   
      function initLocalSettings(selector, activeClass) {
         const elements = document.querySelectorAll(selector);
   
         elements.forEach(elem => {
            elem.classList.remove(activeClass);
   
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
               elem.classList.add(activeClass);
            }
            if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
               elem.classList.add(activeClass);
            }
         });
      }
      // Функция с помощью перебора и условия устанавливает класс активности в соотвествии с совпадением 
      // с данных в локалсторедж
   
      initLocalSettings("#gender div", "calculating__choose-item_active");
      initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");
   
   
      function calcTotal() {
         if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
         }
         // если хоть одних данные не указаны - подсчет не происходит
         if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
         } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
         }
      }
   
      calcTotal();
   
      function getStaticInformation(selector, activeClass) {
         const elements = document.querySelectorAll(selector);
   
         elements.forEach(elem => {
            elem.addEventListener("click", (e) => {
               if (e.target.getAttribute("data-ratio")) {
                  ratio = +e.target.getAttribute("data-ratio");
                  localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
               } else {
                  sex = e.target.getAttribute("id");
                  localStorage.setItem("sex", e.target.getAttribute("id"));
               }
   
               elements.forEach(elem => {
                  elem.classList.remove(activeClass);
               });
   
               e.target.classList.add(activeClass);
   
               calcTotal();
            });
         });
      }
      // Функция создана для двух статичных функций калькулятора пол и активность
      // С помощью перебора навешиваем обработчик события на все элементы обеих пунктов калькулятора
      // С начала провертся активность. При нажатии на любой пункт - значение из дата-атрибута передаётся 
      // в переменную ratio. Так же сразу вносится значение в локалсторейдж
      // Потом то же самое происходит с полом. 
      // Так как пол у нас не в дата атрибутах а в id - ошибки не будет.
      // Потом устанавливается класс активности на нажатую кнопку
      // При любом нажатии запускается функция калькулятора
   
      getStaticInformation("#gender div", "calculating__choose-item_active");
      getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");
   
      function getDynamicInfo(selector) {
         const input = document.querySelector(selector);
   
         input.addEventListener("input", () => {
            if (input.value.match(/\D/g)) {
               input.style.border = "1px red solid";
            } else {
               input.style.border = "none";
            }
            // если вводимое в поля не числа - вкл подсветка поля 
   
            switch (input.getAttribute("id")) {
               case "height":
                  height = +input.value;
                  break;
               case "weight":
                  weight = +input.value;
                  break;
               case "age":
                  age = +input.value;
                  break;
            }
            // если инпут атрибут совпадает с кейсом - информация переносится в переменнную
            calcTotal();
         });
      }
   
      getDynamicInfo("#height");
      getDynamicInfo("#weight");
      getDynamicInfo("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
   // Класс для карт
   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         // все дополнительные классы будут помещены в массив
         this.parent = document.querySelector(parentSelector);
         this.transfer = 30;
         // курс валют
         this.changeToUAH();
         // метод можно добавлять сразу в конструктор
         // и теперь любой прайс будет сразу конвертироваться из грн в дол
      }

      changeToUAH() {
         this.price = this.price * this.transfer;
      }
      // метод превращающий доллар в грн

      render() {
         const element = document.createElement("div");
         // установка дефолтного значения рест оператора. Если в классес ничего не приходит (это массив, проверка через 
         // длинну, то устанавливается дефолтный класс. это класс, который по идеи всегда должны устанавливать)
         if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }
         // дефолтный класс + дополнительные классы (если они есть), перебираются и добавляются к element

         element.innerHTML = `
                 <img src=${this.src} alt=${this.alt}>
                 <h3 class="menu__item-subtitle">${this.title}</h3>
                 <div class="menu__item-descr">${this.descr}</div>
                 <div class="menu__item-divider"></div>
                 <div class="menu__item-price">
                     <div class="menu__item-cost">Цена:</div>
                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                 </div>
             `;
         this.parent.append(element);
      }
   }

   // Можно двома способами испольозовать класс.
   // Первый способо стандартный = помещение обьекта в переменную
   // const div = new MenuCard();
   // div.render()
   // Но если этот обьект нужно использовать только на месте, то можно без присвоения переменной

   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.gerResource)("http://localhost:3000/menu")
      .then(data => {
         data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
         }) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
         });
         // с помощью деструктуризации помещаем данные из сервера в клас, потом рендерим на странице
         // метод ФОРИЧ, сделает это столько раз, сколько у нас елементов в масиве на сервере ДБ.ДЖЕЙСОН
      });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, timerTimeout) {
   // Forms
   const forms = document.querySelectorAll(formSelector);
   // выносим все формы с сайта в переменную формс

   const message = {
      loading: "img/form/spinner.svg",
      success: "Спасибо, мы скоро с вами свяжемся",
      failure: "Что-то пошло не так..."
   };
   // обьект с типами сообщений результата запроса 

   forms.forEach(item => {
      bindPostData(item);
   });
   // все формы взяты через квериселектор алл, по этому для присваивания функции постДата
   // делаем перебор массива

  
   function bindPostData(form) {
      // эта  - за привязку постинга
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
          `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form);
         // Конструктор FormData() создаёт новые объект FormData, если проще - HTML-форму.
         // XMLHttpRequest 2 добавляет поддержку для нового интерфейса FormData. 
         // Объекты FormData позволяют вам легко конструировать наборы пар ключ-значение, 
         // представляющие поля формы и их значения


         //  Для того, что бы обьект ФОРМДАТА можно было использовать, для отправки
         // на сервер в JSON формате, необходимо сначало этот обьект сделать
         // обычным обьектом
         // const object = {};
         // formData.forEach(function (value, key) {
         //    object[key] = value;
         // });
         // ПЛОХОЙ СПОСОБ

         const json = JSON.stringify(Object.fromEntries(formData.entries()));
         // ХОРОШИЙ СПОСОБ


         (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.failure);
            }).finally(() => {
               form.reset();
            });
      });
   }


   // Ф-ция заключается в том, что мы возьмем модальное окно 
   // "Мы свяжемся с вами ..."  и спрячем его (добавим класс "hide")
   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');
      prevModalDialog.classList.add('hide');

      // Потом запускается родительский элемент (серый фон)
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", timerTimeout);

      // создаётся новый елемент на странице, и ему присваивается тот же
      // самый клас модал диалог
      // в тот же елемент помещается код модального окна
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
      document.querySelector('.modal').append(thanksModal);
      // потом в родительский элемент помещается редактированое мод. окно

      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
      }, 4000);
      // через 4 секудны убирается окно благодарности, 
      // возвращаем на место класс отображения окну ввода формы( что бы в следующий раз оно снова работало)
      // закрываем полностью модальное окно
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
   const modalWindow = document.querySelector(modalSelector);
   modalWindow.style.display = "none";
   document.body.style.overflow = "";
}

function openModal(modalSelector, timerTimeout) {
   const modalWindow = document.querySelector(modalSelector);
   modalWindow.style.display = "block";
   document.body.style.overflow = "hidden";

   console.log(timerTimeout);
   if (timerTimeout) {
      clearTimeout(timerTimeout);
   }
}

function modal(triggerSelector, modalSelector, timerTimeout) {
   // Modal
   const modalOn = document.querySelectorAll(triggerSelector);
   const modalWindow = document.querySelector(modalSelector);
   const modalStyle = getComputedStyle(modalWindow);

   modalOn.forEach(item => {
      item.addEventListener("click", () => {
         openModal(modalSelector, timerTimeout);
      });
   });

   modalWindow.addEventListener("click", (e) => {
      if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
         closeModal(modalSelector);
      }
   });
   // Фунцкция, на клик вне области модального окна

   document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && modalStyle.display == "block") {
         closeModal(modalSelector);
      }
   });
   // // Функция на закрывание модального окна кнопкой еск


   const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.clientHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
   );
   // правильная высота всего содержимого документа

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
         openModal(modalSelector, timerTimeout);
         removeEventListener("scroll", showModalByScroll);
      }
   }
   // функция, вызывающая мод окно в конце страницы. ремув нужен, что бы 
   // она сработала только 1 раз.

   window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");

// импорт ф-ции гетЗеро от таймера

function slider({container, slide, nextArrow, prevArrov, totalCounterA, currentCounterA, wrapper, field}) {
   // слайдер
   const slider = document.querySelector(container);
   // весь блок выносим, что бы установить посишин релатив
   const currentCounter = document.querySelector(currentCounterA);
   const totalCounter = document.querySelector(totalCounterA);
   const prevArr = document.querySelector(prevArrov);
   const nextArr = document.querySelector(nextArrow);
   const offerSlide = document.querySelectorAll(slide);
   const slidesWrapper = document.querySelector(wrapper);
   const slidesField = document.querySelector(field);
   // новый блок между картинками и род. блоком
   const width = window.getComputedStyle(slidesWrapper).width;
   // ширина родительского блока

   
   let slideIndex = 1;
   let offset = 0;
   // отступ

   slidesField.style.width = 100 * offerSlide.length + "%";
   // устанавливаем ширину нового блока = сейчас он 400%
   slidesField.style.display = "flex";
   slidesField.style.transition = "0.5s all";

   slidesWrapper.style.overflow = "hidden";
   // 
   offerSlide.forEach(slide => {
      slide.style.width = width;
   });
   // задаем каждой картинке ширину родительского блока(?что бы полностью помещались)
   slider.style.position = "relative";
   // для навигации делаем позишин релатив

   const dots = document.createElement("ol");
   // создаем большую обертку для точек навигации
   const dotsArr = [];

   dots.classList.add("carousel-indicators");
   dots.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
   `;
   slider.append(dots);

   for (let i = 0; i < offerSlide.length; i++) {
      const dot = document.createElement("li");
      dot.setAttribute("data-slide-to", i + 1);
      dot.style.cssText = `
         box-sizing: content-box;
         flex: 0 1 auto;
         width: 30px;
         height: 6px;
         margin-right: 3px;
         margin-left: 3px;
         cursor: pointer;
         background-color: #fff;
         background-clip: padding-box;
         border-top: 10px solid transparent;
         border-bottom: 10px solid transparent;
         opacity: .5;
         transition: opacity .6s ease;
      `;

      if (i == 0) {
         dot.style.opacity = 1;
      }
      dots.append(dot);
      dotsArr.push(dot);
   }

   currentCounter.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);

   function dotsOpacity() {
      dotsArr.forEach(dot => dot.style.opacity = ".5");
      dotsArr[slideIndex - 1].style.opacity = 1;
   }

   function deleteNotDigits(str) {
      return +str.slice(0, str.length - 2);
   }
   console.log(width);

   nextArr.addEventListener("click", () => {
      if (offset == (deleteNotDigits(width)) * (offerSlide.length - 1)) {
         offset = 0;
      } else {
         offset += deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;
      // двигает блок в лево по оси Х на то колчество покселей, которое приходит 
      // с условия выше

      if (slideIndex == offerSlide.length) {
         slideIndex = 1;
         currentCounter.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
      } else {
         currentCounter.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(++slideIndex);
      }

      dotsOpacity();
   });

   prevArr.addEventListener("click", () => {
      if (offset == 0) {
         offset = deleteNotDigits(width) * (offerSlide.length - 1);
      } else {
         offset -= deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
         slideIndex = offerSlide.length;
         currentCounter.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
      } else {
         currentCounter.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(--slideIndex);
      }

      dotsOpacity();
   });

   totalCounter.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(offerSlide.length);

   dotsArr.forEach(dot => {
      dot.addEventListener("click", (e) => {
         const slideTo = e.target.getAttribute("data-slide-to");

         slideIndex = slideTo;
         offset = deleteNotDigits(width) * (slideTo - 1);
         slidesField.style.transform = `translateX(-${offset}px)`;

         dotsOpacity();
         currentCounter.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
      });
   });

   // function slidesOff() {
   //    offerSlide.forEach((item) => {
   //       item.classList.add("hide");
   //       item.classList.remove("show");
   //    });
   // }

   // function slideOn(i) {
   //    offerSlide[i].classList.add("show", "fade");
   //    offerSlide[i].classList.remove("hide");
   // }

   // slidesOff();

   // function slider(slidesItem, leftArr, rightArr, startIndex) {
   //    let index = startIndex;
   //    currentCounter.innerHTML = getZero(index + 1);

   //    function basicSlider() {
   //       currentCounter.innerHTML = getZero(index + 1);
   //       slidesOff();
   //       slideOn(index);
   //    }

   //    leftArr.addEventListener("click", () => {
   //       if (index == 0) {
   //          index = slidesItem.length - 1;
   //       } else {
   //          index -= 1;
   //       }
   //       basicSlider();
   //    });

   //    rightArr.addEventListener("click", () => {
   //       if (index == slidesItem.length - 1) {
   //          index = 0;
   //       } else {
   //          index += 1;
   //       }
   //       basicSlider();
   //    });
   //    slideOn(index);
   // }

   // slider(offerSlide, prevArr, nextArr, 0);
   // totalCounter.innerHTML = getZero(offerSlide.length);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   // Табы
   const tabs = document.querySelectorAll(tabsSelector);
   const tabsContent = document.querySelectorAll(tabsContentSelector);
   const tabsParent = document.querySelector(tabsParentSelector);


   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add("hide");
         item.classList.remove("show");
      });
      // закрываем всю контентную часть

      tabs.forEach(item => {
         item.classList.remove(activeClass);
      });
   }
   // отключаем класс активности (жирный шрифт)

   function showTabContent(i = 0) {
      tabsContent[i].classList.add("show", "fade");
      tabsContent[i].classList.remove("hide");
      tabs[i].classList.add(activeClass);
   }
   // показываем нужную контентую часть и выделяем активный таб
   // если нужно, что бы по умолч. без аргумента функция использовала 0 - испольузем это (i = 0) 



   hideTabContent();
   showTabContent();

   tabsParent.addEventListener("click", (e) => {
      const target = e.target;
      // можно создать переменную и поместить в неё е.таргет
      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
   // Создали делегирование событий, после условия создали перебор псевдомасива с табами, 
   // если айтем псевдомасива совпадает с таргетом, то выводим две функции
   // одна закрывает все табы, вторая показывает таб с тем номером, на который кликнул пользователь 
   // (айтем проверяется условием, и по условию присваивается номер, который передаётся в функцию)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
   if (num > 0 && num < 10) {
      return `0${num}`;
   } else {
      return num;
   }
}

function timer(id, deadline) {
   // Таймер
   function getTimeRemaining(endtime) {
      // функция, вычесляющая данные для таймера
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());

      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(t / (1000 * 60 * 60 * 24));
         hours = Math.floor((t / (1000 * 60 * 60)) % 24);
         minutes = Math.floor((t / 1000 / 60) % 60);
         seconds = Math.floor((t / 1000) % 60);
      }
      // В переменной Т = разница между дедлайном и текущим временем
      // Все следующие переменные вычесляют дни, часы.... в остатке + с 
      // округлнеие Math.floor(округляет к меньшему)
      return {
         "total": t,
         "days": days,
         "hours": hours,
         "minutes": minutes,
         "seconds": seconds
      };
      // функция возвращает обьект с данными
   }

   
   // функция, которая подставляем 0, когда значения в таймере не двузначное

   function setClock(selector, endtime) {
      // функция таймер, в параметрах селектор елемента на стр (таймеров может быть
      // много), второй - наш дедлайн
      const timer = document.querySelector(selector);
      const days = timer.querySelector("#days");
      const hours = timer.querySelector("#hours");
      const minutes = timer.querySelector("#minutes");
      const seconds = timer.querySelector("#seconds");
      const timeInterval = setInterval(updateClock, 1000);
      // создаём интревальный запуск функции, которая обновляет данные
      // на странице (раз в 1 секунду)

      updateClock();
      // вызывает функцию на страницу сразу, не дожидаясь задержки в 1000мс

      function updateClock() {
         const t = getTimeRemaining(endtime);
         // помещаем в переменную обьект из 1 функции

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);
         // присваиваем елементам на странице соответсвующии значения из функции

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
         // останавливаем функцию в случае, если разница в времени будет 0
      }
   }
   setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

// еспорт ф-ции гетЗеро в слайдер

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gerResource": () => (/* binding */ gerResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
   // эта функция отвечает за постинг данных
   const res = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: data
      //   дефолтный фетч пост запрос и перевод обьекта в Джейсон строку
   });

   return await res.json();
   // response.json() – декодирует ответ в формате JSON, 
   // ВОЗВРАЩАЕМ МЫ ЕГО, ПОТОМУ ЧТО В RES = ПРОМИС
};
// async - обьявляет, что функция асинхронна
// await - указывает, что бы пока не выполнилось это действие, 
// к следуюющему не переходить

const gerResource = async (url) => {
   // эта функция отвечает за получение данных для карточек
   const res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   }
   // ok – логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299.
   // status – код статуса HTTP-запроса, например 200.
   // throw new Error вручную выкидывает ошибку в консоль
   return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener("DOMContentLoaded", () => {
  
   const timerTimeout = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", timerTimeout), 500000);
   // вызов функции появления мод окна через некотор. время
   const deadline = new Date();
   deadline.setTime((new Date() - ((new Date().getHours() * 60 * 60 * 1000) + 
   (new Date().getSeconds() * 60 * 1000) + 
   (new Date().getMilliseconds()))) +
   (24 * 3600 * 1000) * 6);
   // Дедлайн таймера


   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", timerTimeout);
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", timerTimeout);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])({
      container : ".offer__slider",
      slide: ".offer__slide",
      nextArrow: ".offer__slider-next",
      prevArrov: ".offer__slider-prev",
      currentCounterA: "#current",
      totalCounterA: "#total",
      wrapper: ".offer__slider-wrapper",
      field: ".offer__slider-inner"
   });
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__["default"])(".timer", deadline);
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map