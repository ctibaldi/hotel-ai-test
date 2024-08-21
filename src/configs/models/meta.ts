export interface Meta {
  meta_description?: string;
  meta_keywords?: string;
  meta_robots?: string;
  meta_canonical?: string;
  meta_alternate?: {
    es: string;
    en: string;
  };
  meta_verification?: string;
  meta_twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
}
