# Copilot instructions for this repo

Note: Vietnamese translation available at `.github/copilot-instructions.vi.md`.

Purpose: Give an AI agent the minimal, actionable knowledge needed to make safe, consistent edits in this Expo / React Native + Expo Router codebase.

Quick start (developer workflows)
- Install: `npm install`.
- Start dev server: `npm run start` (alias: `npx expo start`).
- Run on device/emulator:
  - Android: `npm run android`
  - iOS: `npm run ios`
  - Web: `npm run web`
- Lint: `npm run lint` (uses `eslint-config-expo`).
- Reset starter app: `npm run reset-project` (moves existing /app into `/app-example` or deletes based on prompt).

Big-picture architecture
- Expo + React Native app using Expo Router (file-based routing). Primary app code lives in `/app`.
- Global app wiring is in `app/_layout.tsx`:
  - ThemeProvider (react-navigation theme) wraps the app
  - `AuthProvider` and `CartProvider` are mounted here
  - `unstable_settings.anchor` sets the default route anchor to `(tabs)`
- UI: small presentational primitives live under `components/` and `components/*` (account, etc.). Reusable UI controls live under `components/ui/` and `ui/`.
- State: `contexts/` holds app state (`AuthContext.tsx`, `CartContext.tsx`).
- Services: `services/` contains API wrappers (`api.ts`, `auth.service.ts`, `product.service.ts`).
- Constants & types: `constants/` and `types/` hold shared values and type definitions.

Project-specific conventions and gotchas
- Routing: Add pages by adding files under `app/` (e.g., `app/(auth)/login.tsx` already shows the pattern). Use folder groups `()` for route grouping (e.g., `(auth)`, `(tabs)`).
- Theme: Use `useThemeColor` and `ThemedText`/`ThemedView` components. Colors are defined in `constants/theme.ts`.
- TypeScript config: `tsconfig.json` sets `strict: true` and path alias `@/*` → root. Use `@/` imports for project files.
- Auth token handling: `AuthContext.tsx` stores tokens in AsyncStorage under `@app_token` and user under `@app_user`. It also sets `globalThis.authToken` for `services/api.ts` to pick up automatically—when editing auth flows update both the context and the axios interceptor.
- Axios client: `services/api.ts` creates a shared axios instance with a 10s timeout and interceptors that:
  - Add `Authorization: Bearer <token>` from `globalThis.authToken`
  - Normalize timeout and network error messages (see code comments)
- Cart persistence: `CartContext.tsx` uses `@app_cart` to persist cart state and normalizes `image` to `{ uri }` for storage compatibility—follow the normalization when working with images.
- Logging style: code uses `console.log` / `console.warn` for quick debugging (e.g., auth/signup responses). Prefer non-invasive logging and avoid committing secrets.

Integration points & external dependencies
- API base URL: changeable at `constants/api.ts` (currently points to a Railway deployment).
- Expo native features used: `expo-image`, `expo-haptics`, `expo-image-picker`, `expo-splash-screen`, etc. When adding native modules, follow Expo docs to add them to `app.json` and ensure SDK compatibility.

Testing & debugging notes
- There is no automated test suite; manual testing via Expo dev tools and device/emulator is expected.
- Use `npx expo start` and the web UI to open Metro and device logs. Inspect console output for axios warnings and the custom error messages added in `services/api.ts`.

Files to inspect for common tasks (quick references)
- App entry & wiring: `app/_layout.tsx` (theme + providers)
- Routes: `app/(auth)/`, `app/(tabs)/`, `app/*.tsx` (file-based routing examples)
- Auth flows: `contexts/AuthContext.tsx`, `services/auth.service.ts`
- API client: `services/api.ts`, `constants/api.ts`
- Cart & local persistence: `contexts/CartContext.tsx`
- Theming & UI primitives: `components/themed-text.tsx`, `components/themed-view.tsx`, `hooks/use-theme-color.ts`
- Scripts: `scripts/reset-project.js` (project reset behavior)

PR guidelines for AI edits (short)
- Keep changes small and focused; add tests or a manual verification step if behavior changes.
- Update `constants/api.ts`, `contexts/*`, and `services/*` consistently—e.g., altering auth token storage must update both context and axios interceptor.
- Use `@/` imports and preserve TypeScript `strict` typing (add types in `types/` if needed).

If something is unclear or you need more details about a specific area (routing, auth, API, or theming), ask and I’ll expand the relevant section or add code examples. Thanks — please review and tell me which sections you want me to expand or make stricter.