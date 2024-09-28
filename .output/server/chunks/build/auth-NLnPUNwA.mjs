import { d as defineNuxtRouteMiddleware, e as executeAsync, u as useSupabaseUser, n as navigateTo } from './server.mjs';
import 'vue';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import './client.manifest.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import '@primevue/core/base/style';
import '@primeuix/styled';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'file:///Users/emmanuel/Desktop/TaskManagerV3/node_modules/.pnpm/@nuxt+vite-builder@3.13.2_vue@3.5.8/node_modules/@nuxt/vite-builder/dist/runtime/client.manifest.mjs';
import 'vue-router';
import 'stream';
import 'http';
import 'url';
import 'punycode';
import 'https';
import 'zlib';

const auth = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  const user = ([__temp, __restore] = executeAsync(() => useSupabaseUser()), __temp = await __temp, __restore(), __temp);
  console.log("Auth middleware running for path:", to.path);
  if (to.path.startsWith("/admin")) {
    console.log("Checking admin route access");
    if (!user) {
      console.log("User not authenticated, redirecting to login");
      return navigateTo("/login");
    }
    console.log("User authenticated, allowing access to admin route");
  }
  return;
});

export { auth as default };
//# sourceMappingURL=auth-NLnPUNwA.mjs.map
