# WOWOROOM 家具購物網站

## 專案說明

這是一個使用 Vite + SCSS 開發的家具購物網站前端專案，整合 LiveJS API 實現購物車功能。

### 功能特色

- 直覺的購物車操作介面
- 即時商品列表與篩選
- 響應式設計，支援多種裝置瀏覽
- 完整的訂單流程管理

## 開發環境建置

### 需求條件

- Node.js (建議 v18 以上)
- npm

### 安裝與執行

```bash
# 安裝相依套件
npm install

# 啟動開發環境
npm run dev

# 生產環境建置
npm run build

# 預覽建置結果
npm run preview
```

## 專案結構

```tree
.
├── assets/             # 前端資源
│   ├── images/        # 圖片資源
│   ├── js/           # JavaScript 邏輯
│   │   ├── config.js     # API 設定
│   │   ├── index.js      # 購物車邏輯
│   │   └── index_original.js  # UI 互動
│   └── scss/         # 樣式檔案
├── layout/           # 版型模板
├── pages/           # 頁面
├── public/          # 靜態資源
├── main.js         # 主入口
└── vite.config.js  # Vite 設定
```

## 環境變數設定

建立 `.env` 檔案並設定以下變數：

```env
LIVEJS_API_PATH=your-api-path
LIVEJS_API_TOKEN=your-api-token
```

## 開發指令說明

| 指令              | 說明                |
| ----------------- | ------------------- |
| `npm run dev`     | 啟動開發伺服器      |
| `npm run build`   | 建置生產版本        |
| `npm run preview` | 預覽建置結果        |
| `npm run deploy`  | 部署至 GitHub Pages |

## API 端點

主要使用的 API 端點：

- 商品列表：GET /products
- 購物車操作：
  - 查詢：GET /carts
  - 新增：POST /carts
  - 刪除：DELETE /carts
- 訂單建立：POST /orders

## 部署說明

專案使用 GitHub Pages 進行部署：

1. 執行建置指令：`npm run build`
2. 執行部署指令：`npm run deploy`

## 注意事項

- 請確保已正確設定 LiveJS API 的路徑與權杖
- 開發時建議使用 Chrome 開發者工具進行除錯
- 建置後請先在本地預覽確認功能正常
