import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Flame } from "lucide-react";

const heroImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/ILoveKOSA-1760668254089.JPG";

const Restaurant = () => {
  // Menu data organized by category
  const breakfastMenu = [
    {
      id: "br1",
      name: "Kosa Breakfast",
      description: "Two eggs (any style), wheat toast with butter & house-made jam, served with fresh coffee or tea",
      isPopular: true,
    },
    {
      id: "br2",
      name: "Kosa Breakfast Deluxe",
      description: "Two eggs (any style), wheat toast, fresh coffee or tea, with chicken sausage, tuna, or veggie sausage",
      isPopular: true,
    },
    {
      id: "br3",
      name: "Vegetable Omelette",
      description: "Fresh vegetables folded into fluffy eggs",
      isVegetarian: true,
    },
    {
      id: "br4",
      name: "Vegetable Sausage Omelette",
      description: "Omelette with vegetable sausage",
    },
    {
      id: "br5",
      name: "Cheese Omelette",
      description: "Classic omelette with melted cheese (Add Cheese Ghc20)",
      isPopular: true,
    },
    {
      id: "br6",
      name: "Tuna Omelette",
      description: "Omelette filled with tuna",
    },
    {
      id: "br7",
      name: "Ghanaian Pancakes",
      description: "Traditional pancakes served with honey or chocolate",
    },
    {
      id: "br8",
      name: "Pancakes with Fresh Seasonal Fruits",
      description: "Fluffy pancakes topped with fresh seasonal fruits, served with honey or chocolate",
      isPopular: true,
    },
    {
      id: "br9",
      name: "Seasonal Fruit Bowl",
      description: "Fresh seasonal fruits artfully arranged",
      isVegetarian: true,
    },
    {
      id: "br10",
      name: "Oatmeal (Porridge)",
      description: "Warm oatmeal served with fresh milk",
      isVegetarian: true,
    },
    {
      id: "br11",
      name: "Cornflakes",
      description: "Crispy cornflakes served with fresh milk",
      isVegetarian: true,
    },
    {
      id: "br12",
      name: "Muesli with Seasonal Fruits",
      description: "A wholesome blend of rolled oats, nuts, and dried fruits topped with fresh seasonal fruits, served with chilled milk",
      isVegetarian: true,
    },
    {
      id: "br13",
      name: "Egg Sandwich",
      description: "Fresh egg sandwich",
    },
    {
      id: "br14",
      name: "Tuna Sandwich",
      description: "Tuna sandwich",
    },
    {
      id: "br15",
      name: "Chicken Sandwich",
      description: "Chicken sandwich",
    },
    {
      id: "br16",
      name: "Tomato Mozzarella Basil Sandwich",
      description: "Fresh tomato, mozzarella, and basil sandwich",
      isVegetarian: true,
    },
    {
      id: "br17",
      name: "Wheat Toast with Butter & House-made Jam or Honey",
      description: "Freshly toasted wheat bread with butter and house-made jam or honey",
      isVegetarian: true,
    },
    {
      id: "br18",
      name: "Chicken Sausage",
      description: "Breakfast extra - chicken sausage",
    },
    {
      id: "br19",
      name: "Veggie Sausage",
      description: "Breakfast extra - veggie sausage",
      isVegetarian: true,
    },
    {
      id: "br20",
      name: "Tuna",
      description: "Breakfast extra - tuna",
    },
  ];

  const startersMenu = [
    {
      id: "st1",
      name: "Fresh Tomato Soup with Toast",
      description: "House-made fresh tomato soup served with toasted bread",
    },
    {
      id: "st2",
      name: "Vegetable Soup with Toast",
      description: "Fresh vegetable soup served with toasted bread",
      isVegetarian: true,
    },
    {
      id: "st3",
      name: "Chicken Soup with Toast",
      description: "Hearty chicken soup served with toasted bread",
    },
    {
      id: "st4",
      name: "Spring Rolls (2 pieces)",
      description: "Crispy spring rolls",
      isPopular: true,
    },
    {
      id: "st5",
      name: "Kelewele",
      description: "Spicy fried plantain cubes - a Ghanaian favorite",
      isSpicy: true,
      isPopular: true,
    },
    {
      id: "st6",
      name: "Yam Balls with Sauce",
      description: "Crispy yam balls served with dipping sauce",
    },
    {
      id: "st7",
      name: "Bruschetta with Fresh Tomatoes (4 pieces)",
      description: "Toasted bread topped with fresh tomatoes and herbs",
      isVegetarian: true,
    },
    {
      id: "st8",
      name: "Mixed Garden Salad",
      description: "Fresh mixed greens with seasonal vegetables",
      isVegetarian: true,
    },
    {
      id: "st9",
      name: "Chicken Salad",
      description: "Fresh greens with grilled chicken",
      isPopular: true,
    },
    {
      id: "st10",
      name: "Beef & Mango Salad",
      description: "Tender beef with fresh mango on mixed greens",
    },
    {
      id: "st11",
      name: "Chicken Wings",
      description: "Fried or tossed in spicy green or red chili sauce",
      isSpicy: true,
      isPopular: true,
    },
    {
      id: "st12",
      name: "Chicken Kebab",
      description: "Grilled chicken skewer",
    },
    {
      id: "st13",
      name: "Fish Kebab",
      description: "Grilled fish skewer",
    },
    {
      id: "st14",
      name: "Beef Kebab",
      description: "Grilled beef skewer",
    },
    {
      id: "st15",
      name: "Veggie Kebab",
      description: "Grilled vegetable skewer",
      isVegetarian: true,
    },
  ];

  const mainsMenu = [
    {
      id: "main1",
      name: "Jollof Rice with Chicken (grilled)",
      description: "Traditional West African jollof rice with perfectly grilled chicken",
      isPopular: true,
    },
    {
      id: "main2",
      name: "Fried Rice with Chicken (grilled)",
      description: "Seasoned fried rice with grilled chicken",
    },
    {
      id: "main3",
      name: "Red Red with Chicken or Fish",
      description: "Traditional Ghanaian bean stew served with fried plantains and your choice of chicken or fish",
      isPopular: true,
    },
    {
      id: "main4",
      name: "Mushroom Stroganoff with Plain Rice",
      description: "Creamy mushroom stroganoff served with steamed rice",
      isVegetarian: true,
    },
    {
      id: "main5",
      name: "Yam with Palava Sauce",
      description: "Boiled yam served with traditional palava sauce",
      isVegetarian: true,
    },
    {
      id: "main6",
      name: "Chicken Groundnut Soup",
      description: "Rich peanut soup with chicken (Served with plain rice, omatuo rice balls, or banku)",
      isPopular: true,
    },
    {
      id: "main7",
      name: "Beef Groundnut Soup",
      description: "Rich peanut soup with beef (Served with plain rice, omatuo rice balls, or banku)",
    },
    {
      id: "main8",
      name: "Red Snapper Groundnut Soup",
      description: "Rich peanut soup with red snapper (Served with plain rice, omatuo rice balls, or banku)",
    },
    {
      id: "main9",
      name: "Banku with Chicken & Pepper Sauce",
      description: "Fermented corn and cassava dough with grilled chicken and spicy pepper sauce",
      isSpicy: true,
    },
    {
      id: "main10",
      name: "Banku with Red Snapper & Pepper Sauce",
      description: "Banku with grilled red snapper and spicy pepper sauce",
      isSpicy: true,
      isPopular: true,
    },
    {
      id: "main11",
      name: "Banku and Okro",
      description: "Banku served with okro soup and your choice of fish, chicken or beef",
    },
    {
      id: "main12",
      name: "Fufu and Light Soup",
      description: "Traditional fufu with light soup and your choice of fish, chicken or beef",
    },
    {
      id: "main13",
      name: "Fufu with Chicken Light Soup",
      description: "Fufu with chicken light soup",
    },
    {
      id: "main14",
      name: "Fufu with Red Snapper Light Soup",
      description: "Fufu with red snapper light soup",
    },
    {
      id: "main15",
      name: "Fufu with Beef Light Soup",
      description: "Fufu with beef light soup",
    },
    {
      id: "main16",
      name: "Fisherman's Soup with Red Snapper",
      description: "Rich seafood soup with red snapper (Served with toast, rice or rice balls)",
      isPopular: true,
    },
    {
      id: "main17",
      name: "Fisherman's Soup with Grouper Fillet",
      description: "Rich seafood soup with grouper fillet (Served with toast, rice or rice balls)",
    },
    {
      id: "main18",
      name: "Chicken Indian Curry",
      description: "Aromatic Indian-style chicken curry",
      isSpicy: true,
    },
    {
      id: "main19",
      name: "Chicken with Mushroom Sauce",
      description: "Tender chicken in creamy mushroom sauce (Comes with your choice of a side)",
    },
    {
      id: "main20",
      name: "Stuffed Chicken Fillet",
      description: "Chicken fillet stuffed with savory filling (Comes with your choice of a side)",
    },
    {
      id: "main21",
      name: "Sliced Tenderloin Beef with Vegetables",
      description: "Tender beef slices with fresh vegetables (Comes with your choice of a side)",
    },
    {
      id: "main22",
      name: "Beef Stew",
      description: "Hearty beef stew (Comes with your choice of a side)",
    },
    {
      id: "main23",
      name: "Steak Dinner with One Side",
      description: "Grilled steak served with your choice of side",
      isPopular: true,
    },
    {
      id: "main24",
      name: "Meatballs with Tomato Sauce",
      description: "Savory meatballs in rich tomato sauce (Comes with your choice of a side)",
    },
    {
      id: "main25",
      name: "Beef in Coconut Sauce",
      description: "Tender beef in creamy coconut sauce (Comes with your choice of a side)",
    },
    {
      id: "main26",
      name: "Spaghetti with Tomato Garlic Sauce",
      description: "Classic spaghetti with tomato garlic sauce",
      isVegetarian: true,
    },
    {
      id: "main27",
      name: "Vegetable Olive Oil Garlic Pasta",
      description: "Fresh vegetables with olive oil and garlic pasta",
      isVegetarian: true,
    },
    {
      id: "main28",
      name: "Spicy Delhi Beef Pasta",
      description: "Spicy Indian-style beef pasta",
      isSpicy: true,
    },
    {
      id: "main29",
      name: "Bolognese",
      description: "Classic spaghetti bolognese",
      isPopular: true,
    },
    {
      id: "main30",
      name: "Seafood Pasta",
      description: "Pasta with fresh seafood",
      isPopular: true,
    },
    {
      id: "main31",
      name: "Beef Burger",
      description: "Juicy beef burger served with hand cut fries or yam chips plus coleslaw or side salad",
      isPopular: true,
    },
    {
      id: "main32",
      name: "Fish Burger",
      description: "Fresh fish burger served with hand cut fries or yam chips plus coleslaw or side salad",
    },
    {
      id: "main33",
      name: "Chicken Burger",
      description: "Grilled chicken burger served with hand cut fries or yam chips plus coleslaw or side salad",
      isPopular: true,
    },
    {
      id: "main34",
      name: "Chicken Kebab Plate",
      description: "Chicken kebab with peanut sauce, served with one side of your choice",
    },
    {
      id: "main35",
      name: "Beef Kebab Plate",
      description: "Beef kebab served with one side of your choice",
    },
    {
      id: "main36",
      name: "Seafood Kebab Plate",
      description: "Mixed seafood kebab served with one side of your choice",
    },
    {
      id: "main37",
      name: "Veggie Kebab Plate",
      description: "Grilled vegetable kebab served with one side of your choice",
      isVegetarian: true,
    },
    {
      id: "main38",
      name: "Prawns Kebab Plate",
      description: "Grilled prawns kebab served with one side of your choice",
    },
    {
      id: "main39",
      name: "Grilled Squid Kebab Plate",
      description: "Grilled squid kebab served with one side of your choice",
    },
    {
      id: "main40",
      name: "Whole Red Snapper - Ko-Sa Style",
      description: "Whole red snapper served with sliced vegetables & one side of your choice",
      isPopular: true,
    },
    {
      id: "main41",
      name: "Grilled or Fried Red Snapper",
      description: "Red snapper grilled or fried to perfection, served with one side of your choice",
      isPopular: true,
    },
    {
      id: "main42",
      name: "Grilled Lobster or Prawns",
      description: "Fresh grilled lobster or prawns served with one side of your choice",
    },
    {
      id: "main43",
      name: "Grilled Prawns",
      description: "Succulent grilled prawns served with one side of your choice",
    },
    {
      id: "main44",
      name: "Steamed Grouper in Coconut & Lemongrass",
      description: "Grouper wrapped in banana leaf, steamed with coconut & lemongrass, served with one side of your choice",
      isPopular: true,
    },
    {
      id: "main45",
      name: "Grouper Fillet in Mushroom Sauce",
      description: "Tender grouper fillet in creamy mushroom sauce, served with one side of your choice",
    },
    {
      id: "main46",
      name: "Grouper Fillet in Garlic Butter Sauce",
      description: "Grouper fillet in rich garlic butter sauce, served with one side of your choice",
    },
    {
      id: "main47",
      name: "Squid in Peri Peri Vegetable Stew",
      description: "Spicy peri peri squid with vegetables, served with one side of your choice",
      isSpicy: true,
    },
    {
      id: "main48",
      name: "Seafood Platter (Serves up to 3)",
      description: "Lobster, prawns, grouper, squid with two sides of your choice",
      isPopular: true,
    },
    {
      id: "main49",
      name: "Chicken Sandwich",
      description: "Chicken sandwich served with fries or yam chips plus coleslaw or side salad",
    },
    {
      id: "main50",
      name: "Tuna Sandwich",
      description: "Tuna sandwich served with fries or yam chips plus coleslaw or side salad",
    },
    {
      id: "main51",
      name: "Tomato Mozzarella Basil Sandwich",
      description: "Fresh tomato, mozzarella and basil sandwich served with fries or yam chips plus coleslaw or side salad",
      isVegetarian: true,
    },
    {
      id: "main52",
      name: "Club Sandwich",
      description: "Classic club sandwich served with fries or yam chips plus coleslaw or side salad",
    },
  ];

  const sidesMenu = [
    { id: "side1", name: "Fried Rice", description: "Seasoned fried rice side dish" },
    { id: "side2", name: "Jollof Rice", description: "Traditional jollof rice side dish" },
    { id: "side3", name: "Plain Rice", description: "Steamed white rice" },
    { id: "side4", name: "Mashed Potato", description: "Creamy mashed potatoes" },
    { id: "side5", name: "Sautéed Potato", description: "Sautéed potatoes with herbs" },
    { id: "side6", name: "Hand Cut Fries", description: "Fresh hand-cut french fries" },
    { id: "side7", name: "Fried Plantain", description: "Sweet fried plantain" },
    { id: "side8", name: "Coastal Coleslaw", description: "Fresh coleslaw" },
    { id: "side9", name: "Yam Chips", description: "Crispy yam chips" },
  ];

  const childrensMenu = [
    {
      id: "kid1",
      name: "Fish Basket with Fries",
      description: "Crispy fish basket served with fries",
      isPopular: true,
    },
    {
      id: "kid2",
      name: "Chicken Basket with Fries",
      description: "Golden chicken basket served with fries",
      isPopular: true,
    },
    {
      id: "kid3",
      name: "Spaghetti with Meatballs",
      description: "Kid-friendly spaghetti with meatballs",
    },
    {
      id: "kid4",
      name: "Spaghetti with Beef Sauce",
      description: "Spaghetti with mild beef sauce",
    },
  ];

  const dessertsMenu = [
    {
      id: "des1",
      name: "Auntie Bene's Cookies",
      description: "House-made cookies",
      isPopular: true,
    },
    {
      id: "des2",
      name: "Auntie Bene's Cake",
      description: "Delicious house-made cake",
      isPopular: true,
    },
    {
      id: "des3",
      name: "Ice Cream",
      description: "Creamy ice cream",
    },
    {
      id: "des4",
      name: "Ice Cream Chocolate Sauce",
      description: "Ice cream drizzled with chocolate sauce",
    },
    {
      id: "des5",
      name: "Fried Banana with Chocolate Sauce",
      description: "Sweet fried banana with chocolate sauce",
    },
    {
      id: "des6",
      name: "Fried Banana with Ice Cream & Chocolate Sauce",
      description: "Fried banana topped with ice cream and chocolate sauce",
      isPopular: true,
    },
    {
      id: "des7",
      name: "Crepe (Cinnamon and Brown Sugar)",
      description: "Delicate crepe with cinnamon and brown sugar",
    },
    {
      id: "des8",
      name: "Crepe with Seasonal Fruits",
      description: "Crepe topped with fresh seasonal fruits",
      isPopular: true,
    },
    {
      id: "des9",
      name: "Crepe with Ice Cream",
      description: "Crepe served with ice cream",
    },
    {
      id: "des10",
      name: "Banana Milkshake",
      description: "Thick and creamy banana milkshake",
    },
  ];

  const drinksMenu = [
    {
      id: "drk1",
      name: "African Hibiscus Juice (Bissap)",
      description: "House-made hibiscus juice",
      isPopular: true,
    },
    {
      id: "drk2",
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      isPopular: true,
    },
    {
      id: "drk3",
      name: "Fresh Pineapple Juice",
      description: "Freshly squeezed pineapple juice",
    },
    {
      id: "drk4",
      name: "Mixed Fruit Juice",
      description: "Blend of fresh tropical fruits",
    },
    {
      id: "drk5",
      name: "Banana Milkshake",
      description: "Thick and creamy banana milkshake",
    },
    {
      id: "drk6",
      name: "Smoothie (Seasonal)",
      description: "Fresh seasonal fruit smoothie",
      isPopular: true,
    },
    {
      id: "drk7",
      name: "Mineral Water Small (750ml)",
      description: "Bottled mineral water",
    },
    {
      id: "drk8",
      name: "Mineral Water Large (1.5L)",
      description: "Large bottle mineral water",
    },
    {
      id: "drk9",
      name: "Green/Black Tea",
      description: "Selection of premium teas",
    },
    {
      id: "drk10",
      name: "Glass Milk",
      description: "Fresh cold milk",
    },
    {
      id: "drk11",
      name: "Hot Chocolate",
      description: "Rich hot chocolate",
    },
    {
      id: "drk12",
      name: "Fresh Coffee or Espresso",
      description: "Freshly brewed coffee or espresso",
      isPopular: true,
    },
    {
      id: "drk13",
      name: "Cappuccino",
      description: "Classic Italian cappuccino",
    },
    {
      id: "drk14",
      name: "Caffè Latte",
      description: "Smooth caffè latte",
    },
    {
      id: "drk15",
      name: "Latte Macchiato",
      description: "Layered latte macchiato",
    },
    {
      id: "drk16",
      name: "Ice Coffee",
      description: "Refreshing iced coffee",
    },
  ];

  const winesMenu = [
    {
      id: "wine1",
      name: "4th Street Wine",
      description: "Sweet and fruity wine (750ml)",
      isPopular: true,
    },
    {
      id: "wine2",
      name: "Viceroy Brandy",
      description: "Premium brandy (750ml)",
    },
    {
      id: "wine3",
      name: "Dry Gin",
      description: "Classic dry gin - single shot",
    },
    {
      id: "wine4",
      name: "Gordon's Dry Gin",
      description: "Premium London dry gin (750ml)",
      isPopular: true,
    },
  ];

  const renderMenuItems = (items: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground flex-1">
                {item.name}
              </h3>
              <div className="flex gap-1 flex-shrink-0">
                {item.isPopular && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    Popular
                  </span>
                )}
                {item.isVegetarian && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Leaf className="w-3 h-3" />
                  </span>
                )}
                {item.isSpicy && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Flame className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/772A2416.JPG)` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in text-transparent-bg"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            Taste the Coast
          </h1>
          <p className="text-xl animate-fade-in">Authentic flavors from our beachfront kitchen</p>
        </div>
      </section>

      {/* Dining Options */}
      <section 
        className="py-20 px-4 bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Dining Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food5.JPG)`,
                  filter: 'blur(2px)'
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <CardContent className="p-8 text-center relative z-10">
                <h3 className="text-2xl font-bold mb-3 text-white">Breakfast</h3>
                <p className="text-lg font-semibold text-white mb-4">7:00 AM - 11:00 AM</p>
                <p className="text-white">
                  Continental and traditional Ghanaian breakfast options
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food2.JPG)`,
                  filter: 'blur(2px)'
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <CardContent className="p-8 text-center relative z-10">
                <h3 className="text-2xl font-bold mb-3 text-white">Lunch</h3>
                <p className="text-lg font-semibold text-white mb-4">12:00 PM - 4:00 PM</p>
                <p className="text-white">
                  Light bites, salads, and fresh seafood specialties
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(https://sxprqwspkubfrdannakj.supabase.co/storage/v1/object/public/Assets/Food1.JPG)`,
                  filter: 'blur(2px)'
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <CardContent className="p-8 text-center relative z-10">
                <h3 className="text-2xl font-bold mb-3 text-white">Dinner</h3>
                <p className="text-lg font-semibold text-white mb-4">6:00 PM - 10:00 PM</p>
                <p className="text-white">
                  Fine dining with local and international cuisine
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fresh Preparation Notice */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-primary/10 border-l-4 border-primary rounded-r-lg p-6 text-center">
            <p className="text-lg text-foreground leading-relaxed">
              Please be advised that all of our dishes are prepared fresh from scratch upon ordering. 
              We appreciate your patience, as we believe the best meals are worth the wait.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Tabs */}
      <section 
        className="py-20 px-4 bg-gradient-to-b from-muted to-background"
      >
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-muted/30 p-2">
              <TabsTrigger value="breakfast" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Breakfast
              </TabsTrigger>
              <TabsTrigger value="starters" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Starters & Appetizers
              </TabsTrigger>
              <TabsTrigger value="mains" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Main Courses
              </TabsTrigger>
              <TabsTrigger value="sides" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sides
              </TabsTrigger>
              <TabsTrigger value="children" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Children's Menu
              </TabsTrigger>
              <TabsTrigger value="desserts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Desserts
              </TabsTrigger>
              <TabsTrigger value="drinks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Beverages
              </TabsTrigger>
              <TabsTrigger value="wines" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Wine & Spirits
              </TabsTrigger>
            </TabsList>

            <div className="mt-12">
              <TabsContent value="breakfast">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Breakfast</h2>
                  <p className="text-muted-foreground">Start your day with our delicious breakfast selections</p>
                </div>
                {renderMenuItems(breakfastMenu)}
              </TabsContent>

              <TabsContent value="starters">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Starters & Appetizers</h2>
                  <p className="text-muted-foreground">Perfect beginnings to your culinary journey</p>
                </div>
                {renderMenuItems(startersMenu)}
              </TabsContent>

              <TabsContent value="mains">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Main Courses</h2>
                  <p className="text-muted-foreground">Signature dishes featuring the finest ingredients</p>
                </div>
                {renderMenuItems(mainsMenu)}
              </TabsContent>

              <TabsContent value="sides">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Sides</h2>
                  <p className="text-muted-foreground">Perfect accompaniments to your main course</p>
                </div>
                {renderMenuItems(sidesMenu)}
              </TabsContent>

              <TabsContent value="children">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Children's Menu</h2>
                  <p className="text-muted-foreground">Delicious and nutritious meals for our little guests</p>
                </div>
                {renderMenuItems(childrensMenu)}
              </TabsContent>

              <TabsContent value="desserts">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Desserts</h2>
                  <p className="text-muted-foreground">Sweet endings to complete your dining experience</p>
                </div>
                {renderMenuItems(dessertsMenu)}
              </TabsContent>

              <TabsContent value="drinks">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Beverages</h2>
                  <p className="text-muted-foreground">Refreshing drinks to complement your meal</p>
                </div>
                {renderMenuItems(drinksMenu)}
              </TabsContent>

              <TabsContent value="wines">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Wine & Spirits Selection</h2>
                  <p className="text-muted-foreground">Carefully curated wines and spirits</p>
                </div>
                {renderMenuItems(winesMenu)}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Restaurant;