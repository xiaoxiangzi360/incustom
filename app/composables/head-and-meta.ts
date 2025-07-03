import siteMeta from '@/site'
import { heroImageUrl } from '@/utils/hero'
import { fontUrls } from '@/utils/font'
import checkDarkTheme from '@/composables/dark-color-scheme-check?raw'

export const useHeadAndMeta = (pageMeta: any) => {
  const {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    generator: siteGenerator,
    author,
    twitter,
    titleSeparator,
  } = siteMeta

  const link: any = [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.ico',
    },
  ]

  const noscript: any = []

  const canonicalUrl = pageMeta.canonicalUrl || siteUrl
  if (canonicalUrl) {
    link.push({ rel: 'canonical', href: canonicalUrl.href })
  }

  if (fontUrls.length) {
    const googleapis = 'https://fonts.googleapis.com'
    const gstatic = 'https://fonts.gstatic.com'
    link.push(
      { rel: 'dns-prefetch', href: googleapis },
      { rel: 'dns-prefetch', href: gstatic },
      { rel: 'preconnect', crossorigin: 'anonymous', href: googleapis },
      { rel: 'preconnect', crossorigin: 'anonymous', href: gstatic },
      {
        rel: 'preload',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'",
        href: fontUrls.toString(),
      },
    )
    noscript.push(
      `<link rel="stylesheet" crossorigin="anonymous" href="${fontUrls.toString()}" />`,
    )
  }

  const title = pageMeta.title
    ? `${pageMeta.title} ${titleSeparator} ${siteTitle}`
    : siteTitle

  const description = pageMeta.description || siteDescription
  const generator = pageMeta.generator || siteGenerator
  const keywords = pageMeta.tags?.toString()

  let siteOgImage: string = siteUrl

  try {
    siteOgImage = new URL(siteMeta.ogImageUrl, siteUrl).href
  } catch (err) {
    // console.log(err)
  }

  const ogImage = pageMeta.ogImage || siteOgImage || heroImageUrl

  if (ogImage?.src) {
    ogImage.url = ogImage.src
    delete ogImage.src
  }

  // 此处你可以选择使用 Nuxt 原生 head 配置（或 vue-meta）
  // 示例使用 return 方式暴露 meta 内容，由页面决定是否注册：
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'author', content: author },
      { name: 'generator', content: generator },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: ogImage.url || ogImage },
      { property: 'og:url', content: canonicalUrl.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage.url || ogImage },
      { name: 'twitter:image:alt', content: title },
      { name: 'twitter:site', content: twitter },
      { name: 'twitter:creator', content: '@techakayy' },
    ],
    link,
    noscript,
    htmlAttrs: { lang: 'en-US' },
    script: [{ innerHTML: checkDarkTheme }],
  }
}
