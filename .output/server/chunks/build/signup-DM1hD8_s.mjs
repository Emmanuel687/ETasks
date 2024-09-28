import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { ref, useSSRContext } from 'vue';
import { u as useSupabaseClient } from './useSupabaseClient-CLhyLLEJ.mjs';
import './server.mjs';
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

const _sfc_main = {
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    useSupabaseClient();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Sign Up</h1><form><input${ssrRenderAttr("value", email.value)} type="email" placeholder="Email" required><input${ssrRenderAttr("value", password.value)} type="password" placeholder="Password" required><button type="submit">Sign Up</button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=signup-DM1hD8_s.mjs.map
