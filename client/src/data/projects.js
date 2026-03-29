const projects = [
  // --- Real local images ---
  {
    id: 1,
    title: 'Business Card Design',
    category: 'Branding',
    description: 'Professional business card design with clean typography and modern layout for a client brand.',
    image: '/images/business-card.jpg',
    tags: ['Branding', 'Print', 'Photoshop']
  },
  {
    id: 2,
    title: 'Cake Crush – Brand Poster',
    category: 'Posters & Ads',
    description: 'Eye-catching promotional poster for Cake Crush bakery, featuring vibrant colors and appetizing visuals.',
    image: '/images/cake-crush.jpg',
    tags: ['Poster', 'Food', 'Advertising']
  },
  {
    id: 3,
    title: 'Sketch & Illustration',
    category: 'Branding',
    description: 'Hand-drawn illustration work showcasing artistic skills and creative expression.',
    image: '/images/drawing.jpg',
    tags: ['Illustration', 'Art', 'Sketch']
  },
  {
    id: 4,
    title: 'Gym Logo Design',
    category: 'Logo Design',
    description: 'Bold and energetic logo design for a fitness brand, conveying strength and motivation.',
    image: '/images/gym-logo.jpg',
    tags: ['Logo', 'Fitness', 'Branding']
  },
  {
    id: 5,
    title: 'Riya Tuition Classes',
    category: 'Branding',
    description: 'Complete branding package for an educational institute including logo and promotional materials.',
    image: '/images/riya-tuition.jpg',
    tags: ['Branding', 'Education', 'Logo']
  },
  {
    id: 6,
    title: 'RK Sports',
    category: 'Logo Design',
    description: 'Dynamic sports brand logo design with strong visual identity for RK Sports.',
    image: '/images/rk-sports.jpg',
    tags: ['Logo', 'Sports', 'Branding']
  },
  {
    id: 7,
    title: 'Creative Design Work',
    category: 'Social Media Creatives',
    description: 'Creative social media graphics and visual content for brand engagement.',
    image: '/images/1.jpg',
    tags: ['Social Media', 'Creative', 'Design']
  },
  // --- Website projects ---
  {
    id: 8,
    title: 'Spark Soul',
    category: 'Websites',
    description: 'Modern spiritual wellness platform built with React. Features a clean, calming UI with smooth animations, guided meditation sections, and an inspiring design that connects users to mindfulness and inner peace.',
    image: '/images/spark soul.webp',
    tags: ['Website', 'React', 'UI/UX'],
    websiteUrl: 'https://spark-soul.vercel.app/'
  },
  {
    id: 13,
    title: 'Shri Paramhans International',
    category: 'Websites',
    description: 'Professional website for Shri Paramhans International — a spiritual and cultural organization. The site features a serene design with information about their mission, events, and teachings, built to reach a global audience.',
    image: '/images/shriparamhansinternational.webp',
    tags: ['Website', 'Spiritual', 'Organization'],
    websiteUrl: 'http://shriparamhansinternational.com/'
  },
  {
    id: 14,
    title: 'DogPetel - Pet Care & Services',
    category: 'Websites',
    description: 'Comprehensive pet care platform offering veterinary services, pet supplies, and care tips. Features include appointment booking, pet profiles, and community forums for pet lovers.',
    image: '/images/dog petel.webp',
    tags: ['Website', 'Pet Care', 'E-commerce'],
    websiteUrl: 'https://dogpetel.vercel.app/'
  },
  // --- Additional design projects ---
  {
    id: 9,
    title: 'Tech Startup Logo',
    category: 'Logo Design',
    description: 'Modern and minimalist logo design for a technology startup with clean lines and contemporary typography.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    tags: ['Logo', 'Tech', 'Minimalist']
  },
  {
    id: 10,
    title: 'Social Media Campaign',
    category: 'Social Media Creatives',
    description: 'Engaging social media graphics for a fashion brand, boosting engagement and brand awareness.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    tags: ['Social Media', 'Fashion', 'Campaign']
  },
  {
    id: 11,
    title: 'Event Poster Design',
    category: 'Posters & Ads',
    description: 'Vibrant event poster design with bold typography and striking visual hierarchy.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    tags: ['Poster', 'Event', 'Typography']
  },
  {
    id: 12,
    title: 'Restaurant Branding',
    category: 'Branding',
    description: 'Complete brand identity for a premium restaurant including logo, menu design, and collateral.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    tags: ['Branding', 'Restaurant', 'Identity']
  }
]

export default projects

// Featured projects for Home page (2 websites + 1 poster)
export const featuredProjects = [
  projects.find(p => p.id === 8),  // Spark Soul website
  projects.find(p => p.id === 14), // DogPetel website
  projects.find(p => p.id === 2)   // Cake Crush poster
]
