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
      let days, hours, minutes, seconds
      const t = Date.parse(endtime) - Date.parse(new Date());
      
      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(t / (1000 * 60 * 60 * 24));
         hours = Math.floor((t / (1000 * 60 * 60)) % 24);
         minutes = Math.floor((t / 1000 / 60 ) % 60);
         seconds = Math.floor((t / 1000) % 60);
      }
      
      // В переменной Т = разница между дедлайном и текущим временем
      // Все следующие переменные вычесляют дни, часы.... в остатке + с 
      // округлнеие Math.floor(округляет к меньшему)
      return {
         "total" : t,
         "days" : days,
         "hours" : hours,
         "minutes" : minutes,
         "seconds" : seconds
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

         if(t.total <= 0) {
            clearInterval(timeInterval);
         }
         // останавливаем функцию в случае, если разница в времени будет 0
      }
   }

   setClock(".timer", deadline);

   


});