module.exports = function (eleventyConfig) {
  // The following copies to `_site/dist`
  eleventyConfig.setUseGitIgnore(false)
  eleventyConfig.addWatchTarget('dist')
  eleventyConfig.addPassthroughCopy('dist')
}
