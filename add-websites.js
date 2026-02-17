// Script to add website portfolio items
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

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

const websiteProjects = [
  {
    title: 'Spark Soul - Spiritual Wellness Platform',
    description: 'A modern spiritual wellness platform featuring meditation guides, mindfulness resources, and personal growth tools. Built with React and modern UI/UX principles for an immersive user experience.',
    category: 'Websites',
    imageUrl: 'https://i.imgur.com/spark-soul-preview.jpg', // You'll need to upload actual screenshot
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
    imageUrl: 'https://i.imgur.com/dogpetel-preview.jpg', // You'll need to upload actual screenshot
    websiteUrl: 'https://dogpetel.vercel.app/',
    tags: ['Website', 'Pet Care', 'E-commerce', 'Community', 'Responsive'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

async function addWebsites() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sourav-portfolio",
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    
    console.log('✅ Connected to MongoDB')
    
    // Check if websites already exist
    for (const website of websiteProjects) {
      const existing = await Portfolio.findOne({ websiteUrl: website.websiteUrl })
      
      if (existing) {
        console.log(`⚠️  Website already exists: ${website.title}`)
        // Update it
        await Portfolio.findByIdAndUpdate(existing._id, website)
        console.log(`✅ Updated: ${website.title}`)
      } else {
        // Create new
        await Portfolio.create(website)
        console.log(`✅ Added: ${website.title}`)
      }
    }
    
    console.log('\n🎉 All websites added successfully!')
    console.log('\n📝 Note: Please update the imageUrl fields with actual screenshots:')
    console.log('1. Take screenshots of both websites')
    console.log('2. Upload to Imgur or Cloudinary')
    console.log('3. Update via Admin Dashboard')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addWebsites()
