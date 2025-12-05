async function includeHTML(id, url){
  const res = await fetch(url);
  if(res.ok){ document.getElementById(id).innerHTML = await res.text(); }
}
includeHTML('site-header','header.html');
includeHTML('site-footer','footer.html');

// WhatsApp number - BURAYA kendi numaranı yaz (ülke kodu + numara, örn: 905301234567)
const WHATSAPP_NUMBER = "905438610057"; // örn: 905438610057

function formatPrice(v){ return v.toFixed(2) + ' TL'; }

function openWhatsAppForProduct(p) {
  // Mesaj şablonu (istediğin gibi düzenleyebilirsin)
  const message = `Merhaba, ${p.title} hakkında detaylı bilgi almak istiyorum. Ürün ID: ${p.id} Fiyat: ${formatPrice(p.price)}`;
  const text = encodeURIComponent(message);

  // Eğer WHATSAPP_NUMBER geçerli (sadece rakamlar) ise doğrudan numaraya gider
  if (WHATSAPP_NUMBER && WHATSAPP_NUMBER.match(/^[0-9]+$/)) {
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${text}`;
    window.open(url, '_blank');
  } else {
    // Eğer numara boşsa veya format hatalıysa: genel WhatsApp mesaj ekranı (kullanıcı alıcıyı seçer)
    const url = `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
  }
}

const data = [
  {id:1,title:'Cips (200g)',price:29.90,old:39.90,img:'https://picsum.photos/seed/1/300/200',sold:120,cat:'atistirmalik'},
  {id:2,title:'Bisküvi Paket',price:18.50,old:null,img:'https://picsum.photos/seed/2/300/200',sold:86,cat:'atistirmalik'},
  {id:3,title:'Meyve Suyu (1L)',price:12.90,old:15.90,img:'https://picsum.photos/seed/3/300/200',sold:45,cat:'icecek'},
  {id:4,title:'Fındık 500g',price:149.90,old:189.90,img:'https://picsum.photos/seed/4/300/200',sold:30,cat:'kuruyemis'},
  {id:5,title:'Un (10kg)',price:249.90,old:null,img:'https://picsum.photos/seed/5/300/200',sold:10,cat:'unlu'}
];

function formatPrice(v){return v.toFixed(2)+' TL'}

// render fonksiyonu (ürün kartlarını oluşturur)
function render(list){
  const el = document.getElementById('products');
  if (!el) return;
  el.innerHTML = '';

  list.forEach(p => {
    const pct = p.old ? Math.round((p.old - p.price) / p.old * 100) : 0;
    const pJson = JSON.stringify(p).replace(/'/g, "\\'");
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML =
      `<div class="badge">${pct ? ('%' + pct) : ''}</div>
       <div class="media"><img src="${p.img}" alt="${p.title}"></div>
       <div class="title">${p.title}</div>
       <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
         <div>
           <div class="price">${formatPrice(p.price)}</div>
           ${p.old ? `<div class="old">${formatPrice(p.old)}</div>` : ''}
         </div>
         <div class="sold">${p.sold} adet</div>
       </div>
       <div class="actions">
         <button class="btn small" onclick="alert('Detay: ${p.title.replace(/'/g, \"\\\\'\")}')">Detay</button>
         <button class="btn small" onclick="window.openWhatsAppForProduct('${pJson}')">Detaylı Bilgi</button>
       </div>`;

    el.appendChild(card);
  });

  const c = document.getElementById('count'); if (c) c.textContent = list.length;
}

// Bu yardımcı fonksiyon, onclick üzerinden gönderilen JSON-string'i parse edip asıl fonksiyonu çağırır
window.openWhatsAppForProduct = function(pJson) {
  try {
    const p = (typeof pJson === 'string') ? JSON.parse(pJson.replace(/\\'/g, "'")) : pJson;
    openWhatsAppForProduct(p);
  } catch (e) {
    console.error('Ürün verisi çözülemedi', e);
    alert('Ürün bilgisi gönderilemedi.');
  }
}

window.addEventListener('DOMContentLoaded',()=>setTimeout(initProductsPage,200));
