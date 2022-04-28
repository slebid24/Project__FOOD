window.addEventListener("DOMContentLoaded", () => {
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
         }
      );
   }
});
// Создали делегирование событий, после условия создали перебор псевдомасива с табами, 
// если айтем псевдомасива совпадает с таргетом, то выводим две функции
// одна закрывает все табы, вторая показывает таб с тем номером, на который кликнул пользователь 
// (айтем проверяется условием, и по условию присваивается номер, который передаётся в функцию)





});
