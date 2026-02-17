#!/usr/bin/env node

// Script to add comprehensive design projects across all categories
const mongoose = require('mongoose')
require('dotenv').config()

async function addAllDesignProjects() {
  try {
    console.log('🎨 Adding Comprehensive Design Portfolio\n')
    
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sourav-portfolio"
    })
    console.log('✅ Connected!\n')
    
    // Define schema
    const Portfolio = mongoose.model('Portfolio', new mongoose.Schema({}, { strict: false }))
    
    // All design projects
    const allProjects = [
      // Logo Design Projects
      {
        title: 'Tech Startup Logo',
        description: 'Modern and minimalist logo design for a technology startup. Features clean lines and contemporary typography.',
        category: 'Logo Design',
        imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
        tags: ['Logo', 'Tech', 'Startup', 'Modern', 'Minimalist'],
        isActive: true
      },
      {
        title: 'Coffee Shop Logo',
        description: 'Warm and inviting logo for a local coffee shop. Combines coffee imagery with elegant typography.',
        category: 'Logo Design',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
        tags: ['Logo', 'Coffee', 'Food & Beverage', 'Warm', 'Elegant'],
        isActive: true
      },
      {
        title: 'Fitness Brand Logo',
        description: 'Dynamic and energetic logo for a fitness brand. Bold design that conveys strength and movement.',
        category: 'Logo Design',
        imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop',
        tags: ['Logo', 'Fitness', 'Sports', 'Dynamic', 'Bold'],
        isActive: true
      },
      
      // Branding Projects
      {
        title: 'Restaurant Brand Identity',
        description: 'Complete brand identity for a premium restaurant including logo, menu design, and brand guidelines.',
        category: 'Branding',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
        tags: ['Branding', 'Restaurant', 'Identity', 'Premium', 'Food'],
        isActive: true
      },
      {
        title: 'Boutique Fashion Branding',
        description: 'Elegant brand identity for a boutique fashion store. Sophisticated design with luxury appeal.',
        category: 'Branding',
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
        tags: ['Branding', 'Fashion', 'Boutique', 'Luxury', 'Elegant'],
        isActive: true
      },
      {
        title: 'Eco-Friendly Brand',
        description: 'Sustainable brand identity for an eco-friendly product line. Natural colors and organic design elements.',
        category: 'Branding',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
        tags: ['Branding', 'Eco-Friendly', 'Sustainable', 'Natural', 'Organic'],
        isActive: true
      },
      
      // Social Media Creatives
      {
        title: 'Instagram Feed Design',
        description: 'Cohesive Instagram feed design for a lifestyle brand. Consistent aesthetic with engaging visuals.',
        category: 'Social Media Creatives',
        imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop',
        tags: ['Social Media', 'Instagram', 'Feed Design', 'Lifestyle', 'Aesthetic'],
        isActive: true
      },
      {
        title: 'Facebook Ad Campaign',
        description: 'Eye-catching Facebook ad designs for an e-commerce brand. Optimized for conversions.',
        category: 'Social Media Creatives',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
        tags: ['Social Media', 'Facebook', 'Ads', 'E-commerce', 'Campaign'],
        isActive: true
      },
      {
        title: 'LinkedIn Professional Graphics',
        description: 'Professional graphics for LinkedIn business page. Corporate design with modern touch.',
        category: 'Social Media Creatives',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        tags: ['Social Media', 'LinkedIn', 'Professional', 'Business', 'Corporate'],
        isActive: true
      },
      {
        title: 'Twitter Header Designs',
        description: 'Creative Twitter header designs for personal brand. Bold and attention-grabbing.',
        category: 'Social Media Creatives',
        imageUrl: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop',
        tags: ['Social Media', 'Twitter', 'Header', 'Personal Brand', 'Creative'],
        isActive: true
      },
      
      // Posters & Ads (Additional)
      {
        title: 'Concert Event Poster',
        description: 'Bold and vibrant poster for a live concert event. Features dynamic typography and energetic colors.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
        tags: ['Poster', 'Concert', 'Event', 'Music', 'Vibrant'],
        isActive: true
      },
      {
        title: 'Business Conference Ad',
        description: 'Professional advertisement for a business conference. Clean design with corporate appeal.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
        tags: ['Advertisement', 'Business', 'Conference', 'Professional', 'Corporate'],
        isActive: true
      },
      {
        title: 'Summer Sale Poster',
        description: 'Bright and cheerful poster for a summer sale event. Attracts attention with bold colors.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
        tags: ['Poster', 'Sale', 'Summer', 'Retail', 'Colorful'],
        isActive: true
      },
      {
        title: 'Movie Premiere Poster',
        description: 'Cinematic poster design for a movie premiere. Dramatic imagery with compelling typography.',
        category: 'Posters & Ads',
        imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
        tags: ['Poster', 'Movie', 'Cinema', 'Premiere', 'Dramatic'],
        isActive: true
      }
    ]
    
    console.log('📋 Adding design projects across all categories...\n')
    
    let addedCount = 0
    let updatedCount = 0
    
    for (const project of allProjects) {
      const existing = await Portfolio.findOne({ 
        title: project.title,
        category: project.category
      })
      
      if (existing) {
        await Portfolio.findByIdAndUpdate(existing._id, {
          ...project,
          createdAt: existing.createdAt,
          updatedAt: new Date()
        })
        console.log(`✅ Updated: ${project.title}`)
        updatedCount++
      } else {
        await Portfolio.create({
          ...project,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        console.log(`✅ Added: ${project.title}`)
        addedCount++
      }
    }
    
    console.log('\n🎉 SUCCESS! All design projects processed.\n')
    console.log('📊 Summary:')
    console.log(`   • ${addedCount} new projects added`)
    console.log(`   • ${updatedCount} existing projects updated`)
    console.log('   • Logo Design: 3 projects')
    console.log('   • Branding: 3 projects')
    console.log('   • Social Media Creatives: 4 projects')
    console.log('   • Posters & Ads: 4 projects')
    console.log('\n💡 All projects have placeholder images from Unsplash')
    console.log('   You can update them via Admin Dashboard:\n')
    console.log('   1. Login to admin panel')
    console.log('   2. Go to Portfolio tab')
    console.log('   3. Click Edit on any project')
    console.log('   4. Upload new image or paste image URL')
    console.log('   5. Click Update\n')
    console.log('🌐 Visit your portfolio to see all projects!')
    console.log('   Portfolio: http://localhost:5173/portfolio')
    console.log('   Click "All Projects" to see everything\n')
    
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

addAllDesignProjects()
