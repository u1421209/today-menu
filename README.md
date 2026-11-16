# 今天吃什麼？
一頁式三餐抽籤小作業，包含 18 道餐點、預算篩選與避免連續重複。

## 本機試玩
直接用瀏覽器開啟 docs/index.html。

## GitHub 上傳與公開
1. 建立 Public repository，例如 today-menu。
2. 把本專案裡的 AGENTS.md、README.md、SUBMISSION.md、docs、templates、scripts 全部上傳至 main 分支，保留資料夾結構。不要只上傳 ZIP，也不要再包一層 Today_Menu_Project 資料夾。
3. Settings → Pages → Source 選 Deploy from a branch。
4. Branch 選 main，資料夾選 /docs，按 Save。
5. 等部署完成，複製 GitHub 提供的網站網址。
6. 在 SUBMISSION.md 填入學號姓名、真實 Repository 連結與網站連結。

## 新增餐點
先讀 AGENTS.md，複製 templates/meal.json 的格式，把新資料加入 docs/assets/meals.js。

## 檢查
安裝 Node.js 的電腦可在專案根目錄執行：
```
node scripts/check.mjs
node --check docs/assets/app.js
```
一般瀏覽網站不需要 Node.js、API 金鑰或後端。價格為示例估算，不是即時店家報價。

## 線上成果
網站：https://meal-picker-1116-k8m3.dreamyhatch3.chatgpt.site/
Repository：https://github.com/u1421209/today-menu
