import { d as defineNuxtRouteMiddleware, e as executeAsync, u as useSupabaseUser, n as navigateTo } from "../server.mjs";
import "vue";
import "node:http";
import "node:https";
import "node:zlib";
import "node:stream";
import "node:buffer";
import "node:util";
import "node:url";
import "node:net";
import "node:fs";
import "node:path";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "vue-router";
import "radix3";
import "stream";
import "http";
import "url";
import "punycode";
import "https";
import "zlib";
import "devalue";
import "vue/server-renderer";
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
export {
  auth as default
};
//# sourceMappingURL=auth-NLnPUNwA.js.map
