// Script to add Website Development service and portfolio items
const mongoose = require('mongoose')
require('dotenv').config()

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  imageUrl: String,
  websiteUrl: String,
  tags: [String],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
})

// Service Schema
const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  priceINR: mongoose.Schema.Types.Mixed,
  imageUrl: String,
  websiteUrl: String,
  features: [String],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)
const Service = mongoose.model('Service', serviceSchema)

// Website Development Service
const websiteService = {
  name: 'Website Development',
  description: 'Professional website design and development services. From landing pages to full-featured web applications, built with modern technologies and best practices for optimal performance and user experience.',
  priceINR: 15000,
  imageUrl: '', // Can be added later via admin panel
  websiteUrl: '', // Can be added later via admin panel
  features: [
    'Responsive Design',
    'Modern UI/UX',
    'SEO Optimized',
    'Fast Loading',
    'Mobile Friendly',
    'Custom Development'
  ],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

// Website Portfolio Items
const websiteProjects = [
  {
    title: 'Spark Soul - Spiritual Wellness Platform',
    description: 'A modern spiritual wellness platform featuring meditation guides, mindfulness resources, and personal growth tools. Built with React and modern UI/UX principles for an immersive user experience.',
    category: 'Websites',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop', // Placeholder - update via admin
    websiteUrl: 'https://spark-soul.vercel.app/',
    tags: ['Website', 'React', 'Wellness', 'Modern Design', 'Responsive'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'DogPetel - Pet Care & Services',
    description: 'Comprehensive pet care platform offering veterinary services, pet supplies, and care tips. Features include appointment booking, pet profiles, and community forums for pet lovers.',
    category: 'Websites',
    imageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop', // Placeholder - update via admin
    websiteUrl: 'https://dogpetel.vercel.app/',
    tags: ['Website', 'Pet Care', 'E-commerce', 'Community', 'Responsive'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

async function addWebsiteServiceAndPortfolio() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sourav-portfolio",
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    
    console.log('✅ Connected to MongoDB\n')
    
    // Add Website Development Service
    console.log('📦 Adding Website Development Service...')
    const existingService = await Service.findOne({ name: 'Website Development' })
    
    if (existingService) {
      await Service.findByIdAndUpdate(existingService._id, websiteService)
      console.log('✅ Updated: Website Development Service')
    } else {
      await Service.create(websiteService)
      console.log('✅ Added: Website Development Service')
    }
    console.log('   Price: ₹15,000 (Starting from)')
    console.log('   Features: 6 features included\n')
    
    // Add Website Portfolio Items
    console.log('🎨 Adding Website Portfolio Items...')
    for (const website of websiteProjects) {
      const existing = await Portfolio.findOne({ websiteUrl: website.websiteUrl })
      
      if (existing) {
        await Portfolio.findByIdAndUpdate(existing._id, website)
        console.log(`✅ Updated: ${website.title}`)
      } else {
        await Portfolio.create(website)
        console.log(`✅ Added: ${website.title}`)
      }
      console.log(`   URL: ${website.websiteUrl}`)
      console.log(`   Category: ${website.category}`)
      console.log(`   Tags: ${website.tags.join(', ')}\n`)
    }
    
    console.log('🎉 All items added successfully!\n')
    console.log('📝 Next Steps:')
    console.log('1. Login to Admin Dashboard')
    console.log('2. Go to Services tab')
    console.log('3. Edit "Website Development" to add image/website URL if needed')
    console.log('4. Go to Portfolio tab')
    console.log('5. Update images for both website projects:')
    console.log('   - Take screenshots of both websites')
    console.log('   - Upload via admin panel (📤 Upload Image)')
    console.log('   - Or use image URLs from Imgur/Cloudinary\n')
    
    console.log('✨ Your portfolio now showcases:')
    console.log('   • Website Development service (₹15,000+)')
    console.log('   • Spark Soul website project')
    console.log('   • DogPetel website project\n')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addWebsiteServiceAndPortfolio()
