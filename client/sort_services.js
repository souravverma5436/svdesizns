import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3xepbgz9',
  dataset: 'production',
  token: 'skz6eiJEKCwYPQuXBwpQ3fe2qfnhUhfqg5OYkoyKeAnDbmib0WX4jiVkTvpATNczjPeTAKIGWozTugni3IGDYVS34xI6hAenYOsaaPsMPbOEzlervLuGdcBoimHPWAMdTH3nb9Ej2PfNllj0Imt855Y5GcXrVJAT3W3WmwiF0GeQmu0TNZcq',
  useCdn: false,
  apiVersion: '2023-05-03',
})

const orderMap = {
  'Logo Design': 1,
  'Branding': 2,
  'Social Media Design': 3,
  'Poster / Banner Design': 4,
  'Website Design': 5,
  'Complete Package': 6,
  'Reels Editing': 7,
  'Menu Design': 8,
  'YouTube Thumbnail Design': 9,
  'Landing Page Design': 10,
}

async function sortServices() {
  console.log('📦 Starting auto-sort of services...')

  try {
    const services = await client.fetch(`*[_type == "service"]`);

    for (const service of services) {
      const order = orderMap[service.name];
      if (order) {
        await client.patch(service._id).set({ sortOrder: order }).commit();
        console.log(`🔢 Sorted ${service.name} to position ${order}`);
      }
    }
    console.log('\n✨ All services have been sorted! Refresh your website to see the change.')
  } catch (err) {
    console.error('❌ Sorting failed:', err)
  }
}

sortServices()
