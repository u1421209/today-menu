"use strict";
const labels={breakfast:'早餐',lunch:'午餐',dinner:'晚餐'};
let category='breakfast',lastId=null;
const $=id=>document.getElementById(id);
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function candidates(){const cap=Number($('budget').value);return window.MEALS.filter(m=>m.category===category&&(!cap||m.priceMax<=cap));}
function refresh(){const all=window.MEALS.filter(m=>m.category===category),pool=candidates();$('eligible').textContent=pool.length?`有 ${pool.length} 個選項等你抽籤 · 多個選項時避免連續重複`:'這個預算暫時沒有選項，試著提高預算吧。';$('draw').disabled=!pool.length;$('menu-count').textContent=`${all.length} 道`;$('ticket-category').textContent=labels[category]+'靈感';$('menu').innerHTML=all.map(m=>`<article class="meal ${pool.includes(m)?'':'excluded'} ${m.id===lastId?'picked':''}"><span class="icon" aria-hidden="true">${escapeHTML(m.emoji)}</span><div><strong>${escapeHTML(m.name)}</strong><p>參考 NT$ ${m.priceMin}–${m.priceMax}${pool.includes(m)?'':' · 超出預算'}</p></div></article>`).join('');}
function resetResult(){lastId=null;$('result').innerHTML='<div class="plate"><span>🍳</span></div><p class="result-label">今天的美味，還沒揭曉</p><h2>會是什麼好料呢？</h2><p>選好條件，按「幫我選一個」開始。</p><span class="price waiting">準備好，就抽一個吧</span>';refresh();}
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));resetResult();}));
$('budget').addEventListener('change',resetResult);
$('draw').addEventListener('click',()=>{let pool=candidates();if(!pool.length)return;if(pool.length>1)pool=pool.filter(m=>m.id!==lastId);const meal=pool[Math.floor(Math.random()*pool.length)];lastId=meal.id;$('result').innerHTML=`<div class="plate flash"><span>${escapeHTML(meal.emoji)}</span></div><p class="result-label">你的${labels[category]}靈感，出爐了！</p><h2>${escapeHTML(meal.name)}</h2><p>${escapeHTML(meal.description)}</p><span class="price">參考 NT$ ${meal.priceMin}–${meal.priceMax}</span>`;refresh();});
refresh();
