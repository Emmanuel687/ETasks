import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<h1${ssrRenderAttrs(mergeProps({ class: "text-3xl font-bold underline" }, _attrs))}> Main landing Page </h1>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-CqgXlmHg.mjs.map