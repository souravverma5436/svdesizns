import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '3xepbgz9', // <--- Your real Sanity Project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})