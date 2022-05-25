import {gerResource} from "../services/services";

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

   gerResource("http://localhost:3000/menu")
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

export default cards;