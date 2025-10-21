import { CodeTabs } from "E:/project/js/pangju-framework-doc/node_modules/.pnpm/@vuepress+plugin-markdown-t_c9c8d08a6d22644b015b6483a28b3aa5/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "E:/project/js/pangju-framework-doc/node_modules/.pnpm/@vuepress+plugin-markdown-t_c9c8d08a6d22644b015b6483a28b3aa5/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "E:/project/js/pangju-framework-doc/node_modules/.pnpm/@vuepress+plugin-markdown-t_c9c8d08a6d22644b015b6483a28b3aa5/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
