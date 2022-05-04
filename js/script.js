window.addEventListener("DOMContentLoaded", () => {
   // Табы

   const tabs = document.querySelectorAll(".tabheader__item");
   const tabsContent = document.querySelectorAll(".tabcontent");
   const tabsParent = document.querySelector(".tabheader__items");


   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add("hide");
         item.classList.remove("show");
      });
      // закрываем всю контентную часть

      tabs.forEach(item => {
         item.classList.remove("tabheader__item_active");
      });
   }
   // отключаем класс активности (жирный шрифт)

   function showTabContent(i = 0) {
      tabsContent[i].classList.add("show", "fade");
      tabsContent[i].classList.remove("hide");
      tabs[i].classList.add("tabheader__item_active");
   }
   // показываем нужную контентую часть и выделяем активный таб
   // если нужно, что бы по умолч. без аргумента функция использовала 0 - испольузем это (i = 0) 



   hideTabContent();
   showTabContent();

   tabsParent.addEventListener("click", (e) => {
      const target = e.target;
      // можно создать переменную и поместить в неё е.таргет
      if (target && target.classList.contains("tabheader__item")) {
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


   // Таймер

   const deadline = "2022-05-09";
   // Дедлайн таймера


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

   function getZero(num) {
      if (num > 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
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

   setClock(".timer", deadline);

   // Modal
   const modalOn = document.querySelectorAll("[data-modal]");
   const modalOff = document.querySelector("[data-close]");
   const modalWindow = document.querySelector(".modal");
   const modalStyle = getComputedStyle(modalWindow);

   function modalSwitcher(item) {
      if (modalStyle.display == "none") {
         modalWindow.style.display = "block";
         document.body.style.overflow = "hidden";
         clearTimeout(timerTimeout);
         // если пользователь нажмёт на мод окно, раньше, чем
         // оно автомат. вызовется - то клиртаймаут отклю авт. вызов
      } else if (modalStyle.display == "block") {
         modalWindow.style.display = "none";
         document.body.style.overflow = "";
      }
   }

   modalOn.forEach(item => {
      item.addEventListener("click", () => {
         modalSwitcher();
      });
   });

   modalOff.addEventListener("click", () => {
      modalSwitcher();
   });

   modalWindow.addEventListener("click", (e) => {
      if (e.target === modalWindow) {
         modalSwitcher();
      }
   });
   // Фунцкция, на клик вне области модального окна

   document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && modalStyle.display == "block") {
         modalSwitcher();
      }
   });

   // // Функция на закрывание модального окна кнопкой еск
   // const timerTimeout = setTimeout(modalSwitcher, 5000);
   // вызов функции появления мод окна через некотор. время


   const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.clientHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
   );
   // правильная высота всего содержимого документа

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
         modalSwitcher();
         removeEventListener("scroll", showModalByScroll);
      }
   }
   // функция, вызывающая мод окно в конце страницы. ремув нужен, что бы 
   // она сработала только 1 раз.

   window.addEventListener("scroll", showModalByScroll);


   // Класс для карт
   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
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
         element.innerHTML = `
               <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
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

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      ".menu .container"
      
   ).render();

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      10,
      ".menu .container"
      
   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      11,
      ".menu .container"
      
   ).render();


});