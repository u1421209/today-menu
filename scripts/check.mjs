import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('docs/assets/meals.js','utf8'),ctx);
const data=ctx.window.MEALS;assert(Array.isArray(data)&&data.length);
const ids=new Set(),names=new Set();
for(const m of data){assert(/^[a-z]+(?:-[a-z0-9]+)*$/.test(m.id),'id 格式錯誤');assert(!ids.has(m.id),'id 重複');ids.add(m.id);assert(['breakfast','lunch','dinner'].includes(m.category),'分類錯誤');for(const k of ['name','emoji','description'])assert(typeof m[k]==='string'&&m[k].trim(),k+' 不可空白');const n=m.category+':'+m.name;assert(!names.has(n),'同分類名稱重複');names.add(n);assert(Number.isInteger(m.priceMin)&&m.priceMin>0);assert(Number.isInteger(m.priceMax)&&m.priceMax>=m.priceMin);}
assert.equal(fs.readFileSync('AGENTS.md','utf8'),fs.readFileSync('docs/AGENTS.md','utf8'),'公開規則未同步');
for(const m of fs.readFileSync('docs/index.html','utf8').matchAll(/(?:src|href)="(assets\/[^"#]+)"/g))assert(fs.existsSync('docs/'+m[1]),'資源不存在');
console.log(`PASS：${data.length} 道餐點，欄位、ID、名稱、價格、資源與規則一致。`);
