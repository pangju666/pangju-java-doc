import { GitContributors } from "E:/project/js/pangju-framework-doc/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_0cdfdcc79a43ffcb5f9c2fd41033eca4/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "E:/project/js/pangju-framework-doc/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_0cdfdcc79a43ffcb5f9c2fd41033eca4/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
