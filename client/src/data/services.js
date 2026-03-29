const services = [
  {
    id: 1,
    name: 'Logo Design',
    description: 'Distinctive logo systems crafted to make your brand instantly recognizable across digital and print touchpoints.',
    plans: [
      {
        name: 'Basic',
        price: '₹4,999',
        features: ['2 Logo Concepts', '2 Revisions', 'JPG + PNG Files', 'Simple & Clean Design']
      },
      {
        name: 'Standard',
        price: '₹9,999',
        popular: true,
        features: ['4 Logo Concepts', '5 Revisions', 'Vector Files (AI, SVG)', 'High-Quality Formats', 'Basic Brand Colors']
      },
      {
        name: 'Premium',
        price: '₹18,999',
        features: ['6+ Logo Concepts', 'Unlimited Revisions', 'Full Brand Style (Color + Typography)', 'Social Media Logo Kit', 'All File Formats + Mockups']
      }
    ]
  },
  {
    id: 2,
    name: 'Branding',
    description: 'Cohesive brand identity packages that turn your business into a polished, memorable experience.',
    plans: [
      {
        name: 'Basic',
        price: '₹10,999',
        features: ['Logo Design', 'Color Palette', 'Typography Selection', 'Basic Brand Guidelines']
      },
      {
        name: 'Standard',
        price: '₹24,999',
        popular: true,
        features: ['Logo + Variations', 'Color + Typography', 'Business Card Design', 'Social Media Kit', 'Brand Guidelines PDF']
      },
      {
        name: 'Premium',
        price: '₹49,999',
        features: ['Complete Brand Identity', 'Logo System', 'Stationery Design', 'Social Media Templates', 'Full Brand Book + Mockups']
      }
    ]
  },
  {
    id: 3,
    name: 'Social Media Design',
    description: 'Platform-ready creative systems designed to boost engagement and keep your brand visually consistent.',
    plans: [
      {
        name: 'Basic',
        price: '₹3,999',
        features: ['10 Post Designs', 'Static Designs', 'Basic Branding', 'Ready-to-upload files']
      },
      {
        name: 'Standard',
        price: '₹7,999',
        popular: true,
        features: ['20 Post Designs', 'Carousel + Story Templates', 'Custom Branding Style', 'High-Quality Visuals']
      },
      {
        name: 'Premium',
        price: '₹14,999',
        features: ['30/35 Posts', 'Advanced Creatives', 'Reels Covers + Stories', 'Monthly Design Strategy']
      }
    ]
  },
  {
    id: 4,
    name: 'Poster / Banner Design',
    description: 'Impactful promotional visuals built to command attention in print campaigns, events, and digital ads.',
    plans: [
      {
        name: 'Basic',
        price: '₹999',
        features: ['1 Poster Design', 'Simple Layout', 'HD File']
      },
      {
        name: 'Standard',
        price: '₹2,999',
        popular: true,
        features: ['2–3 Concepts', 'Custom Design Style', 'Print Ready Files']
      },
      {
        name: 'Premium',
        price: '₹5,999',
        features: ['Advanced Design', 'Branding Integration', 'Multiple Formats']
      }
    ]
  },
  {
    id: 5,
    name: 'Website Design',
    description: 'Modern, conversion-focused websites with a premium visual direction and responsive performance.',
    plans: [
      {
        name: 'Basic',
        price: '₹12,999',
        features: ['3–4 Pages Website', 'Responsive Design', 'Contact Form']
      },
      {
        name: 'Standard',
        price: '₹24,999',
        popular: true,
        features: ['5–8 Pages', 'Modern UI/UX', 'Animations', 'Mobile Optimization']
      },
      {
        name: 'Premium',
        price: '₹49,999',
        features: ['Full Custom Website', 'Advanced Animations (GSAP)', 'Premium UI', 'Deployment Support']
      }
    ]
  },
  {
    id: 6,
    name: 'Complete Package',
    description: 'An all-in-one creative package for businesses that want a unified launch-ready brand presence.',
    plans: [
      {
        name: 'Basic',
        price: '₹39,999',
        features: ['Logo + Branding', '10 Social Media Posts', 'Basic Website']
      },
      {
        name: 'Standard',
        price: '₹69,999',
        popular: true,
        features: ['Branding + 20 Posts', 'Professional Website']
      },
      {
        name: 'Premium',
        price: '₹99,999',
        features: ['Full Brand Identity', '30+ Posts', 'Advanced Website', 'Premium Design System']
      }
    ]
  }
]

export default services
