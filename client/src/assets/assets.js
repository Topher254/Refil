
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
