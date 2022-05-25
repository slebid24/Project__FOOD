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

export default calc;