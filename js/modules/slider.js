import {getZero} from "./timer";
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

   currentCounter.innerHTML = getZero(slideIndex);

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
         currentCounter.innerHTML = getZero(slideIndex);
      } else {
         currentCounter.innerHTML = getZero(++slideIndex);
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
         currentCounter.innerHTML = getZero(slideIndex);
      } else {
         currentCounter.innerHTML = getZero(--slideIndex);
      }

      dotsOpacity();
   });

   totalCounter.innerHTML = getZero(offerSlide.length);

   dotsArr.forEach(dot => {
      dot.addEventListener("click", (e) => {
         const slideTo = e.target.getAttribute("data-slide-to");

         slideIndex = slideTo;
         offset = deleteNotDigits(width) * (slideTo - 1);
         slidesField.style.transform = `translateX(-${offset}px)`;

         dotsOpacity();
         currentCounter.innerHTML = getZero(slideIndex);
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

export default slider;