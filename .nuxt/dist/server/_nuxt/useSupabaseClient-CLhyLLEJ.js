import { f as useNuxtApp } from "../server.mjs";
const useSupabaseClient = () => {
  var _a;
  return (_a = useNuxtApp().$supabase) == null ? void 0 : _a.client;
};
export {
  useSupabaseClient as u
};
//# sourceMappingURL=useSupabaseClient-CLhyLLEJ.js.map
