import { createClient } from '@sanity/client'
import services from './src/data/services.js'

const client = createClient({
  projectId: '3xepbgz9',
  dataset: 'production',
  token: 'skz6eiJEKCwYPQuXBwpQ3fe2qfnhUhfqg5OYkoyKeAnDbmib0WX4jiVkTvpATNczjPeTAKIGWozTugni3IGDYVS34xI6hAenYOsaaPsMPbOEzlervLuGdcBoimHPWAMdTH3nb9Ej2PfNllj0Imt855Y5GcXrVJAT3W3WmwiF0GeQmu0TNZcq',
  useCdn: false,
  apiVersion: '2023-05-03',
})

async function migrate() {
  console.log('🚀 Starting migration of services to Sanity...')

  for (const service of services) {
    try {
      // Create the document in Sanity
      await client.create({
        _type: 'service',
        name: service.name,
        description: service.description,
        icon: service.icon,
        flexiblePricing: service.flexiblePricing || false,
        plans: service.plans.map(plan => ({
          _type: 'object', // Sanity arrays of objects often need the type specified
          name: plan.name,
          price: plan.price,
          popular: plan.popular || false,
          features: plan.features,
        })),
      })
      console.log(`✅ Uploaded: ${service.name}`)
    } catch (err) {
      console.error(`❌ Failed to upload ${service.name}:`, err)
    }
  }

  console.log('\n✨ All services have been migrated! Please check your Sanity Studio and your website.')
}

migrate()
