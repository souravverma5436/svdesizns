#!/usr/bin/env node

// Script to add Poster & Ads portfolio projects
const mongoose = require('mongoose')
require('dotenv').config()

async function addPosterProjects() {
  try {
    console.log('🎨 Adding Poster & Ads Projects\n')
    
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sourav-portfolio"
    })
    console.log('✅ Connected!\n')
    
    // Define schema
    const Portfolio = mongoose.model('Portfolio', new mongoose.Schema({}, { strict: false }))
    
    // Poster & Ads projects
    const posterProjects = [
      {
        title: 'Music Festival Poster',
        description: 'Vibrant and energetic poster design for a summer music festival. Features bold typography, dynamic colors, and eye-catching graphics to attract attendees.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
        tags: ['Poster', 'Music', 'Festival', 'Event', 'Colorful'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Product Launch Advertisement',
        description: 'Professional advertisement design for a tech product launch. Clean layout with focus on product features and compelling call-to-action.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        tags: ['Advertisement', 'Product', 'Tech', 'Launch', 'Modern'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Food Festival Promotional Poster',
        description: 'Appetizing poster design for a local food festival. Showcases delicious food photography with warm colors and inviting typography.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        tags: ['Poster', 'Food', 'Festival', 'Event', 'Photography'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fitness Gym Advertisement',
        description: 'Motivational advertisement for a fitness gym. Bold design with strong imagery and inspiring message to attract new members.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
        tags: ['Advertisement', 'Fitness', 'Gym', 'Health', 'Motivation'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Real Estate Property Ad',
        description: 'Elegant advertisement for luxury real estate properties. Professional photography with sophisticated layout and premium feel.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        tags: ['Advertisement', 'Real Estate', 'Property', 'Luxury', 'Professional'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fashion Sale Poster',
        description: 'Stylish poster design for a fashion brand sale event. Modern typography with trendy colors and fashion-forward imagery.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
        tags: ['Poster', 'Fashion', 'Sale', 'Retail', 'Trendy'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    
    console.log('📋 Adding 6 Poster & Ads projects...\n')
    
    for (const project of posterProjects) {
      const existing = await Portfolio.findOne({ 
        title: project.title,
        category: 'Posters & Ads'
      })
      
      if (existing) {
        await Portfolio.findByIdAndUpdate(existing._id, project)
        console.log(`✅ Updated: ${project.title}`)
      } else {
        await Portfolio.create(project)
        console.log(`✅ Added: ${project.title}`)
      }
    }
    
    console.log('\n🎉 SUCCESS! All poster projects added to database.\n')
    console.log('📊 Summary:')
    console.log('   • 6 Poster & Ads projects added')
    console.log('   • Categories: Music, Product, Food, Fitness, Real Estate, Fashion')
    console.log('   • All with professional images from Unsplash\n')
    console.log('🌐 Visit your portfolio to see the changes!')
    console.log('   Portfolio: http://localhost:5173/portfolio')
    console.log('   Filter by: Posters & Ads\n')
    
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error('\n💡 Make sure:')
    console.error('   1. MongoDB connection string is correct in .env')
    console.error('   2. Backend server is running')
    console.error('   3. You have internet connection\n')
    process.exit(1)
  }
}

addPosterProjects()
