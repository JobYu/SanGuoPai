# Knowledge Items（經驗沉澱）

與 Codex 一起解決問題或跑通流程後，會自動在此沉澱為 Knowledge Item，方便之後查閱與複用。

**全域機制**：此行為由全域 skill `~/.codex/skills/save-knowledge-item/` 驅動；**每個專案**都會在**該專案根目錄的 `knowledge/`** 寫入，本目錄為本專案的 knowledge。

## 存放方式

- **依領域/主題**：一個主題一個檔案，例如 `app-store-ranking.md`、`deploy-pipeline.md`。
- **格式**：每筆為一段 Markdown，含「情境／問題、做法、結果、注意事項」。
- **只追加不覆寫**：新經驗寫在對應檔案末尾，標註日期。

## 何時會寫入

當我們一起完成以下任一時，會自動寫一筆：

- 解決了某個 bug 或錯誤
- 跑通某個流程（腳本、排程、整合）
- 新增/改動一個可複用的設定或腳本，且已驗證可用
