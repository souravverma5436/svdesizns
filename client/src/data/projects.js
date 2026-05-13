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
  },

  // --- Automotive & Luxury designs ---
  {
    id: 15,
    title: 'Audi R8 – Supercar Poster',
    category: 'Automotive & Luxury',
    description: 'High-impact visual design for the iconic Audi R8 supercar. The composition blends dramatic lighting, sharp angles, and a dark cinematic backdrop to capture the raw power and precision engineering that defines the R8 legacy.',
    image: '/images/audi r8.webp',
    tags: ['Automotive', 'Poster', 'Photoshop']
  },
  {
    id: 16,
    title: 'BMW – Luxury Auto Visual',
    category: 'Automotive & Luxury',
    description: 'Sleek promotional visual for BMW showcasing the brand\'s signature blend of performance and elegance. Clean lines, premium color grading, and bold typography communicate the ultimate driving machine experience.',
    image: '/images/BMW 1.webp',
    tags: ['Automotive', 'BMW', 'Branding']
  },
  {
    id: 17,
    title: 'Ferrari – Speed & Passion',
    category: 'Automotive & Luxury',
    description: 'A fiery, adrenaline-charged design tribute to Ferrari\'s racing heritage. Deep reds, dynamic motion blur effects, and aggressive composition evoke the passion and speed that have made Ferrari an eternal symbol of excellence.',
    image: '/images/ferrari.webp',
    tags: ['Automotive', 'Ferrari', 'Poster']
  },
  {
    id: 18,
    title: 'Lamborghini – Raging Bull',
    category: 'Automotive & Luxury',
    description: 'Bold and aggressive visual design inspired by Lamborghini\'s iconic raging bull identity. The design uses sharp geometric forms, electric color accents, and dramatic perspective to mirror the car\'s uncompromising performance DNA.',
    image: '/images/Lambo.webp',
    tags: ['Automotive', 'Lamborghini', 'Design']
  },
  {
    id: 24,
    title: 'Lamborghini – Aventador Poster',
    category: 'Automotive & Luxury',
    description: 'A cinematic poster design celebrating the Lamborghini Aventador — one of the most dramatic supercars ever built. Striking low-angle perspective, neon-lit atmosphere, and razor-sharp detailing make this a standout piece of automotive art.',
    image: '/images/lamborghini.webp',
    tags: ['Automotive', 'Lamborghini', 'Poster']
  },
  {
    id: 19,
    title: 'Louis Vuitton – Luxury Brand Art',
    category: 'Automotive & Luxury',
    description: 'Sophisticated luxury brand artwork inspired by Louis Vuitton\'s timeless aesthetic. The design merges the iconic LV monogram with contemporary visual storytelling — rich textures, gold tones, and refined typography that speak the language of high fashion.',
    image: '/images/Louis Vuitton.webp',
    tags: ['Luxury', 'Fashion', 'Brand Art']
  },
  {
    id: 20,
    title: 'Necklace – Jewellery Visual',
    category: 'Automotive & Luxury',
    description: 'Elegant jewellery product visual designed to highlight the craftsmanship and allure of a premium necklace. Soft studio lighting, macro-level detail, and a minimalist backdrop bring out the brilliance of the piece — perfect for luxury retail and e-commerce.',
    image: '/images/necklace.webp',
    tags: ['Jewellery', 'Product', 'Luxury']
  },
  {
    id: 21,
    title: 'McLaren – Precision in Motion',
    category: 'Automotive & Luxury',
    description: 'A cutting-edge visual design for McLaren that captures the brand\'s obsession with aerodynamics and speed. Papaya orange accents, carbon-fibre textures, and a futuristic layout reflect McLaren\'s Formula 1 roots and road-car excellence.',
    image: '/images/mclaren.webp',
    tags: ['Automotive', 'McLaren', 'Poster']
  },
  {
    id: 22,
    title: 'Ford Mustang – American Muscle',
    category: 'Automotive & Luxury',
    description: 'A powerful tribute to the Ford Mustang\'s legendary muscle car heritage. Bold typography, deep shadows, and a high-contrast color palette channel the raw energy and freedom that the Mustang has represented for over five decades.',
    image: '/images/mustang.webp',
    tags: ['Automotive', 'Mustang', 'Poster']
  },
  {
    id: 23,
    title: 'Mahindra Thar – Off-Road Spirit',
    category: 'Automotive & Luxury',
    description: 'Rugged and adventurous visual design for the Mahindra Thar — India\'s most iconic off-roader. Earthy tones, dust-trail effects, and a bold composition capture the Thar\'s fearless personality and its promise to conquer any terrain.',
    image: '/images/thar.webp',
    tags: ['Automotive', 'Thar', 'Off-Road']
  },
  {
    id: 25,
    title: 'Freelancer Cover – Personal Brand',
    category: 'Branding',
    description: 'A professional freelancer profile cover design crafted to make a strong first impression. Bold personal branding, clean layout, and a modern visual identity that communicates skill, credibility, and creative expertise at a glance.',
    image: '/images/Freelancer cover.webp',
    tags: ['Branding', 'Freelance', 'Cover Design']
  }
]

export default projects

// Featured projects for Home page (2 websites + 1 poster)
export const featuredProjects = [
  projects.find(p => p.id === 8),  // Spark Soul website
  projects.find(p => p.id === 14), // DogPetel website
  projects.find(p => p.id === 2)   // Cake Crush poster
]
