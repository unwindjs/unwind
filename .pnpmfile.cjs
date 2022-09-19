// See: https://github.com/facebook/docusaurus/issues/6724#issuecomment-1188794031
module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name != '@unwind/docs') {
        const deps = [
          "@algolia/client-search",
          "@docusaurus/core",
          "@docusaurus/preset-classic",
          "@docusaurus/theme-common",
          "@docusaurus/theme-live-codeblock",
          "@types/react",
        ]
        deps.forEach((p) => delete pkg.dependencies[p])
      }
      return pkg
    }
  }
}
