export const themeData = JSON.parse("{\"logo\":\"https://vuejs.press/images/hero.png\",\"navbar\":[{\"text\":\"生态\",\"children\":[{\"text\":\"依赖管理\",\"link\":\"https://github.com/pangju666/java-pangju-dependencies\"},{\"text\":\"工具库\",\"link\":\"https://github.com/pangju666/java-pangju-commonsjava-pangju-commons\"},{\"text\":\"框架\",\"link\":\"https://github.com/pangju666/java-pangju-commonsjava-pangju-framework\"},{\"text\":\"框架 Spring Boot Starter\",\"link\":\"https://github.com/pangju666/java-pangju-framework-spring-boot-starter\"}]},{\"text\":\"Github\",\"children\":[{\"text\":\"Pangju Dependencies\",\"link\":\"https://github.com/pangju666/java-pangju-dependencies\"},{\"text\":\"Pangju Commons\",\"link\":\"https://github.com/pangju666/java-pangju-commonsjava-pangju-commons\"},{\"text\":\"Pangju Framework\",\"link\":\"https://github.com/pangju666/java-pangju-commonsjava-pangju-framework\"},{\"text\":\"Pangju Framework Spring Boot Starter\",\"link\":\"https://github.com/pangju666/java-pangju-framework-spring-boot-starter\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"heading\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
