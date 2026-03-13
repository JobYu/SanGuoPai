# 三國派 (SanGuoPai) - 21點戰鬥 Roguelike

這是一款結合三國題材與 Roguelike 元素的 21 點博弈策略遊戲。

## 🚀 專案改動：從 Electron 遷移至 Web 現代架構

本專案已完成從 Electron 桌面應用程式到 **現代網頁前端架構** 的遷移，現在完全支持部署至 Cloudflare Pages、GitHub Pages 等平台。

### 核心技術改動
-   **模組系統轉化**: 從 CommonJS (`require`/`module.exports`) 全面遷移至 **ES Modules** (`import`/`export`)。
-   **建構工具更新**: 引入 **Vite** 作為開發伺服器與打包工具，取代原本純 Node.js 的運行環境。
-   **資料處理優化**: `DataManager` 現在使用瀏覽器原生 **`fetch()` API** 非同步加載 JSON 檔案（`generals.json`, `enemies.json`），擺脫了對 Node.js `fs` 模組的依賴。
-   **UI 與視覺升級**: 
    -   引入 Google Fonts (馬善政、Noto Sans TC、ZCOOL 快樂體)。
    -   全面重構 `style.css`，採用磨砂玻璃 (Glassmorphism) 設計風格。
    -   加入響應式縮放邏輯 (`handleResize`)，確保 1280x720 的遊戲畫面在任何解析度下都能完美呈現。

## 🛠 本地開發

### 安裝依賴
```bash
npm install
```

### 啟動開發伺服器 (Vite)
```bash
npm run dev
```

### 介面語言
- 瀏覽器會根據使用者的系統語言或瀏覽器語言，自動在 `繁體中文`、`简体中文`、`English` 之間選擇最匹配的介面語言。
- 玩家也可以在遊戲首頁手動切換介面語言，選擇會保存到本機並在之後優先生效。
- 若偵測不到支援語言，會回退到 `English`。

### 生產環境打包 (用於部署)
```bash
npm run build
```

## 🌐 部署至 Cloudflare Pages

1. 將專案推送到 GitHub。
2. 在 Cloudflare Pages 中選取該專案。
3. 設定 **Framework preset** 為 `Vite`。
4. 設定 **Build command** 為 `npm run build`。
5. 設定 **Build output directory** 為 `dist`。

---

*本專案由 AI 輔助開發，致力於打造極致視覺體驗的三國博弈冒險。*
