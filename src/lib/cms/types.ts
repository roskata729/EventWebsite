export type CmsService = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  benefits: string[];
};

export type CmsEvent = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
};

export type CmsGalleryItem = {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
};
