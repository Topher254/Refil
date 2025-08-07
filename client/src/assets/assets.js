
import progas from './progas.png'
import total from './total.png'
import seagas from './seagas.png'
import water from './water.png'
import water2 from './water2.png'

export const categories = [
    {
      id: 1,
      name: "Cooking Gas",
      image:progas,
      bgColor:"#FEF6DA",
      path:"gas"
      
    },
    {
      id: 2,
      name: "Water Refills",
      image:water,
      bgColor:"#FEE0E0",
      path:"Water"
      
    }
  ];

// Enhanced vendor information with comprehensive product data
export const vendorDetails = {
  gas: [
    {
      id: 'progas-1',
      vendorName: 'Pro Gas Station',
      vendorImage: progas,
      location: 'Westlands, Nairobi',
      rating: 4.8,
      totalReviews: 1247,
      deliveryRadius: '15km',
      deliveryTime: '2-4 hours',
      deliveryFee: 200,
      minimumOrder: 1000,
      contact: '+254 700 123 456',
      operatingHours: '6:00 AM - 10:00 PM',
      paymentMethods: ['M-Pesa', 'Card', 'Cash'],
      safetyCertification: 'KEBS Certified',
      brand: 'ProGas',
      products: [
        {
          _id: 'progas-6kg',
          name: 'ProGas 6kg Cylinder',
          category: 'Cooking Gas',
          brand: 'ProGas',
          size: '6kg',
          basePrice: 1300,
          offerPrice: 1199,
          deliveryIncluded: true,
          finalPrice: 1399,
          image: progas,
          description: {
            line1: 'High quality LPG gas',
            line2: 'Safe for home use',
            line3: 'Long lasting energy',
          },
          inStock: true,
          features: ['Free delivery', '24/7 support', 'Safety guarantee'],
          specifications: {
            weight: '6kg',
            material: 'Steel',
            pressure: '2.5 bar',
            lifespan: '2-3 months for small family'
          }
        },
        {
          _id: 'progas-13kg',
          name: 'ProGas 13kg Cylinder',
          category: 'Cooking Gas',
          brand: 'ProGas',
          size: '13kg',
          basePrice: 2500,
          offerPrice: 2300,
          deliveryIncluded: true,
          finalPrice: 2500,
          image: progas,
          description: {
            line1: 'Premium LPG gas',
            line2: 'Ideal for large families',
            line3: 'Extended cooking time',
          },
          inStock: true,
          features: ['Free delivery', '24/7 support', 'Safety guarantee'],
          specifications: {
            weight: '13kg',
            material: 'Steel',
            pressure: '2.5 bar',
            lifespan: '3-4 months for medium family'
          }
        },
        {
          _id: 'progas-50kg',
          name: 'ProGas 50kg Cylinder',
          category: 'Cooking Gas',
          brand: 'ProGas',
          size: '50kg',
          basePrice: 8500,
          offerPrice: 7800,
          deliveryIncluded: true,
          finalPrice: 8000,
          image: progas,
          description: {
            line1: 'Commercial grade gas',
            line2: 'Perfect for restaurants',
            line3: 'High efficiency',
          },
          inStock: true,
          features: ['Free delivery', '24/7 support', 'Safety guarantee'],
          specifications: {
            weight: '50kg',
            material: 'Steel',
            pressure: '2.5 bar',
            lifespan: '1-2 months for commercial use'
          }
        }
      ]
    },
    {
      id: 'total-1',
      vendorName: 'Total Gas Station',
      vendorImage: total,
      location: 'Kilimani, Nairobi',
      rating: 4.6,
      totalReviews: 892,
      deliveryRadius: '12km',
      deliveryTime: '1-3 hours',
      deliveryFee: 150,
      minimumOrder: 800,
      contact: '+254 700 789 012',
      operatingHours: '7:00 AM - 9:00 PM',
      paymentMethods: ['M-Pesa', 'Card', 'Cash', 'Airtel Money'],
      safetyCertification: 'KEBS Certified',
      brand: 'K-Gas',
      products: [
        {
          _id: 'kgas-6kg',
          name: 'K-Gas 6kg Cylinder',
          category: 'Cooking Gas',
          brand: 'K-Gas',
          size: '6kg',
          basePrice: 1350,
          offerPrice: 1250,
          deliveryIncluded: true,
          finalPrice: 1400,
          image: total,
          description: {
            line1: 'Trusted energy brand',
            line2: 'Efficient and safe',
            line3: 'Quick delivery available',
          },
          inStock: true,
          features: ['Free delivery', 'Express delivery', 'Quality guarantee'],
          specifications: {
            weight: '6kg',
            material: 'Steel',
            pressure: '2.5 bar',
            lifespan: '2-3 months for small family'
          }
        },
        {
          _id: 'kgas-13kg',
          name: 'K-Gas 13kg Cylinder',
          category: 'Cooking Gas',
          brand: 'K-Gas',
          size: '13kg',
          basePrice: 2700,
          offerPrice: 2499,
          deliveryIncluded: true,
          finalPrice: 2649,
          image: total,
          description: {
            line1: 'Premium quality gas',
            line2: 'Long-lasting energy',
            line3: 'Professional service',
          },
          inStock: false,
          features: ['Free delivery', 'Express delivery', 'Quality guarantee'],
          specifications: {
            weight: '13kg',
            material: 'Steel',
            pressure: '2.5 bar',
            lifespan: '3-4 months for medium family'
          }
        },
        {
          _id: 'kgas-50kg',
          name: 'K-Gas 50kg Cylinder',
          category: 'Cooking Gas',
          brand: 'K-Gas',
          size: '50kg',
          basePrice: 9000,
          offerPrice: 8200,
          deliveryIncluded: true,
          finalPrice: 8350,
          image: total,
          description: {
            line1: 'Commercial grade gas',
            line2: 'High efficiency',
            line3: 'Reliable supply',
          },
          inStock: true,
          features: ['Free delivery', 'Express delivery', 'Quality guarantee'],
          specifications: {
            weight: '50kg',
            material: 'Steel',
            pressure: '2.5 bar',
            lifespan: '1-2 months for commercial use'
          }
        }
      ]
    },
    {
      id: 'seagas-1',
      vendorName: 'Sea Gas Station',
      vendorImage: seagas,
      location: 'South B, Nairobi',
      rating: 4.4,
      totalReviews: 567,
      deliveryRadius: '10km',
      deliveryTime: '3-5 hours',
      deliveryFee: 100,
      minimumOrder: 500,
      contact: '+254 700 345 678',
      operatingHours: '8:00 AM - 8:00 PM',
      paymentMethods: ['M-Pesa', 'Cash'],
      safetyCertification: 'KEBS Certified',
      brand: 'Rubis',
      products: [
        {
          _id: 'rubis-6kg',
          name: 'Rubis 6kg Cylinder',
          category: 'Cooking Gas',
          brand: 'Rubis',
          size: '6kg',
          basePrice: 1250,
          offerPrice: 1150,
          deliveryIncluded: true,
          finalPrice: 1250,
          image: seagas,
          description: {
            line1: 'Affordable gas refill',
            line2: 'Clean and safe flame',
            line3: 'Great for families',
          },
          inStock: true,
          features: ['Budget friendly', 'Reliable service', 'Local delivery'],
          specifications: {
            weight: '6kg',
            material: 'Steel',
            pressure: '2.5 bar',
            lifespan: '2-3 months for small family'
          }
        },
        {
          _id: 'rubis-13kg',
          name: 'Rubis 13kg Cylinder',
          category: 'Cooking Gas',
          brand: 'Rubis',
          size: '13kg',
          basePrice: 2400,
          offerPrice: 2200,
          deliveryIncluded: true,
          finalPrice: 2300,
          image: seagas,
          description: {
            line1: 'Quality gas at affordable price',
            line2: 'Perfect for medium families',
            line3: 'Reliable delivery',
          },
          inStock: true,
          features: ['Budget friendly', 'Reliable service', 'Local delivery'],
          specifications: {
            weight: '13kg',
            material: 'Steel',
            pressure: '2.5 bar',
            lifespan: '3-4 months for medium family'
          }
        }
      ]
    }
  ],
  water: [
    {
      id: 'aqua-1',
      vendorName: 'Aqua Pure Water',
      vendorImage: water,
      location: 'Westlands, Nairobi',
      rating: 4.7,
      totalReviews: 634,
      deliveryRadius: '20km',
      deliveryTime: '1-2 hours',
      deliveryFee: 50,
      minimumOrder: 200,
      contact: '+254 700 456 789',
      operatingHours: '6:00 AM - 11:00 PM',
      paymentMethods: ['M-Pesa', 'Card', 'Cash'],
      safetyCertification: 'KEBS Certified',
      brand: 'Aqua Pure',
      products: [
        {
          _id: 'aqua-10l',
          name: 'Aqua Pure 10L Bottle',
          category: 'Water Refills',
          brand: 'Aqua Pure',
          size: '10L',
          basePrice: 150,
          offerPrice: 120,
          deliveryIncluded: true,
          finalPrice: 170,
          image: water,
          description: {
            line1: 'Purified drinking water',
            line2: 'Delivered to your door',
            line3: 'Fresh and reliable',
          },
          inStock: true,
          features: ['Free delivery', 'Same day delivery', 'Quality tested'],
          specifications: {
            volume: '10 liters',
            material: 'Food-grade plastic',
            purification: 'RO + UV',
            shelfLife: '6 months'
          }
        },
        {
          _id: 'aqua-20l',
          name: 'Aqua Pure 20L Bottle',
          category: 'Water Refills',
          brand: 'Aqua Pure',
          size: '20L',
          basePrice: 200,
          offerPrice: 180,
          deliveryIncluded: true,
          finalPrice: 230,
          image: water2,
          description: {
            line1: 'Safe for consumption',
            line2: 'Eco-friendly packaging',
            line3: 'Perfect for offices',
          },
          inStock: true,
          features: ['Free delivery', 'Same day delivery', 'Quality tested'],
          specifications: {
            volume: '20 liters',
            material: 'Food-grade plastic',
            purification: 'RO + UV',
            shelfLife: '6 months'
          }
        }
      ]
    },
    {
      id: 'pure-1',
      vendorName: 'Pure Water Solutions',
      vendorImage: water2,
      location: 'Kilimani, Nairobi',
      rating: 4.5,
      totalReviews: 423,
      deliveryRadius: '15km',
      deliveryTime: '2-4 hours',
      deliveryFee: 75,
      minimumOrder: 300,
      contact: '+254 700 567 890',
      operatingHours: '7:00 AM - 10:00 PM',
      paymentMethods: ['M-Pesa', 'Airtel Money', 'Cash'],
      safetyCertification: 'KEBS Certified',
      brand: 'Pure Solutions',
      products: [
        {
          _id: 'pure-10l',
          name: 'Pure Solutions 10L Bottle',
          category: 'Water Refills',
          brand: 'Pure Solutions',
          size: '10L',
          basePrice: 160,
          offerPrice: 140,
          deliveryIncluded: true,
          finalPrice: 215,
          image: water2,
          description: {
            line1: 'Premium purified water',
            line2: 'Mineral enriched',
            line3: 'Perfect for home use',
          },
          inStock: true,
          features: ['Premium quality', 'Mineral enriched', 'Fast delivery'],
          specifications: {
            volume: '10 liters',
            material: 'Food-grade plastic',
            purification: 'RO + UV + Minerals',
            shelfLife: '6 months'
          }
        },
        {
          _id: 'pure-20l',
          name: 'Pure Solutions 20L Bottle',
          category: 'Water Refills',
          brand: 'Pure Solutions',
          size: '20L',
          basePrice: 250,
          offerPrice: 220,
          deliveryIncluded: true,
          finalPrice: 295,
          image: water2,
          description: {
            line1: 'Premium purified water',
            line2: 'Mineral enriched',
            line3: 'Perfect for home use',
          },
          inStock: false,
          features: ['Premium quality', 'Mineral enriched', 'Fast delivery'],
          specifications: {
            volume: '20 liters',
            material: 'Food-grade plastic',
            purification: 'RO + UV + Minerals',
            shelfLife: '6 months'
          }
        }
      ]
    }
  ]
};
 
