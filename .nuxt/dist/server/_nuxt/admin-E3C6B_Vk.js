import { _ as __nuxt_component_0 } from "./nuxt-link-CDkZyxTT.js";
import { useSSRContext, computed, mergeProps, withCtx, createVNode, createTextVNode, unref } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { u as useSupabaseClient } from "./useSupabaseClient-CLhyLLEJ.js";
import { u as useSupabaseUser, a as useRouter$1 } from "../server.mjs";
import "hookable";
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
import "unctx";
import "h3";
import "unhead";
import "radix3";
import "stream";
import "http";
import "url";
import "punycode";
import "https";
import "zlib";
import "devalue";
const _sfc_main$1 = {
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useSupabaseClient();
    computed(() => route.path.startsWith("/admin"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-white flex items-center space-x-2 px-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-2xl font-extrabold"${_scopeId}>Admin Panel</span>`);
          } else {
            return [
              createVNode("span", { class: "text-2xl font-extrabold" }, "Admin Panel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/users",
        class: "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Users `);
          } else {
            return [
              createTextVNode(" Users ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/settings",
        class: "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Settings `);
          } else {
            return [
              createTextVNode(" Settings ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button>Logout</button></nav></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    const router = useRouter$1();
    if (!user.value) {
      router.push("/login");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminSidebar = _sfc_main$1;
      if (unref(user)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_AdminSidebar, null, null, _parent));
        _push(`<main>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</main></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=admin-E3C6B_Vk.js.map
