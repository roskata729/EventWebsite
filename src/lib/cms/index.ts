import type { CmsEvent, CmsGalleryItem, CmsService } from "@/lib/cms/types";
import { getPublishedCmsEvents, getPublishedCmsGallery, getPublishedCmsServices } from "@/lib/cms/strapi";

export async function loadPublishedServices(fallback: CmsService[]) {
  try {
    const services = await getPublishedCmsServices();
    return services.length > 0 ? services : fallback;
  } catch {
    return fallback;
  }
}

export async function loadPublishedEvents(fallback: CmsEvent[]) {
  try {
    const events = await getPublishedCmsEvents();
    return events.length > 0 ? events : fallback;
  } catch {
    return fallback;
  }
}

export async function loadPublishedGallery(fallback: CmsGalleryItem[]) {
  try {
    const gallery = await getPublishedCmsGallery();
    return gallery.length > 0 ? gallery : fallback;
  } catch {
    return fallback;
  }
}

export type { CmsEvent, CmsGalleryItem, CmsService };
