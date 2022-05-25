const postData = async (url, data) => {
   // эта функция отвечает за постинг данных
   const res = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: data
      //   дефолтный фетч пост запрос и перевод обьекта в Джейсон строку
   });

   return await res.json();
   // response.json() – декодирует ответ в формате JSON, 
   // ВОЗВРАЩАЕМ МЫ ЕГО, ПОТОМУ ЧТО В RES = ПРОМИС
};
// async - обьявляет, что функция асинхронна
// await - указывает, что бы пока не выполнилось это действие, 
// к следуюющему не переходить

const gerResource = async (url) => {
   // эта функция отвечает за получение данных для карточек
   const res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   }
   // ok – логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299.
   // status – код статуса HTTP-запроса, например 200.
   // throw new Error вручную выкидывает ошибку в консоль
   return await res.json();
};

export {postData};
export {gerResource};