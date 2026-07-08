export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getToken = () => localStorage.getItem("gt_token");

export const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: getToken()
  ? `Bearer ${getToken()}`
  : "",
});

export const apiCall = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  let data;

    try {
      data = await res.json();
    } catch {
      data = {};
    }

    return {
      ok: res.ok,
      status: res.status,
      data,
    };
};

export const authCall = async (endpoint, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    headers: { ...authHeaders(), ...options.headers },
  });
};

export const destinations = [
  { id: 1, img: "/switzerland.jpg", country: "Switzerland", city: "Interlaken", flag: "🇨🇭", rating: 4.9, price: 89999, duration: "7N/8D", category: "Adventure", description: "Stunning alpine landscapes, crystal lakes, and world-class skiing.", highlights: ["Jungfraujoch", "Lake Thun", "Paragliding", "Swiss Chocolate Tour"] },
  { id: 2, img: "/maldives.jpg", country: "Maldives", city: "Malé", flag: "🇲🇻", rating: 4.8, price: 74999, duration: "5N/6D", category: "Beach", description: "Overwater bungalows, turquoise lagoons, and vibrant coral reefs.", highlights: ["Snorkeling", "Overwater Villa", "Sunset Cruise", "Dolphin Watching"] },
  { id: 3, img: "/italy.avif", country: "Italy", city: "Rome", flag: "🇮🇹", rating: 4.7, price: 69999, duration: "6N/7D", category: "Culture", description: "Ancient ruins, world-class cuisine, and timeless art.", highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Pasta Making Class"] },
  { id: 4, img: "/dubai.jpg", country: "UAE", city: "Dubai", flag: "🇦🇪", rating: 4.8, price: 54999, duration: "4N/5D", category: "Luxury", description: "Futuristic skyline, desert adventures, and luxury shopping.", highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah"] },
  { id: 5, img: "/Thailand.jpg", country: "Thailand", city: "Phuket", flag: "🇹🇭", rating: 4.6, price: 39999, duration: "5N/6D", category: "Beach", description: "Tropical beaches, vibrant nightlife, and ancient temples.", highlights: ["Phi Phi Islands", "Big Buddha", "Muay Thai Show", "Street Food Tour"] },
  { id: 6, img: "/newzealand.webp", country: "New Zealand", city: "Queenstown", flag: "🇳🇿", rating: 4.9, price: 94999, duration: "8N/9D", category: "Adventure", description: "Bungee jumping, fjords, and breathtaking natural beauty.", highlights: ["Bungee Jumping", "Fiordland", "Hobbiton", "Glacier Hike"] },
  { id: 7, img: "/paris.jpg", country: "France", city: "Paris", flag: "🇫🇷", rating: 4.7, price: 79999, duration: "6N/7D", category: "Culture", description: "The city of love — art, fashion, and iconic landmarks.", highlights: ["Eiffel Tower", "Louvre Museum", "Versailles", "Seine River Cruise"] },
  { id: 8, img: "/japan.jpg", country: "Japan", city: "Kyoto", flag: "🇯🇵", rating: 4.9, price: 84999, duration: "7N/8D", category: "Culture", description: "Ancient temples, cherry blossoms, and modern wonders.", highlights: ["Fushimi Inari", "Arashiyama Bamboo", "Tea Ceremony", "Mount Fuji"] },
  { id: 9, img: "/sydney.jpg", country: "Australia", city: "Sydney", flag: "🇦🇺", rating: 4.7, price: 89999, duration: "7N/8D", category: "City", description: "Iconic opera house, golden beaches, and vibrant culture.", highlights: ["Opera House", "Bondi Beach", "Blue Mountains", "Harbour Bridge"] },
];

export const packages = [
  { id: "voyager", title: "Voyager Package", price: 9999, img: "/twostar.jpg", stars: 2, nights: 5, features: ["2-Star Hotel", "5 Nights Stay", "Group Sightseeing", "Shared Airport Transfers", "Free Photo Session", "Friendly Tour Guide", "24/7 Customer Help"] },
  { id: "discoverer", title: "Discoverer Package", price: 19999, img: "/threestar.jpg", stars: 3, nights: 6, features: ["3-Star Hotel", "6 Nights Stay", "Guided Tours + Entry Tickets", "Shared + Private Transfers", "Free Photo Session", "Multilingual Guide", "24/7 Customer Help"] },
  { id: "explorer", title: "Explorer Package", price: 29999, img: "/fourstar.jpg", stars: 4, nights: 7, popular: true, features: ["4-Star Hotel", "7 Nights Stay", "Guided + Adventure Activities", "Private Airport Transfers", "Drone Photo + Video Session", "Expert Tour Manager", "Priority Support"] },
  { id: "globetrotter", title: "Globetrotter Package", price: 39999, img: "/fivestar.jpg", stars: 5, nights: 8, features: ["5-Star Luxury Resort", "8 Nights Stay", "Custom Itinerary & VIP", "Limousine Transfers", "Professional Photoshoot & Reel", "Personal Concierge", "Dedicated 24/7 Manager"] },
];
