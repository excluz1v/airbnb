import qs from 'qs';

export default function extractCityFromURL(url: string) {
  const paramObj = qs.parse(url, {
    ignoreQueryPrefix: true,
    parameterLimit: 1,
    depth: 0,
  });
  const cityParam = paramObj.city;
  if (typeof cityParam === 'string') return cityParam;
  return '';
}
