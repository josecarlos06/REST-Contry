(function () {
   const form = document.querySelector('.form');
   const regions = document.querySelector('#region');
   let names;
   // document ready
   document.addEventListener('DOMContentLoaded', () => {
      darkMode();
      contriesFecth();
   })

   form.addEventListener('submit',(e) => {
      e.preventDefault();
      names = document.querySelector('#search').value;
      contriesFecth();
      form.reset();
   })
   regions.addEventListener('change',(e)=>{
      names = "";
      contriesFecth(e.target.value);
   })
   
   const darkMode = () => {
      const toggleMode = document.querySelector('#toggle-mode');
      const body = document.querySelector('body');
      const darkLocal = JSON.parse(localStorage.getItem("dark")) || '';
      darkLocal && body.classList.add(darkLocal);
      toggleMode.addEventListener('click', () => {
         body.classList.contains('dark')
            ? body.classList.remove('dark')
            : body.classList.add('dark');
         localStorage.setItem('dark', JSON.stringify(body.classList.value))
      });
   };

   const contriesFecth = async (regions = '') => {
      const url = './data.json';
      const res = await fetch(url);
      const data = await res.json();
      console.log(regions);
      if (regions) {
         const filters = data.filter(region => region.region === regions);
         return interfaceUi(filters);
      }
      return interfaceUi(data);
   };

   const interfaceUi = (data) => {
      const contrys = document.querySelector('#contrys');
      cleanTemplate(contrys)
      data.forEach(contry => {
         const { name, flags, population, region, capital } = contry;
         const item = document.createElement('DIV');
         item.classList.add('contrys__item');
         if(names) !name.includes(names.trim()) && item.classList.add('remove')
         item.onclick = () => {
            const main = document.querySelector('#main');
            main.remove();
            interfaceContry(contry)
         }

         item.innerHTML = `
            <figure class="contrys__figure">
               <img src=${flags.svg} alt=${name} loading="lazy">
            </figure>
            <div class="contrys__content">
               <h2 class="contrys__heading">${name}</h2>
               <p class="contrys__paragraph">Population: <span>${population}</span></p>
               <p class="contrys__paragraph">Region: <span>${region}</span></p>
               <p class="contrys__paragraph">Capital: <span>${capital}</span> </p>
            </div>
         `;
         contrys.appendChild(item)
      });
   }

   const interfaceContry = (contry) => {
      const contryLayout = document.querySelector('#contry');

      const div = document.createElement('div');
      const { name, flags, population, region, capital } = contry;
      div.classList.add('contry__grid')

      div.innerHTML = `
         <button class="toast">Back</button>
         <figure class="contry__figure">
            <img src=${flags.svg} alt=${name} loading="lazy">
         </figure>
         <div class="contry__content">
            <h2 class="contrys__heading">${name}</h2>
            <p class="contrys__paragraph">Population: <span>${population}</span></p>
            <p class="contrys__paragraph">Region: <span>${region}</span></p>
            <p class="contrys__paragraph">Capital: <span>${capital}</span> </p>
         </div>
      `

      contryLayout.appendChild(div)

      const toast = document.querySelector('.toast');

      toast.onclick = ()=>{
         window.location.href = "index.html"
      }
   }

   const cleanTemplate = (element) => {
      while (element.firstChild) {
         element.removeChild(element.firstChild);
      }
   }

}())