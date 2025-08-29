export const SelectTravelsList = [
  {
    id: 1,
    title: "Beach Getaway",
    desc: "Relax at the sunny shores with crystal clear waters.",
    icon: "🏖️",
    people: "2 people"
  },
  {
    id: 2,
    title: "Mountain Adventure",
    desc: "Hike through the scenic mountain trails and camp under the stars.",
    icon: "⛰️",
    people: "3 people"
  },
  {
    id: 3,
    title: "City Exploration",
    desc: "Discover the bustling life, food, and culture of the city.",
    icon: "🏙️",
    people: "2 people"
  },
  {
    id: 4,
    title: "Desert Safari",
    desc: "Ride the dunes and experience the golden sands.",
    icon: "🏜️",
    people: "4 people"
  },
  {
    id: 5,
    title: "Forest Retreat",
    desc: "Immerse yourself in nature and unwind in the peaceful greenery.",
    icon: "🌲",
    people: "2 people"
  },
 
 
  {
    id: 6,
    title: "Cultural Tour",
    desc: "Visit historic landmarks, museums, and learn about local traditions.",
    icon: "🏛️",
    people: "5 people"
  },
  {
    id: 7,
    title: "Road Trip",
    desc: "Hit the open road, discover hidden gems, and make unforgettable memories.",
    icon: "🚗",
    people: "3 people"
  },
 
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Budget Friendly",
    desc: "Ideal for low-cost travel with basic accommodations and public transport.",
    icon: "💸"
  },
  {
    id: 2,
    title: "Standard",
    desc: "Balanced budget with comfortable stays and essential experiences.",
    icon: "💰"
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium travel with 4–5 star hotels, private transfers, and fine dining.",
    icon: "💎"
  },
  {
    id: 4,
    title: "Backpacker",
    desc: "Minimal budget travel with hostels, hitchhiking, and street food.",
    icon: "🎒"
  },
  {
    id: 5,
    title: "Family Package",
    desc: "Moderate budget for families with safe accommodations and kids' activities.",
    icon: "👨‍👩‍👧‍👦"
  }
];



export const AI_PROMPT =
    "Generate Travel Plan for Location : {location}.for {totalDays} Days for {traveler} with a {budget} budget,give me Hotels options list with HotelName, Hotel address, Price, HotelImageUrl, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details,PlaceImageUrl, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. ";
