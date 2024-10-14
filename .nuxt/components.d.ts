
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
interface _GlobalComponents {
      'CustomInputContainer': typeof import("../components/Custom/InputContainer.vue")['default']
    'CustomQuill': typeof import("../components/Custom/Quill.vue")['default']
    'SearchMain': typeof import("../components/Search/Main.vue")['default']
    'SearchSimple': typeof import("../components/Search/Simple.vue")['default']
    'AdminSidebar': typeof import("../components/admin/AdminSidebar.vue")['default']
    'AdminDashboardAllTasks': typeof import("../components/admin/dashboard/AllTasks.vue")['default']
    'AdminDashboardCompletedTasks': typeof import("../components/admin/dashboard/CompletedTasks.vue")['default']
    'AdminDashboardPendingTasks': typeof import("../components/admin/dashboard/PendingTasks.vue")['default']
    'AdminDashboardChartsAnalytics': typeof import("../components/admin/dashboard/charts/Analytics.vue")['default']
    'AdminTasksCreateTask': typeof import("../components/admin/tasks/CreateTask.vue")['default']
    'AdminTasksEditTask': typeof import("../components/admin/tasks/EditTask.vue")['default']
    'AdminTasks': typeof import("../components/admin/tasks/index.vue")['default']
    'WebsiteNavbar': typeof import("../components/website/WebsiteNavbar.vue")['default']
    'WebsiteFaq': typeof import("../components/website/faq.vue")['default']
    'WebsiteFeatures': typeof import("../components/website/features.vue")['default']
    'WebsiteForm': typeof import("../components/website/form.vue")['default']
    'WebsiteOverview': typeof import("../components/website/overview.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyCustomInputContainer': typeof import("../components/Custom/InputContainer.vue")['default']
    'LazyCustomQuill': typeof import("../components/Custom/Quill.vue")['default']
    'LazySearchMain': typeof import("../components/Search/Main.vue")['default']
    'LazySearchSimple': typeof import("../components/Search/Simple.vue")['default']
    'LazyAdminSidebar': typeof import("../components/admin/AdminSidebar.vue")['default']
    'LazyAdminDashboardAllTasks': typeof import("../components/admin/dashboard/AllTasks.vue")['default']
    'LazyAdminDashboardCompletedTasks': typeof import("../components/admin/dashboard/CompletedTasks.vue")['default']
    'LazyAdminDashboardPendingTasks': typeof import("../components/admin/dashboard/PendingTasks.vue")['default']
    'LazyAdminDashboardChartsAnalytics': typeof import("../components/admin/dashboard/charts/Analytics.vue")['default']
    'LazyAdminTasksCreateTask': typeof import("../components/admin/tasks/CreateTask.vue")['default']
    'LazyAdminTasksEditTask': typeof import("../components/admin/tasks/EditTask.vue")['default']
    'LazyAdminTasks': typeof import("../components/admin/tasks/index.vue")['default']
    'LazyWebsiteNavbar': typeof import("../components/website/WebsiteNavbar.vue")['default']
    'LazyWebsiteFaq': typeof import("../components/website/faq.vue")['default']
    'LazyWebsiteFeatures': typeof import("../components/website/features.vue")['default']
    'LazyWebsiteForm': typeof import("../components/website/form.vue")['default']
    'LazyWebsiteOverview': typeof import("../components/website/overview.vue")['default']
    'LazyNuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'LazyNuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'LazyNuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'LazyClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/client-only")['default']
    'LazyDevOnly': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/dev-only")['default']
    'LazyServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'LazyNuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'LazyNuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'LazyNuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'LazyNuxtImg': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'LazyNuxtPicture': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'LazyNuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/pages/runtime/page")['default']
    'LazyNoScript': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'LazyLink': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Link']
    'LazyBase': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Base']
    'LazyTitle': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Title']
    'LazyMeta': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'LazyStyle': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Style']
    'LazyHead': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Head']
    'LazyHtml': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Html']
    'LazyBody': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Body']
    'LazyNuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'LazyNuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const CustomInputContainer: typeof import("../components/Custom/InputContainer.vue")['default']
export const CustomQuill: typeof import("../components/Custom/Quill.vue")['default']
export const SearchMain: typeof import("../components/Search/Main.vue")['default']
export const SearchSimple: typeof import("../components/Search/Simple.vue")['default']
export const AdminSidebar: typeof import("../components/admin/AdminSidebar.vue")['default']
export const AdminDashboardAllTasks: typeof import("../components/admin/dashboard/AllTasks.vue")['default']
export const AdminDashboardCompletedTasks: typeof import("../components/admin/dashboard/CompletedTasks.vue")['default']
export const AdminDashboardPendingTasks: typeof import("../components/admin/dashboard/PendingTasks.vue")['default']
export const AdminDashboardChartsAnalytics: typeof import("../components/admin/dashboard/charts/Analytics.vue")['default']
export const AdminTasksCreateTask: typeof import("../components/admin/tasks/CreateTask.vue")['default']
export const AdminTasksEditTask: typeof import("../components/admin/tasks/EditTask.vue")['default']
export const AdminTasks: typeof import("../components/admin/tasks/index.vue")['default']
export const WebsiteNavbar: typeof import("../components/website/WebsiteNavbar.vue")['default']
export const WebsiteFaq: typeof import("../components/website/faq.vue")['default']
export const WebsiteFeatures: typeof import("../components/website/features.vue")['default']
export const WebsiteForm: typeof import("../components/website/form.vue")['default']
export const WebsiteOverview: typeof import("../components/website/overview.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyCustomInputContainer: typeof import("../components/Custom/InputContainer.vue")['default']
export const LazyCustomQuill: typeof import("../components/Custom/Quill.vue")['default']
export const LazySearchMain: typeof import("../components/Search/Main.vue")['default']
export const LazySearchSimple: typeof import("../components/Search/Simple.vue")['default']
export const LazyAdminSidebar: typeof import("../components/admin/AdminSidebar.vue")['default']
export const LazyAdminDashboardAllTasks: typeof import("../components/admin/dashboard/AllTasks.vue")['default']
export const LazyAdminDashboardCompletedTasks: typeof import("../components/admin/dashboard/CompletedTasks.vue")['default']
export const LazyAdminDashboardPendingTasks: typeof import("../components/admin/dashboard/PendingTasks.vue")['default']
export const LazyAdminDashboardChartsAnalytics: typeof import("../components/admin/dashboard/charts/Analytics.vue")['default']
export const LazyAdminTasksCreateTask: typeof import("../components/admin/tasks/CreateTask.vue")['default']
export const LazyAdminTasksEditTask: typeof import("../components/admin/tasks/EditTask.vue")['default']
export const LazyAdminTasks: typeof import("../components/admin/tasks/index.vue")['default']
export const LazyWebsiteNavbar: typeof import("../components/website/WebsiteNavbar.vue")['default']
export const LazyWebsiteFaq: typeof import("../components/website/faq.vue")['default']
export const LazyWebsiteFeatures: typeof import("../components/website/features.vue")['default']
export const LazyWebsiteForm: typeof import("../components/website/form.vue")['default']
export const LazyWebsiteOverview: typeof import("../components/website/overview.vue")['default']
export const LazyNuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const LazyNuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const LazyNuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const LazyClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/client-only")['default']
export const LazyDevOnly: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/dev-only")['default']
export const LazyServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyNuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const LazyNuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const LazyNuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const LazyNuxtImg: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const LazyNuxtPicture: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const LazyNuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/pages/runtime/page")['default']
export const LazyNoScript: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const LazyLink: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Link']
export const LazyBase: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Base']
export const LazyTitle: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Title']
export const LazyMeta: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const LazyStyle: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Style']
export const LazyHead: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Head']
export const LazyHtml: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Html']
export const LazyBody: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/head/runtime/components")['Body']
export const LazyNuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyNuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.13.2_sass@1.79.4_vite@5.4.8/node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
