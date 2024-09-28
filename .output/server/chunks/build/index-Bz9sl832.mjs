import { unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useSupabaseUser } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Admin Dashboard</h1><p>Welcome, ${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.email)}</p></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bz9sl832.mjs.map
