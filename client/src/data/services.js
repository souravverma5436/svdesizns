const services = [
  {
    id: 1,
    icon: 'LD',
    name: 'Logo Design',
    description: 'Distinctive logo systems crafted to make your brand instantly recognizable across digital and print touchpoints.',
    plans: [
      {
        name: 'Basic', price: '₹2,999',
        features: ['2 Logo Concepts', '2 Revisions', 'JPG + PNG Files', 'Simple & Clean Design']
      },
      {
        name: 'Standard', price: '₹6,999', popular: true,
        features: ['4 Logo Concepts', '5 Revisions', 'Vector Files (AI, SVG)', 'High-Quality Formats', 'Basic Brand Colors']
      },
      {
        name: 'Premium', price: '₹14,999',
        features: ['6+ Logo Concepts', 'Unlimited Revisions', 'Full Brand Style Guide', 'Social Media Logo Kit', 'Mockups + All Formats']
      }
    ]
  },
  {
    id: 2,
    icon: 'BR',
    name: 'Branding',
    description: 'Cohesive brand identity packages that turn your business into a polished, memorable experience.',
    plans: [
      {
        name: 'Basic', price: '₹7,999',
        features: ['Logo Design', 'Color Palette', 'Typography Selection', 'Basic Brand Guidelines']
      },
      {
        name: 'Standard', price: '₹18,999', popular: true,
        features: ['Logo + Variations', 'Color + Typography', 'Business Card Design', 'Social Media Kit', 'Brand Guidelines PDF']
      },
      {
        name: 'Premium', price: '₹39,999',
        features: ['Complete Brand Identity', 'Logo System', 'Stationery Design', 'Social Media Templates', 'Full Brand Book + Mockups']
      }
    ]
  },
  {
    id: 3,
    icon: 'SM',
    name: 'Social Media Design',
    description: 'Platform-ready creative systems designed to boost engagement and keep your brand visually consistent.',
    plans: [
      {
        name: 'Basic', price: '₹2,499',
        features: ['10 Post Designs', 'Static Designs', 'Basic Branding', 'Ready-to-upload Files']
      },
      {
        name: 'Standard', price: '₹5,999', popular: true,
        features: ['20 Post Designs', 'Carousel + Story Templates', 'Custom Branding Style', 'High-Quality Visuals']
      },
      {
        name: 'Premium', price: '₹11,999',
        features: ['30/35 Posts', 'Advanced Creatives', 'Reels Covers + Stories', 'Monthly Design Strategy']
      }
    ]
  },
  {
    id: 4,
    icon: 'PB',
    name: 'Poster / Banner Design',
    description: 'Impactful promotional visuals built to command attention in print campaigns, events, and digital ads.',
    plans: [
      {
        name: 'Basic', price: '₹699',
        features: ['1 Poster Design', 'Simple Layout', 'HD File']
      },
      {
        name: 'Standard', price: '₹1,999', popular: true,
        features: ['2–3 Concepts', 'Custom Design Style', 'Print Ready Files']
      },
      {
        name: 'Premium', price: '₹4,999',
        features: ['Advanced Design', 'Branding Integration', 'Multiple Formats']
      }
    ]
  },
  {
    id: 5,
    icon: 'WD',
    name: 'Website Design',
    description: 'Modern, conversion-focused websites with a premium visual direction and responsive performance.',
    flexiblePricing: true,
    plans: [
      {
        name: 'Basic', price: '₹9,999',
        features: ['3–4 Pages Website', 'Responsive Design', 'Contact Form']
      },
      {
        name: 'Standard', price: '₹24,999', popular: true,
        features: ['5–8 Pages', 'Modern UI/UX', 'Animations', 'Mobile Optimization']
      },
      {
        name: 'Premium', price: '₹59,999',
        features: ['Full Custom Website', 'Advanced Animations (GSAP / Framer Motion)', 'Premium UI', 'Deployment Support', 'SEO Optimization']
      }
    ]
  },
  {
    id: 6,
    icon: 'CP',
    name: 'Complete Package',
    description: 'An all-in-one creative package for businesses that want a unified launch-ready brand presence.',
    plans: [
      {
        name: 'Basic', price: '₹24,999',
        features: ['Logo + Branding', '10 Social Media Posts', 'Basic Website']
      },
      {
        name: 'Standard', price: '₹54,999', popular: true,
        features: ['Branding + 20 Posts', 'Professional Website', 'Social Media Setup']
      },
      {
        name: 'Premium', price: '₹99,999',
        features: ['Full Brand Identity', '30+ Posts', 'Advanced Website', 'Premium Design System', 'Priority Support']
      }
    ]
  },
  {
    id: 7,
    icon: 'RE',
    name: 'Reels Editing',
    description: 'High-quality short-form content designed to increase engagement and create a premium social media presence.',
    plans: [
      {
        name: 'Basic', price: '₹699',
        features: ['1 Reel Edit', 'Basic Transitions', 'Music Sync', 'HD Export']
      },
      {
        name: 'Standard', price: '₹2,999', popular: true,
        features: ['5 Reels', 'Cinematic Transitions', 'Motion Text', 'Color Grading']
      },
      {
        name: 'Premium', price: '₹6,999',
        features: ['10–15 Reels', 'Viral Style Editing', 'Advanced Effects', 'Social Media Optimization']
      }
    ]
  },
  {
    id: 8,
    icon: 'MD',
    name: 'Menu Design',
    description: 'Professional menu designs for restaurants, cafes, hotels, and food businesses with premium visual presentation.',
    plans: [
      {
        name: 'Basic', price: '₹799',
        features: ['Single Page Menu', 'Simple Layout', 'HD Print File']
      },
      {
        name: 'Standard', price: '₹2,499', popular: true,
        features: ['Multi-Section Menu', 'Custom Theme', 'Print Ready Design']
      },
      {
        name: 'Premium', price: '₹5,999',
        features: ['Premium Restaurant Menu', 'Luxury Layout', 'Food Mockups', 'Multiple Formats']
      }
    ]
  },
  {
    id: 9,
    icon: 'YT',
    name: 'YouTube Thumbnail Design',
    description: 'High-converting thumbnails designed to boost clicks, engagement, and professional channel branding.',
    plans: [
      {
        name: 'Basic', price: '₹299',
        features: ['1 Thumbnail', 'Basic Editing', 'HD Quality']
      },
      {
        name: 'Standard', price: '₹1,499', popular: true,
        features: ['5 Thumbnails', 'Custom Style', 'Clickable Design']
      },
      {
        name: 'Premium', price: '₹3,999',
        features: ['15 Thumbnails', 'Viral YouTube Style', 'Advanced Manipulation', 'Branding Consistency']
      }
    ]
  },
  {
    id: 10,
    icon: 'LP',
    name: 'Landing Page Design',
    description: 'Modern high-converting landing pages designed for businesses, products, startups, and marketing campaigns.',
    plans: [
      {
        name: 'Basic', price: '₹4,999',
        features: ['Single Landing Page', 'Responsive Design', 'CTA Sections']
      },
      {
        name: 'Standard', price: '₹12,999', popular: true,
        features: ['Premium UI/UX', 'Animations', 'Lead Capture Forms', 'SEO Friendly']
      },
      {
        name: 'Premium', price: '₹24,999',
        features: ['High-Converting Sales Page', 'Advanced Animations', 'Custom Graphics', 'Full Responsive Optimization', 'Deployment Support']
      }
    ]
  }
]

export default services

// Printing solutions — no pricing, contact for quote
export const printingServices = {
  icon: 'PRINT',
  name: 'Printing Solutions',
  description: 'Professional printing and branding materials for businesses, shops, marketing, and promotional use.',
  highlights: ['Premium print quality', 'Bulk order support', 'Custom branding solutions'],
  categories: [
    {
      title: 'Boards & Signage',
      icon: '🪧',
      items: ['LED Boards', 'Acrylic Boards', 'Flex Boards', 'Glow Sign Boards', 'ACP Sign Boards', 'Letter Boards', 'Shop Sign Boards', 'Name Plates', '3D Letter Boards']
    },
    {
      title: 'Printing Items',
      icon: '🖨️',
      items: ['Visiting Cards', 'Pamphlets & Brochures', 'Stickers & Labels', 'Posters & Banners', 'Diaries & Pens', 'T-Shirts & Mugs', 'ID Cards', 'Bill Books', 'Wedding Cards', 'Packaging Printing', 'Envelopes', 'Invoice & Receipt Books', 'Flyers', 'Gift Items', 'Caps & Bags', 'Custom Promotional Items']
    }
  ]
}
