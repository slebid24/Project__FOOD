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
   const modalWindow = document.querySelector(".modal");
   const modalStyle = getComputedStyle(modalWindow);

   function closeModal() {
      modalWindow.style.display = "none";
      document.body.style.overflow = "";
   }

   function openModal() {
      modalWindow.style.display = "block";
      document.body.style.overflow = "hidden";
      clearTimeout(timerTimeout);
   }


   modalOn.forEach(item => {
      item.addEventListener("click", () => {
         openModal();
      });
   });

   modalWindow.addEventListener("click", (e) => {
      if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
         closeModal();
      }
   });
   // Фунцкция, на клик вне области модального окна

   document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && modalStyle.display == "block") {
         closeModal();
      }
   });
   // // Функция на закрывание модального окна кнопкой еск

   const timerTimeout = setTimeout(openModal, 500000);
   // вызов функции появления мод окна через некотор. время


   const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.clientHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
   );
   // правильная высота всего содержимого документа

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
         openModal();
         removeEventListener("scroll", showModalByScroll);
      }
   }
   // функция, вызывающая мод окно в конце страницы. ремув нужен, что бы 
   // она сработала только 1 раз.

   window.addEventListener("scroll", showModalByScroll);

   // Forms
   const forms = document.querySelectorAll("form");
   // выносим все формы с сайта в переменную формс

   const message = {
      loading: "img/form/spinner.svg",
      success: "Спасибо, мы скоро с вами свяжемся",
      failure: "Что-то пошло не так..."
   };
   // обьект с типами сообщений результата запроса 

   forms.forEach(item => {
      postData(item);
   });
   // все формы взяты через квериселектор алл, по этому для присваивания функции постДата
   // делаем перебор массива

   function postData(form) {
      form.addEventListener("submit", (e) => {
         // на все кнопки баттон действует метод сабмит  
         e.preventDefault();
         const statusMessage = document.createElement("img");
         // создаём елемент имг (для спинера) помещаем в статусмессадж
         statusMessage.src = message.loading;
         // источник для тега имг - берем из обьекта, где мы указывали пусть к спинеру
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         // назначаем стили спинеру
         
         
         form.insertAdjacentElement("afterend", statusMessage);
         // добавляем спинер на страницу после всех форм
         
         const request = new XMLHttpRequest();
         request.open("POST", "js/server.php");

         // request.setRequestHeader("Content-type", "multipart/form-data");
         request.setRequestHeader("Content-type", "applications/json");
         // При использовании обычного форм дата - заголовок не нужен. Если обычный джейсон - нужен.
         const formData = new FormData(form);
         // Объекты FormData используются, чтобы взять данные из HTML-формы и отправить их с помощью fetch или другого метода для работы с сетью.

         const object = {};
         formData.forEach(function (value, key) {
            object[key] = value;
         });
         // так как формдата - это не обычный обьект, его нужно перебрать
         // в переменную

         const json = JSON.stringify(object);
         // переводим обьект в джейсон формат


         // request.send(formData);
         // если в обычном формате
         request.send(json);
         // если джейсон
         // отправляем на сервер данные обьекта формдата 

         request.addEventListener("load", () => {
            // создаём обработчик события загрузки запроса
            if (request.status === 200) {
               // если успех
               console.log(request.response);
               showThanksModal(message.success);
               // выводим сообщение про успех (задействуем фукнцию, отображающая модальное окно благодарности)
               form.reset();
               // сбрасываем поля формы
               setTimeout(() => {
                  statusMessage.remove();
               }, 2000);
               // удаляем сообщение про успех спусят 2 сек
            } else {
               showThanksModal(message.failure);
               // дефолт
            }
         });
      });
   }

   // Суть заключается в том, что мы возьмем модальное окно "Мы свяжемся с вами ..."  и спрячем его (добавим класс "hide")
   // 
   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');
      prevModalDialog.classList.add('hide');

      // Потом запускается родительский элемент (серый фон)
      openModal();

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
         closeModal();
      }, 4000);
      // через 4 секудны убирается окно благодарности, 
      // возвращаем на место класс отображения окну ввода формы( что бы в следующий раз оно снова работало)
      // закрываем полностью модальное окно
   }


   











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

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      ".menu .container",
   ).render();

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      10,
      ".menu .container",
   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      11,
      ".menu .container",
   ).render();


});