// dummy products for now
// this data i push it or fecth it to the contect so that i can use ot in any component
export const dummyproducts = [
  {
    _id: '1',
    name: 'Pro Gas 6kg',
    category: 'Cooking Gas',
    price: 1300,
    offerPrice: 1199,
    image: progas,
    description: {
      line1: 'High quality LPG gas',
      line2: 'Safe for home use',
      line3: 'Long lasting energy',
    },
    createdAt: '2025-07-25T10:00:00Z',
    updatedAt: '2025-07-30T14:32:00Z',
    inStock: true,
  },
  {
    _id: '2',
    name: 'Total Gas 13kg',
    category: 'Cooking Gas',
    price: 2700,
    offerPrice: 2499,
    image: total,
    description: {
      line1: 'Trusted energy brand',
      line2: 'Efficient and safe',
      line3: 'Quick delivery available',
    },
    createdAt: '2025-07-26T12:15:00Z',
    updatedAt: '2025-07-31T09:21:00Z',
    inStock: false,
  },
  {
    _id: '3',
    name: 'Sea Gas 6kg',
    category: 'Cooking Gas',
    price: 1250,
    offerPrice: 1150,
    image: seagas,
    description: {
      line1: 'Affordable gas refill',
      line2: 'Clean and safe flame',
      line3: 'Great for families',
    },
    createdAt: '2025-07-27T08:45:00Z',
    updatedAt: '2025-07-31T10:15:00Z',
    inStock: true,
  },
  {
    _id: '4',
    name: 'Water Dispenser Bottle',
    category: 'Water Refills',
    price: 300,
    offerPrice: 250,
    image: water,
    description: {
      line1: 'Purified drinking water',
      line2: 'Delivered to your door',
      line3: 'Fresh and reliable',
    },
    createdAt: '2025-07-28T09:00:00Z',
    updatedAt: '2025-08-01T11:00:00Z',
    inStock: true,
  },
  {
    _id: '5',
    name: '20L Bottled Water',
    category: 'Water Refills',
    price: 200,
    offerPrice: 180,
    image: water2,
    description: {
      line1: 'Safe for consumption',
      line2: 'Eco-friendly packaging',
      line3: 'Perfect for offices',
    },
    createdAt: '2025-07-29T07:20:00Z',
    updatedAt: '2025-08-01T13:20:00Z',
    inStock: false,
  },
];

