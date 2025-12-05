async function includeHTML(id, url){
  const res = await fetch(url);
  if(res.ok){ document.getElementById(id).innerHTML = await res.text(); }
}
includeHTML('site-header','header.html');
includeHTML('site-footer','footer.html');

const data = [
  {id:1,title:'Cips (200g)',price:29.90,old:39.90,img:'https://picsum.photos/seed/1/300/200',sold:120,cat:'atistirmalik'},
  {id:2,title:'Bisküvi Paket',price:18.50,old:null,img:'https://picsum.photos/seed/2/300/200',sold:86,cat:'atistirmalik'},
  {id:3,title:'Meyve Suyu (1L)',price:12.90,old:15.90,img:'https://picsum.photos/seed/3/300/200',sold:45,cat:'icecek'},
  {id:4,title:'Fındık 500g',price:149.90,old:189.90,img:'https://picsum.photos/seed/4/300/200',sold:30,cat:'kuruyemis'},
  {id:5,title:'Un (10kg)',price:249.90,old:null,img:'https://picsum.photos/seed/5/300/200',sold:10,cat:'unlu'}
];

function formatPrice(v){return v.toFixed(2)+' TL'}

function render(list){
  const el=document.getElementById('products');
  if(!el) return;
  el.innerHTML='';
  list.forEach(p=>{
    const pct=p.old?Math.round((p.old-p.price)/p.old*100):0;
    const card=document.createElement('article');
    card.className='card';
    card.innerHTML=`
      <div class="badge">${pct?('%'+pct):''}</div>
      <div class="media"><img src="${p.img}" alt="${p.title}"></div>
      <div class="title">${p.title}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
        <div>
          <div class="price">${formatPrice(p.price)}</div>
          ${p.old?`<div class="old">${formatPrice(p.old)}</div>`:''}
        </div>
        <div class="sold">${p.sold} adet</div>
      </div>
      <div class="actions">
        <button class="btn small" onclick="alert('Detay: ${p.title}')">Detay</button>
        <button class="btn small" onclick="alert('Sepete eklendi: ${p.title}')">Sepete Ekle</button>
      </div>`;
    el.appendChild(card);
  });
  const c=document.getElementById('count'); if(c) c.textContent=list.length;
}

function initProductsPage(){
  const search=document.getElementById('search');
  if(search){
    search.addEventListener('input',e=>{
      const q=e.target.value.toLowerCase();
      render(data.filter(p=>p.title.toLowerCase().includes(q)));
    });
  }
  document.querySelectorAll('.cat').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const c=btn.dataset.cat;
      render(c==='all'?data:data.filter(p=>p.cat===c));
    });
  });
  if(document.getElementById('products')) render(data);
}

window.addEventListener('DOMContentLoaded',()=>setTimeout(initProductsPage,200));