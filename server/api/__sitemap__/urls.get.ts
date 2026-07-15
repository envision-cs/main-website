import { getDynamicSitemapUrls } from '~~/server/utils/sitemap-urls';

export default defineSitemapEventHandler(async () => {
  return getDynamicSitemapUrls();
});
