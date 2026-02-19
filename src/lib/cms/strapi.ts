import { z } from "zod";
import type { CmsEvent, CmsGalleryItem, CmsService } from "@/lib/cms/types";

const strapiResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(
      z.object({
        id: z.number(),
        attributes: itemSchema,
      }),
    ),
  });

const serviceAttributesSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().default(""),
  imageUrl: z.string().url(),
  benefits: z.array(z.string()).default([]),
});

const eventAttributesSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.string().default("Общо"),
  description: z.string().default(""),
  imageUrl: z.string().url(),
});

const galleryAttributesSchema = z.object({
  title: z.string(),
  category: z.string().default("Общо"),
  description: z.string().default(""),
  imageUrl: z.string().url(),
});

function getCmsConfig() {
  const baseUrl = process.env.CMS_BASE_URL;

  if (!baseUrl) {
    return null;
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    token: process.env.CMS_API_TOKEN,
  };
}

async function strapiFetch<T>(path: string, schema: z.ZodType<{ data: T }>): Promise<T> {
  const config = getCmsConfig();

  if (!config) {
    throw new Error("CMS_BASE_URL is not configured.");
  }

  const response = await fetch(`${config.baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
    },
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status}`);
  }

  const payload = await response.json();
  const parsed = schema.parse(payload);

  return parsed.data;
}

export async function getPublishedCmsServices(): Promise<CmsService[]> {
  const data = await strapiFetch(
    "/api/services?filters[publishedAt][$notNull]=true&sort=name:asc",
    strapiResponseSchema(serviceAttributesSchema),
  );

  return data.map((item) => ({
    id: item.id,
    ...item.attributes,
  }));
}

export async function getPublishedCmsEvents(): Promise<CmsEvent[]> {
  const data = await strapiFetch(
    "/api/events?filters[publishedAt][$notNull]=true&sort=title:asc",
    strapiResponseSchema(eventAttributesSchema),
  );

  return data.map((item) => ({
    id: item.id,
    ...item.attributes,
  }));
}

export async function getPublishedCmsGallery(): Promise<CmsGalleryItem[]> {
  const data = await strapiFetch(
    "/api/gallery-items?filters[publishedAt][$notNull]=true&sort=title:asc",
    strapiResponseSchema(galleryAttributesSchema),
  );

  return data.map((item) => ({
    id: item.id,
    ...item.attributes,
  }));
}
