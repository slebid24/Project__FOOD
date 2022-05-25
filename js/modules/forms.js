import {openModal, closeModal} from "./modal";
import {postData} from "../services/services";

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


         postData('http://localhost:3000/requests', json)
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
      openModal(".modal", timerTimeout);

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
         closeModal(".modal");
      }, 4000);
      // через 4 секудны убирается окно благодарности, 
      // возвращаем на место класс отображения окну ввода формы( что бы в следующий раз оно снова работало)
      // закрываем полностью модальное окно
   }
}

export default forms;