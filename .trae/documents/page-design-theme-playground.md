# Page Design Spec — Theme Playground (desktop-first)

## Global Styles (Design tokens)
- Nền: #0B1220 (app background nhẹ tối) hoặc trắng trung tính; nội dung trong card trắng.
- Typography: 14px base; scale 12/14/16/20/24.
- Spacing: 8px grid; khoảng cách section 16–24.
- Border radius: mặc định theo AntD; demo thể hiện thay đổi khi bạn chỉnh.
- Button: primary/secondary; hover dùng màu primary với opacity.
- Link: màu primary; hover underline.

## Page: Playground Theme

### Meta Information
- Title: Theme Playground
- Description: Chỉnh theme Ant Design và xem preview realtime.
- Open Graph: title/description đồng nhất, type=website.

### Layout
- Desktop-first: bố cục 2 cột cố định.
  - Trái: panel editor (320–380px).
  - Phải: preview (fluid).
- CSS: Flexbox cho khung tổng; trong preview dùng Grid/Card để chia nhóm demo.
- Responsive:
  - >= 1200px: 2 cột.
  - 768–1199px: 2 cột nhưng thu hẹp panel trái.
  - < 768px: xếp dọc (editor trên, preview dưới) để vẫn dùng được.

### Page Structure
1) Top Header
2) Main Split View
   - Left: Theme Editor
   - Right: Live Preview + Component Groups

### Sections & Components

#### 1) Top Header
- Trái: tên app “Theme Playground”.
- Phải: mô tả ngắn “Chỉnh theme → preview realtime”.

#### 2) Theme Editor (panel trái)
- Container: Card + scroll dọc (sticky trong viewport nếu cần).
- Các nhóm điều khiển (dạng Collapse/Divider):
  - Màu sắc: primary/success/warning/error, text/base bg.
  - Typography: fontSize, fontFamily (nếu có), lineHeight.
  - Shape: borderRadius, controlHeight.
  - Algorithm: default/dark/compact (nếu bạn bật lựa chọn).
- Control UI: ColorPicker/InputNumber/Select/Slider.
- Interaction:
  - Mỗi thay đổi cập nhật state theme ngay lập tức.
  - State này được truyền vào ConfigProvider.theme (realtime preview).

#### 3) Live Preview (panel phải)
- Root preview bọc bởi ConfigProvider (theme lấy từ state).
- Preview layout:
  - Dạng “sectioned gallery” (mỗi nhóm là 1 Card).
  - Trong mỗi Card: demo component + label ngắn.

##### Nhóm demo component (15–20 component, gợi ý 18)
- General: Button, Typography, Icon (nếu dùng), Tag
- Data Entry: Input, InputNumber, Select, DatePicker, Radio, Checkbox, Switch, Slider, Form
- Data Display: Table, Tabs, Collapse
- Feedback: Alert, Modal, Tooltip
- Navigation: Pagination, Breadcrumb (hoặc Menu nếu bạn muốn)

- Quy ước demo:
  - Mỗi component có 1–2 biến thể tối thiểu để thấy theme tác động (default/primary/disabled…)
  - Dữ liệu demo tĩnh, nhỏ gọn, không yêu cầu backend.

### Accessibility & States
- Focus ring hiển thị rõ (theo AntD) khi tab bằng bàn phím.
- Empty/error states tối thiểu cho Form (required rule) để thấy màu feedback theo theme.

### Motion
- Dùng transition nhẹ (150–200ms) cho hover/focus; modal mở theo mặc định AntD.