import envConfig from '@/configs/environments';
const langs = ['es', 'en', 'fr', 'it', 'pt', 'de'];
import fs from 'fs';

const Sitemap = () => {
  return null;
};

Sitemap.getInitialProps = async () => {
  const domain = `com-${envConfig.portal}.com`;
  // const domain = 'localhost:3000';
  const HTTP: any = 'https';
  const robotsSitemaps = [];
  const output: string = 'out';

  /** Fetch to get hotels sitemaps */
  const sitemaps: any = await (
    await fetch(`${envConfig.api}hotel/sitemap?location=${envConfig.portal}`)
  ).json();

  robotsSitemaps.push({
    domain: `${HTTP}://${domain}`,
    sitemap: `global-sitemap.xml`,
  });

  /** * Generate a particular sitemap for sites */
  for (const site of sitemaps.payload) {
    const sites = [];
    const images = site.images?.map(
      (i: any) =>
        `<image:image> <image:loc>${HTTP}://${site.code}.${domain}/image/img.html?=${i}.jpg</image:loc></image:image>`,
    );
    for (const lang of langs) {
      sites.push(`
        <url>
          <loc>${HTTP}://${site.code}.${domain}/${lang}/</loc>
          <lastmod>${site.updatedAt?.slice(0, 10)}</lastmod>
          <changefreq>weekly</changefreq>
          ${images}
        </url>`);
    }
    const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${sites}
      </urlset>
    `;
    robotsSitemaps.push({
      domain: `${HTTP}://${site.code}.${domain}`,
      sitemap: `sitemaps/${site.code}-sitemap.xml`,
    });
    fs.writeFileSync(`${output}/sitemaps/${site.code}-sitemap.xml`, sitemap);
  }

  const globalSitemap: any = [];

  /** Generate the global sitemap */
  for (const site of sitemaps.payload) {
    globalSitemap.push(`
      <sitemap>
        <loc>${HTTP}://${site.code}.${domain}/sitemaps/${
      site.code
    }-sitemap.xml</loc>
        <lastmod>${site?.updatedAt?.slice(0, 10)}</lastmod>
      </sitemap>`);
  }

  const globalSitemapFile = `
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${globalSitemap}
    </sitemapindex>
  `;

  fs.writeFileSync(`${output}/global-sitemap.xml`, globalSitemapFile);

  /** Generate robot.txt */
  // const content = `User-agent: *
  // Disallow:

  //   ${robotsSitemaps
  //     .map((sitemap: any) => `Sitemap:${sitemap.domain}/${sitemap.sitemap}`)
  //     .join('\n')}`;

  // fs.writeFileSync('out/robots.txt', content);
  return {
    props: globalSitemapFile,
  };
};

export default Sitemap;
