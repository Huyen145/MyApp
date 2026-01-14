# Hướng dẫn Copilot cho repo này

Mục đích: Cung cấp cho agent AI những kiến thức ngắn gọn, hữu dụng để thực hiện các thay đổi an toàn và nhất quán trong codebase Expo / React Native + Expo Router này.

Bắt đầu nhanh (luồng làm việc của dev)
- Cài phụ thuộc: `npm install`.
- Chạy dev server: `npm run start` (tương đương `npx expo start`).
- Chạy trên thiết bị/máy ảo:
  - Android: `npm run android`
  - iOS: `npm run ios`
  - Web: `npm run web`
- Chạy lint: `npm run lint` (dùng `eslint-config-expo`).
- Reset project: `npm run reset-project` (di chuyển code khởi tạo vào `app-example` hoặc xóa theo lựa chọn).

Kiến trúc tổng quan
- Dùng Expo + React Native với Expo Router (định tuyến theo file). Code chính nằm trong thư mục `/app`.
- `app/_layout.tsx` là điểm gắn kết toàn cục:
  - `ThemeProvider` (theme cho react-navigation) bọc toàn app
  - `AuthProvider` và `CartProvider` được mount ở đây
  - `unstable_settings.anchor` mặc định trỏ tới `(tabs)`
- UI: các component presentational nhỏ nằm trong `components/` (ví dụ `components/account/*`). Các control tái sử dụng nằm trong `components/ui/` và `ui/`.
- Trạng thái: `contexts/` lưu state chính (`AuthContext.tsx`, `CartContext.tsx`).
- Dịch vụ: `services/` chứa các wrapper API (`api.ts`, `auth.service.ts`, `product.service.ts`).
- Hằng số & kiểu: `constants/`, `types/` chứa giá trị chia sẻ và kiểu TypeScript.

Quy ước dự án & lưu ý quan trọng
- Định tuyến: Thêm trang bằng cách thêm file vào `app/` (ví dụ `app/(auth)/login.tsx`). Dùng folder group `()` để gom route (ví dụ `(auth)`, `(tabs)`).
- Theme: Sử dụng `useThemeColor` và các component `ThemedText` / `ThemedView`. Màu nằm ở `constants/theme.ts`.
- TypeScript: `tsconfig.json` bật `strict: true` và alias `@/*` → root. Dùng import bắt đầu bằng `@/` cho file nội bộ.
- Xử lý token auth: `AuthContext.tsx` lưu token vào `AsyncStorage` với key `@app_token` và user `@app_user`. Nó cũng gán `globalThis.authToken` để `services/api.ts` dùng tự động — khi sửa luồng auth hãy cập nhật cả context và interceptor axios.
- Axios client: `services/api.ts` tạo 1 instance axios với timeout 10s và các interceptor:
  - Thêm header `Authorization: Bearer <token>` từ `globalThis.authToken`
  - Chuẩn hóa lỗi timeout / network để hiển thị thân thiện
- Lưu giỏ hàng: `CartContext.tsx` dùng key `@app_cart` để lưu local và chuẩn hóa `image` về `{ uri }` để tương thích khi render và lưu.
- Ghi log: code thường dùng `console.log` / `console.warn` cho debug nhanh; tránh commit secrets.

Tích hợp & phụ thuộc ngoài
- URL API được cấu hình ở `constants/api.ts` (hiện đang trỏ tới Railway).
- Sử dụng các tính năng native của Expo: `expo-image`, `expo-haptics`, `expo-image-picker`, `expo-splash-screen`, v.v. Khi thêm native module, làm theo docs Expo và cập nhật `app.json` nếu cần.

Ghi chú debug & kiểm thử
- Không có test tự động; kiểm thử thủ công bằng Expo dev tools và thiết bị/máy ảo.
- Dùng `npx expo start` và giao diện web để mở Metro, xem logs thiết bị. Kiểm tra console để thấy cảnh báo axios và thông điệp lỗi đã được chuẩn hóa trong `services/api.ts`.

Tệp tham khảo cho các tác vụ phổ biến
- Điểm vào & cấu hình chung: `app/_layout.tsx` (theme + providers)
- Routes: `app/(auth)/`, `app/(tabs)/`, `app/*.tsx`
- Auth: `contexts/AuthContext.tsx`, `services/auth.service.ts`
- API client: `services/api.ts`, `constants/api.ts`
- Cart & local persistence: `contexts/CartContext.tsx`
- Theming & primitives UI: `components/themed-text.tsx`, `components/themed-view.tsx`, `hooks/use-theme-color.ts`
- Script: `scripts/reset-project.js`

Quy tắc PR cho sửa đổi do AI tạo
- Giữ thay đổi nhỏ, có thể kiểm tra; nếu thay đổi hành vi cần chỉ dẫn kiểm thử thủ công.
- Nếu thay đổi lưu token, cập nhật nhất quán ở `constants/api.ts`, `contexts/*`, và `services/*`.
- Dùng import `@/` và giữ strict typing của TypeScript (thêm kiểu vào `types/` nếu cần).

Nếu bạn muốn, tôi có thể mở rộng thêm ví dụ cụ thể (ví dụ: cách thêm route, cách giả lập `AsyncStorage` để test) hoặc điều chỉnh giọng văn.
