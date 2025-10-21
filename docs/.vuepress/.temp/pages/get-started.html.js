import comp from "E:/project/js/pangju-framework-doc/docs/.vuepress/.temp/pages/get-started.html.vue"
const data = JSON.parse("{\"path\":\"/get-started.html\",\"title\":\"Get Started\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Pages\",\"slug\":\"pages\",\"link\":\"#pages\",\"children\":[]},{\"level\":2,\"title\":\"Content\",\"slug\":\"content\",\"link\":\"#content\",\"children\":[]},{\"level\":2,\"title\":\"Configuration\",\"slug\":\"configuration\",\"link\":\"#configuration\",\"children\":[]},{\"level\":2,\"title\":\"Layouts and customization\",\"slug\":\"layouts-and-customization\",\"link\":\"#layouts-and-customization\",\"children\":[]}],\"git\":{\"updatedTime\":1761077692000,\"contributors\":[{\"name\":\"胖橘\",\"username\":\"\",\"email\":\"nullptr255@outlook.com\",\"commits\":1}],\"changelog\":[{\"hash\":\"40e9689929a54742ca3bce7f6b4ec3af95035b4d\",\"time\":1761077692000,\"email\":\"nullptr255@outlook.com\",\"author\":\"胖橘\",\"message\":\"初始化仓库\"}]},\"filePathRelative\":\"get-started.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
