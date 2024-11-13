export const restaurants = [
  {
    id: 1,
    name: "Kaen Sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&h=500",
    rating: 4.8,
    deliveryTime: "25-35",
    category: "Sushi",
    priceLevel: 3,
    address: "Storgatan 1, Stockholm",
    openingHours: "11:00 - 22:00",
    menu: [
      {
        id: "starters",
        name: "Förrätter",
        description: "Traditionella japanska förrätter",
        items: [
          {
            id: 1,
            name: "Edamame",
            description: "Ångkokta sojabönor med havssalt",
            price: 65,
            image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=400&h=300",
            category: "starters",
            dietary: ["vegan", "gluten-free"]
          },
          {
            id: 2,
            name: "Miso Soppa",
            description: "Traditionell japansk soppa med tofu och wakame",
            price: 75,
            category: "starters",
            dietary: ["vegetarian"]
          }
        ]
      },
      {
        id: "sushi",
        name: "Premium Sushi",
        description: "Handgjord sushi av högsta kvalitet",
        items: [
          {
            id: 3,
            name: "Luxury Sushi Set",
            description: "12 bitar premium nigiri med toro, lax och havsabborre",
            price: 395,
            image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&h=300",
            category: "sushi",
            popular: true
          },
          {
            id: 4,
            name: "Dragon Roll",
            description: "Tempuraräkor, avokado, grillad ål och tobiko",
            price: 225,
            category: "sushi",
            popular: true
          }
        ]
      },
      {
        id: "drinks",
        name: "Drycker",
        items: [
          {
            id: 5,
            name: "Premium Sake",
            description: "Junmai Daiginjo, 180ml",
            price: 245,
            category: "drinks"
          },
          {
            id: 6,
            name: "Matcha Latte",
            description: "Ceremonial grade matcha med silkeslen mjölkskum",
            price: 85,
            category: "drinks",
            dietary: ["vegetarian"]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "ASAP MARKET",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800&h=500",
    rating: 4.5,
    deliveryTime: "15-25",
    category: "Kiosk",
    priceLevel: 1,
    address: "Kungsgatan 15, Stockholm",
    openingHours: "00:00 - 24:00",
    menu: [
      {
        id: "snacks",
        name: "Snacks",
        description: "Populära snacks och godis",
        items: [
          {
            id: 7,
            name: "Chips Mix",
            description: "Blandade chips från kända märken",
            price: 39,
            category: "snacks",
            popular: true
          },
          {
            id: 8,
            name: "Lösgodis",
            description: "Välj bland 100 olika sorter",
            price: 89,
            category: "snacks",
            image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=400&h=300"
          }
        ]
      },
      {
        id: "drinks",
        name: "Drycker",
        items: [
          {
            id: 9,
            name: "Energidryck",
            description: "Olika märken och smaker",
            price: 25,
            category: "drinks",
            popular: true
          },
          {
            id: 10,
            name: "Läsk",
            description: "Stort urval av läsk",
            price: 20,
            category: "drinks"
          }
        ]
      },
      {
        id: "tobacco",
        name: "Tobak",
        items: [
          {
            id: 11,
            name: "Snus",
            description: "Olika märken och styrkor",
            price: 55,
            category: "tobacco"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Mozzarella",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&h=500",
    rating: 4.7,
    deliveryTime: "20-30",
    category: "Pizzeria",
    priceLevel: 2,
    address: "Drottninggatan 45, Stockholm",
    openingHours: "10:00 - 23:00",
    menu: [
      {
        id: "starters",
        name: "Förrätter",
        description: "Italienska klassiker",
        items: [
          {
            id: 12,
            name: "Vitlöksbröd",
            description: "Nybakat bröd med vitlökssmör och örter",
            price: 69,
            category: "starters",
            dietary: ["vegetarian"]
          },
          {
            id: 13,
            name: "Bruschetta",
            description: "Grillat bröd med tomat, vitlök och basilika",
            price: 85,
            category: "starters",
            dietary: ["vegetarian"],
            image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=400&h=300"
          }
        ]
      },
      {
        id: "pizzas",
        name: "Pizzor",
        description: "Stenungsbakade pizzor med färska råvaror",
        items: [
          {
            id: 14,
            name: "Margherita D.O.P",
            description: "San Marzano tomater, buffelmozzarella, basilika",
            price: 159,
            category: "pizzas",
            dietary: ["vegetarian"],
            popular: true,
            image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=400&h=300"
          },
          {
            id: 15,
            name: "Tartufo",
            description: "Tryffel, mozzarella, mascarpone, ruccola",
            price: 199,
            category: "pizzas",
            popular: true
          }
        ]
      },
      {
        id: "drinks",
        name: "Drycker",
        items: [
          {
            id: 16,
            name: "Italiensk Läsk",
            description: "San Pellegrino, olika smaker",
            price: 35,
            category: "drinks"
          },
          {
            id: 17,
            name: "Husets Vin",
            description: "Rött/Vitt/Rosé, 175ml",
            price: 89,
            category: "drinks"
          }
        ]
      }
    ]
  }
];