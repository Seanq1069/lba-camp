import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset, apiVersion } from './env';

export const hasSanity = Boolean(projectId);

export const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: any): string | null {
  if (!builder || !source?.asset) return null;
  return builder.image(source).width(800).url();
}
