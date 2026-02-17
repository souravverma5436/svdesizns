#!/usr/bin/env node

// Quick script to add website service and portfolio items
const mongoose = require('mongoose')
require('dotenv').config()

async function quickAdd() {
  try {
    console.log('🚀 Quick Add: Website Service & Portfolio Items\n')
    
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sourav-portfolio"
    })
    console.log('✅ Connected!\n')
    
    // Define schemas
    const Portfolio = mongoose.model('Portfolio', new mongoose.Schema({}, { strict: false }))
    const Service = mongoose.model('Service', new mongoose.Schema({}, { strict: false }))
    
    // Add Website Development Service
    console.log('💼 Adding Website Development Service...')
    const service = await Service.findOneAndUpdate(
      { name: 'Website Development' },
      {
        name: 'Website Development',
        description: 'Professional website design and development services. From landing pages to full-featured web applications, built with modern technologies and best practices for optimal performance and user experience.',
        priceINR: 15000,
        features: ['Responsive Design', 'Modern UI/UX', 'SEO Optimized', 'Fast Loading', 'Mobile Friendly', 'Custom Development'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    )
    console.log('✅ Service added: Website Development (₹15,000)\n')
    
    // Add Spark Soul
    console.log('🌟 Adding Spark Soul website...')
    await Portfolio.findOneAndUpdate(
      { websiteUrl: 'https://spark-soul.vercel.app/' },
      {
        title: 'Spark Soul - Spiritual Wellness Platform',
        description: 'A modern spiritual wellness platform featuring meditation guides, mindfulness resources, and personal growth tools. Built with React and modern UI/UX principles for an immersive user experience.',
        category: 'Websites',
        imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
        websiteUrl: 'https://spark-soul.vercel.app/',
        tags: ['Website', 'React', 'Wellness', 'Modern Design', 'Responsive'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    )
    console.log('✅ Added: Spark Soul\n')
    
    // Add DogPetel
    console.log('🐕 Adding DogPetel website...')
    await Portfolio.findOneAndUpdate(
      { websiteUrl: 'https://dogpetel.vercel.app/' },
      {
        title: 'DogPetel - Pet Care & Services',
        description: 'Comprehensive pet care platform offering veterinary services, pet supplies, and care tips. Features include appointment booking, pet profiles, and community forums for pet lovers.',
        category: 'Websites',
        imageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop',
        websiteUrl: 'https://dogpetel.vercel.app/',
        tags: ['Website', 'Pet Care', 'E-commerce', 'Community', 'Responsive'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    )
    console.log('✅ Added: DogPetel\n')
    
    console.log('🎉 SUCCESS! All items added to database.\n')
    console.log('📝 What was added:')
    console.log('   • Website Development service (₹15,000)')
    console.log('   • Spark Soul website project')
    console.log('   • DogPetel website project\n')
    console.log('🌐 Visit your portfolio to see the changes!')
    console.log('   Frontend: https://svfiles.netlify.app/portfolio\n')
    
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error('\n💡 Make sure:')
    console.error('   1. MongoDB connection string is correct in .env')
    console.error('   2. You have internet connection')
    console.error('   3. MongoDB Atlas allows your IP address\n')
    process.exit(1)
  }
}

quickAdd()
