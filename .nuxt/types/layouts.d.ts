import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "admin" | "default" | "footer"
declare module "../../node_modules/.pnpm/nuxt@3.13.2_sass-embedded@1.79.4_vite@5.4.8/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}