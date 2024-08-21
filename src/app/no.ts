import envConfig from '@/configs/environments';
import {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  let arr: any = [];
  const res = async () => {
    const result: any = await fetch(`${envConfig.api}hotel/sitemap?location=${envConfig.portal}`);
    const data = result.payload;
    data.forEach((r: any) => {
      arr.push({
        url: `https://${r.code}.com-${envConfig.portal}.com/sitemap.xml`,
        lastModified: new Date(),
      });
    });
    console.log('\n\n', arr);
    return arr;
  };

  arr = res().then((res: any) => {
    return res;
  });

  return arr?.length > 0
    ? arr
    : [
        {
          url: `https://*.com-${envConfig.portal}.com`,
          lastModified: new Date(),
        },
        {
          url: `https://*.com-${envConfig.portal}.com/about`,
          lastModified: new Date(),
        },
        {
          url: `https://*.com-${envConfig.portal}.com/blog`,
          lastModified: new Date(),
        },
      ];
}
