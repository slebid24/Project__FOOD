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

export default modal;
export {openModal};
export {closeModal};