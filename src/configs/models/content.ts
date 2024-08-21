export interface Content {
  title?: string;
  description?: string;
  address?: {
    street?: string;
    number?: string;
    post_code?: string;
    city?: string;
    state?: string;
    country?: string;
    ltd?: string;
    lng?: string;
  };
  detail?: string;
  banner?: string;
  images?: string[];
}
