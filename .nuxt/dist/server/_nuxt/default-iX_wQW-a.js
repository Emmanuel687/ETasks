import { _ as __nuxt_component_0 } from "./nuxt-link-CDkZyxTT.js";
import { useSSRContext, computed, withCtx, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { u as useSupabaseUser, a as useRouter } from "../server.mjs";
import { u as useSupabaseClient } from "./useSupabaseClient-CLhyLLEJ.js";
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
import "vue-router";
import "radix3";
import "stream";
import "http";
import "url";
import "punycode";
import "https";
import "zlib";
import "devalue";
const _sfc_main$1 = {
  __name: "WebsiteNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    const userState = computed(() => user.value);
    useSupabaseClient();
    useRouter();
    console.log("WebsiteNavbar component loaded");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About`);
          } else {
            return [
              createTextVNode("About")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!userState.value) {
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login`);
            } else {
              return [
                createTextVNode("Login")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!userState.value) {
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/signup" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sign Up`);
            } else {
              return [
                createTextVNode("Sign Up")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (userState.value) {
        _push(`<a>Logout</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/website/WebsiteNavbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    console.log("Default layout loaded");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_WebsiteNavbar = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_WebsiteNavbar, null, null, _parent));
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-iX_wQW-a.js.map
