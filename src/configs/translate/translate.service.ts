import {lang} from './translate';

export const t = (key: string) => {
  if (lang && typeof window !== 'undefined') {
    const locale = localStorage?.getItem('lang')?.toUpperCase() || 'ES';
    if (lang[locale]) {
      if (lang[locale][key]) return lang[locale][key];
      else return key;
    } else {
      if (lang['EN'][key]) return lang['EN'][key];
      else return key;
    }
  } else {
    return key;
  }
};
