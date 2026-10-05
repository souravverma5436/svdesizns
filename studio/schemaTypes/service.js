export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'name', title: 'Service Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'icon', title: 'Icon (2 Letters)', type: 'string' },
    { name: 'flexiblePricing', title: 'Flexible Pricing?', type: 'boolean' },
    { name: 'sortOrder', title: 'Sort Order (1, 2, 3...)', type: 'number' },
    {
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Plan Name (Basic/Standard/Premium)', type: 'string' },
          { name: 'price', title: 'Price (e.g. ₹2,999)', type: 'string' },
          { name: 'popular', title: 'Is Most Popular?', type: 'boolean' },
          { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
        ]
      }]
    }
  ]
}
