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

export default tabs;