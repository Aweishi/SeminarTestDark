# 研討會網站需求

---

## 技術規格

- 純 HTML / CSS / JavaScript，不使用前端框架
- 使用 TailwindCSS（CDN 引入）
- 動態效果：GSAP ScrollTrigger、GSAP SplitText、GSAP DrawSVGPlugin
- 語言：英文
- 視覺風格：深色系、大膽、非模板感、無 AI 感
- 參考風格：[aanstekelijk.nl](https://aanstekelijk.nl/)、[osmo.supply](https://www.osmo.supply/)、[flowfest.co.uk](https://www.flowfest.co.uk/)

---

## 一、Hero（主視覺）

- 版面：100vw × 100vh 全螢幕滿版
- 背景：一張全幅背景圖（`asset/img/HeroSection_A.jpg`）
- 前景：研討會標準字 SVG（`asset/img/HeroSection_Text-13.svg`）
- 無 CTA 按鈕
- 滾動動態：視差滾動（Parallax），背景圖隨捲動以較慢速度位移，製造景深感；可搭配標題文字以 GSAP SplitText 做逐字淡出或位移消失效果

---

## 二、Overview

大標：Overview

內容：As AI moves toward accelerated expansion in 2026, this seminar explores deep industrial shifts across memory and foundry. Key topics include the structural capacity gap in DRAM/NAND, the strategic dominance of HBM, the dual realities of the foundry market, and the diversification of AI servers. This session provides critical insights for navigating the 2026–2028 supercycle and capturing emerging market opportunities.

滾動動態：文字以 GSAP SplitText 逐字或逐行 reveal（由下往上淡入）

---

## 三、About Seminar

- Date：May 12, 2026
- Time：14:00–16:00（Check-in begins at 13:30）
- Venue：Concourse G, Concourse Level, New York Hilton Midtown
  (1335 Avenue of the Americas, New York, New York 10019, USA)
- Language：English
- 不嵌入 Google Map

滾動動態：各資訊項目以 ScrollTrigger 觸發，依序錯落滑入

---

## 四、Agenda

備注：The Agenda is preliminary and subject to change without notice.

| Time | Topic | Speaker | Title |
| --- | --- | --- | --- |
| 13:00 – 14:00 | Registration | — | — |
| 14:00 – 14:20 | The Memory Supercycle 2026–2028: Bridging the Structural Gap from Consumer to AI Dominance | Avril Wu | TrendForce Senior Research Vice President |
| 14:20 – 14:40 | NAND Flash Demand Projections in the Era of AI Inference | Bryan Ao | TrendForce Research Manager |
| 14:40 – 15:00 | HBM Remains the Structural Anchor of the DRAM Industry Amid Shifting Profit Dynamics | Ellie Wang | TrendForce Senior Analyst |
| 15:00 – 15:20 | Networking | — | — |
| 15:20 – 15:40 | Navigating 2026 Foundry Market – Dual Realities of Advanced Dominance and Mature Saturation | Joanne Chiao | TrendForce Research Manager |
| 15:40 – 16:00 | AI Server Acceleration: From GPU Dominance to ASIC Diversification | Fion Chiu | TrendForce Analyst |

滾動動態：表格列依序以 ScrollTrigger stagger 由左滑入

---

## 五、Speakers

每位講者顯示：照片、姓名、職稱、簡短 Bio（待補充）

- **Avril Wu**
  - TrendForce / Senior Research Vice President
  - Bio：Avril Wu has well over a decade of professional experience specializing in various aspects of memory product research.
Prior to her 10-year tenure with TrendForce, Avril had worked with an established memory company for more than two years, also covering the same sector. Despite focusing on the DRAM market initially, Avril extended her expertise in 2019 to include NAND Flash as well, meaning she is currently more than qualified to cover the entire memory sector.
  - 照片：`asset/img/AvrilWu.jpg`

- **Bryan Ao**
  - TrendForce / Research Manager
  - Bio：Ao focuses on demand trends of NAND Flash storage solutions used by server OEMs, data center operators, and AI or edge computing service provider. He previously worked in an electronic component distributor specializing in mobile device memory solutions and SSD controller ICs.
  - 照片：`asset/img/BryanAo.jpg`

- **Ellie Wang**
  - TrendForce / Senior Analyst
  - Bio：Primarily performs research in DRAM supply side capacity, technology development, and market analysis for consumer side demand.
  - 照片：`asset/img/EllieWang.jpg`

- **Joanne Chiao**
  - TrendForce / Research Manager
  - Bio：Joanne’s research focuses on foundry market analysis, including production capacity, technological development, and customer demand.
  - 照片：`asset/img/JoanneChiao.jpg`

- **Fion Chiu**
  - TrendForce / Analyst
  - Bio：With years of experience in equity research within the technology sector, I have developed strong analytical skills and a comprehensive understanding of financial markets and investment strategies to provide valuable recommendations. My current research at TrendForce focuses on the AI server industry, particularly in areas such as HPC/AI chips and thermal solutions. By assessing the performance of relevant companies and analyzing market dynamics, I offer insightful information and a well-rounded view of the rapidly evolving landscape of AI.
  - 照片：`asset/img/FionChiu.jpg`

排版：卡片式橫排，滾動動態以 ScrollTrigger stagger 依序從下方淡入

---

## 六、Registration

Online registration will close at 12:00 pm on May 11, 2026. Please contact us for further assistance.

費用：USD $399

CTA：「Register NOW」按鈕 → 連結至外部報名表單（URL 待提供）

Terms and Conditions：
1. Registration fees are non-refundable.
2. Once the payment is received, we'll send an invoice code to your e-mail. Please bring the code with a business card to check in.

---

## 七、Contact Us

If you need any assistance, please contact us:

**Liz Chen**
trendforce_service@trendforce.com
+886-2-8978-6488 ext. 372

**Jade Chou**
trendforce_service@trendforce.com
+886-2-8978-6488 ext. 661

---

## 八、Organizer

TrendForce Logo（圖檔待提供：`trendforce-logo.svg`）

---

## 待提供素材清單

| 素材 | 說明 |
| --- | --- |
| `asset/img/HeroSection_A.jpg` | Hero 背景圖 ✅ |
| `asset/img/HeroSection_Text-13.svg` | Hero 標準字 SVG ✅ |
| `asset/img/AvrilWu.jpg` | 講者照片 ✅ |
| `asset/img/BryanAo.jpg` | 講者照片 ✅ |
| `asset/img/EllieWang.jpg` | 講者照片 ✅ |
| `asset/img/JoanneChiao.jpg` | 講者照片 ✅ |
| `asset/img/FionChiu.jpg` | 講者照片 ✅ |
| 各講者 Bio | 簡短英文自我介紹 ✅ |
| `trendforce-logo.svg` | Organizer Logo（待提供） |
| 報名表單 URL | Registration CTA 連結目標（待提供） |