// Rich mock data for orders
export const mockOrders = [
  { id: 1, customer: 'Alice', vendor: 'Pro Gas Station', product: 'ProGas 6kg Cylinder', status: 'Incoming', location: 'Westlands', time: '2025-08-01T10:00:00Z' },
  { id: 2, customer: 'Bob', vendor: 'Total Gas Station', product: 'K-Gas 13kg Cylinder', status: 'Accepted', location: 'Kilimani', time: '2025-08-01T11:00:00Z' },
  { id: 3, customer: 'Carol', vendor: 'Sea Gas Station', product: 'Rubis 6kg Cylinder', status: 'Out for Delivery', location: 'South B', time: '2025-08-01T12:00:00Z' },
  { id: 4, customer: 'David', vendor: 'Aqua Pure Water', product: '20L Bottled Water', status: 'Delivered', location: 'Westlands', time: '2025-08-01T13:00:00Z' },
];

// Rich mock data for payments
export const mockPayments = [
  { id: 1, vendor: 'Pro Gas Station', type: 'M-Pesa', amount: 1399, status: 'Received', time: '2025-08-01T10:30:00Z' },
  { id: 2, vendor: 'Total Gas Station', type: 'Cash on Delivery', amount: 2500, status: 'Pending', time: '2025-08-01T12:00:00Z' },
  { id: 3, vendor: 'Sea Gas Station', type: 'M-Pesa', amount: 1250, status: 'Received', time: '2025-08-01T13:00:00Z' },
  { id: 4, vendor: 'Aqua Pure Water', type: 'Cash on Delivery', amount: 200, status: 'Pending', time: '2025-08-01T14:00:00Z' },
];

// Rich mock data for reviews
export const mockReviews = [
  { id: 1, vendor: 'Pro Gas Station', customer: 'Alice', rating: 5, comment: 'Great service!', flagged: false },
  { id: 2, vendor: 'Total Gas Station', customer: 'Bob', rating: 4, comment: 'Quick delivery.', flagged: false },
  { id: 3, vendor: 'Sea Gas Station', customer: 'Carol', rating: 2, comment: 'Late delivery.', flagged: true },
  { id: 4, vendor: 'Aqua Pure Water', customer: 'David', rating: 5, comment: 'Very reliable.', flagged: false },
];

// Rich mock data for analytics
export const mockAnalytics = {
  revenue: { daily: 10000, weekly: 70000, monthly: 300000 },
  activeVendors: 12,
  activeCustomers: 120,
  mostOrdered: 'ProGas 6kg Cylinder',
  retention: '85%',
  orders: 150,
  completedOrders: 140,
  cashOrders: 40,
  mpesaOrders: 110,
};
