import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Restaurant = () => {
  // All menu data organized by section
  const breakfastMenu = [
    {
      title: "KO-SA BREAKFAST",
      dishes: [
        { name: "Toast with margarine / jam / fried or boiled egg / fruit / Nescafe or Tea" },
        { name: "Toast with margarine / jam / fried or boiled egg / fruit / Fresh Coffee" },
        { name: "Toast with margarine / jam or honey" }
      ]
    },
    {
      title: "EGGS",
      dishes: [
        { name: "Fried egg / Boiled egg / Scrambled egg" },
        { name: "Vegetable omelet" },
        { name: "Cheese omelet" },
        { name: "Vegetable sausage omelet" }
      ]
    },
    {
      title: "SANDWICHES",
      dishes: [
        { name: "Cheese Egg" },
        { name: "Cheese Tomato" },
        { name: "Tuna" },
        { name: "Tuna Cheese" },
        { name: "Ham Cheese" },
        { name: "Tomato Mozzarella Basil" },
        { name: "Chicken" },
        { name: "Chicken Curry" }
      ]
    },
    {
      title: "PANCAKES",
      dishes: [
        { name: "Pancake Plain", description: "2 pieces" },
        { name: "Pancake", description: "Choose 1: Pineapple / Banana / Honey or Chocolate" }
      ]
    },
    {
      title: "CEREALS",
      dishes: [
        { name: "Cooked Oats" },
        { name: "Cornflakes with milk" },
        { name: "Muesli with milk and fruit" }
      ]
    },
    {
      title: "FRUIT",
      dishes: [
        { name: "Fruit bowl small" },
        { name: "Fruit bowl big" }
      ]
    }
  ];

  const startersMenu = [
    {
      title: "STARTERS",
      dishes: [
        { name: "Bruschetta Tomato", description: "4 pieces" },
        { name: "Spring rolls", description: "2 pieces" },
        { name: "Fresh Tomato-vegetable soup with toast" },
        { name: "Chicken soup with toast" }
      ]
    },
    {
      title: "SMALL SALADS",
      dishes: [
        { name: "Mixed salad", description: "Tomato - cucumber - olives - onion - lettuce and when available avocado with toast" },
        { name: "Spring vegetable salad with toast" },
        { name: "Mandarin Chicken salad with toast" }
      ],
      note: "Salads with Balsamic or Honey-mustard dressing"
    }
  ];

  const mainDishesMenu = [
    {
      title: "BIG SALADS",
      dishes: [
        { name: "Mixed Salad", description: "Tomato, cucumber, olives, onion, lettuce and when available avocado with toast" },
        { name: "Chicken Salad", description: "With toast" }
      ],
      note: "Salads with Balsamic or Honey-mustard dressing"
    },
    {
      title: "SOUP",
      dishes: [
        { name: "Fisherman's Soup with Toast", description: "Fillet or with bones" },
        { name: "Fisherman's Soup Rice", description: "Fillet or with bones" }
      ]
    },
    {
      title: "CHICKEN",
      dishes: [
        { name: "Grilled or Fried Chicken" },
        { name: "Chicken Kebab", description: "2 pieces with peanut sauce" },
        { name: "Chicken Fillet with Indian Curry" },
        { name: "Chicken Fillet", description: "With sliced vegetables and saffron rice" },
        { name: "Chicken Fillet in Creamy Mushroom Sauce" }
      ],
      note: "Please choose 1 side dish - plain, jollof or fried rice - mashed or sautéed potato - potato or yam chips or small mixed salad"
    },
    {
      title: "BEEF",
      dishes: [
        { name: "Beef Stew" },
        { name: "Meat Balls" },
        { name: "Shredded Beef with Vegetables" },
        { name: "Beef in Coconut Sauce" }
      ],
      note: "Please choose 1 side dish - plain, jollof or fried rice - mashed or sautéed potato - potato or yam chips or small mixed salad"
    },
    {
      title: "PASTA",
      dishes: [
        { name: "Noodle's or Spaghetti with Tomato Garlic Sauce" },
        { name: "Noodle's or Spaghetti with Vegetable-Olive-Oil-Garlic" },
        { name: "Delhi with Beef" },
        { name: "Bolognese" },
        { name: "Pasta Seafood", description: "Not always available" }
      ],
      note: "With Cheese 15 extra"
    },
    {
      title: "BURGERS",
      dishes: [
        { name: "Beef Burger", description: "With chips" },
        { name: "Cheese Burger", description: "With chips" },
        { name: "Chicken Burger", description: "With chips" },
        { name: "Chicken Cheese Burger", description: "With chips" }
      ]
    },
    {
      title: "SANDWICHES",
      dishes: [
        { name: "Cheese Egg" },
        { name: "Cheese Tomato" },
        { name: "Tuna" },
        { name: "Tuna Cheese" },
        { name: "Ham Cheese" },
        { name: "Tomato Mozzarella Basil" },
        { name: "Chicken" },
        { name: "Chicken Cheese" },
        { name: "Chicken Curry" },
        { name: "Club Sandwich", description: "With chips" }
      ]
    },
    {
      title: "KO-SA SPECIALS",
      dishes: [
        { name: "Grilled Lobster" },
        { name: "Grilled Prawns" },
        { name: "Stuffed Chicken Fillet" },
        { name: "Fish Fillet", description: "With sliced vegetables and saffron rice" },
        { name: "Chicken Fillet in Honey Sauce", description: "With rice" }
      ]
    },
    {
      title: "SEAFOOD",
      dishes: [
        { name: "Grilled or Fried Snapper" },
        { name: "Grilled Fish Ko-Sa Style", description: "With sliced vegetables" },
        { name: "Fish Fillet Steamed", description: "With coconut and lemongrass in banana leaf (preparation time 1.15 hour)" },
        { name: "Fish Fillet in Creamy Mushroom Sauce" },
        { name: "Fish Fillet in Garlic Butter Sauce" },
        { name: "Pan Fried Sole", description: "With butter and lemon" },
        { name: "Octopus (Squid) Peri Peri" }
      ],
      note: "Please choose 1 side dish - plain, jollof or fried rice - mashed or sautéed potato - potato or yam chips or small mixed salad"
    },
    {
      title: "GHANAIAN AND VEGETARIAN",
      dishes: [
        { name: "Chips with Fried Egg" },
        { name: "Fried Rice with Fried Egg" },
        { name: "Red Red" },
        { name: "Red Red with Chicken" },
        { name: "Red Red with Fish" },
        { name: "Yam Balls", description: "With vegetable sauce" },
        { name: "Soubisy", description: "Rice with vegetables and groundnuts" },
        { name: "Plain Rice", description: "With vegetables in creamy mushroom sauce" },
        { name: "Vegetables with Pineapple", description: "In a curry sauce" },
        { name: "Pasta Delhi with Vegetables" }
      ]
    },
    {
      title: "GHANAIAN DISHES - ON EARLY REQUEST",
      dishes: [
        { name: "Omo Tuo" },
        { name: "Omo Tuo Chicken" },
        { name: "Omo Tuo Fish" },
        { name: "Banku with Pepper Sauce" },
        { name: "Banku with Pepper Sauce Chicken" },
        { name: "Banku with Pepper Sauce Fish" },
        { name: "Fufu with Light Soup" },
        { name: "Fufu with Light Soup Chicken" },
        { name: "Fufu with Light Soup Fish" }
      ]
    }
  ];

  const childrensMenu = [
    {
      title: "PASTA",
      dishes: [
        { name: "Noodles or Spaghetti with Tomato Sauce" },
        { name: "Noodles or Spaghetti with Cheese Sauce" },
        { name: "Noodles or Spaghetti with Bolognese" }
      ]
    },
    {
      title: "MAIN COURSES",
      dishes: [
        { name: "Chicken Fillet with Rice or Chips" },
        { name: "Chicken Sausage with Rice or Chips" },
        { name: "Chicken Kebab", description: "1 stick with rice or chips" },
        { name: "Meat Balls", description: "2 pieces with mashed potatoes, rice or chips" },
        { name: "Fish Basket with Rice or Chips" }
      ]
    }
  ];

  const dessertMenu = [
    {
      title: "DESSERT",
      dishes: [
        { name: "1 Scoop of Ice Cream" },
        { name: "1 Scoop of Ice Cream with Chocolate Sauce" },
        { name: "Fried Banana with Chocolate Sauce" },
        { name: "Fried Banana with Ice Cream" },
        { name: "Fried Banana with Ice Cream and Chocolate Sauce" },
        { name: "Fruit Bowl Small" },
        { name: "Fruit Bowl Big" },
        { name: "Fruit with 1 Scoop of Ice Cream" },
        { name: "Pancake Plain", description: "2 pieces" },
        { name: "Pancake", description: "Choose 1: Pineapple / Banana / Honey or Chocolate" },
        { name: "Pancake with Ice Cream" }
      ],
      note: "When available try our Apple Pie with Fresh Coffee or Ice Cream"
    }
  ];

  const drinksMenu = [
    {
      title: "HOT BEVERAGES",
      dishes: [
        { name: "Tea" },
        { name: "Nescafe" },
        { name: "Fresh Coffee or Espresso" },
        { name: "Cappuccino Small" },
        { name: "Cappuccino Big" },
        { name: "Caffe Latte" },
        { name: "Latte Macchiato" },
        { name: "Ice Coffee", description: "Double Espresso, sugar, milk and ice cubes" }
      ]
    },
    {
      title: "COLD BEVERAGES",
      dishes: [
        { name: "Glass Milk" },
        { name: "Milo" },
        { name: "Homemade African Hibiscus Juice (Bissap)" },
        { name: "Homemade Fresh Orange Juice" },
        { name: "Homemade Fresh Pineapple Juice" },
        { name: "Homemade Mixed Fruit Juice" },
        { name: "Banana Milkshake" },
        { name: "Smoothie" },
        { name: "Mineral Water Small", description: "750ml" },
        { name: "Mineral Water Big", description: "1.5ltr" },
        { name: "Soft Drinks", description: "Coke - Sprite - Fanta - Tonic - Alvaro" },
        { name: "Malt" }
      ]
    },
    {
      title: "ALCOHOLIC DRINKS",
      dishes: [
        { name: "Small Beer" },
        { name: "Hunters Gold or Hunters Dry" },
        { name: "Savanna Dry" },
        { name: "Big Beer" },
        { name: "Guinness" },
        { name: "Smirnoff Ice" },
        { name: "Heineken", description: "0.33ml" }
      ]
    },
    {
      title: "COCKTAILS",
      dishes: [
        { name: "Gin Tonic", description: "2 shots" },
        { name: "Fresh Pineapple Juice with Gin", description: "2 shots" },
        { name: "Fresh Orange Juice with Mandingo", description: "2 shots" },
        { name: "Fresh Pineapple Juice with Rum" },
        { name: "Fresh Orange Juice with Vodka" },
        { name: "Fresh Mixed Juice with Rum" },
        { name: "Fresh Orange Juice with Blue Curacao" },
        { name: "Hibiscus Royale", description: "White wine with African Hibiscus" },
        { name: "Mixed Juice with Coconut Milk, Gin and Tonic" },
        { name: "Pina Colada" }
      ]
    },
    {
      title: "MOCKTAILS",
      dishes: [
        { name: "Fresh Pineapple Juice with Coconut Milk" },
        { name: "Fresh Pineapple Juice with Bissap" },
        { name: "Fresh Mixed Juice with Tonic or Soda" },
        { name: "Fresh Pineapple Juice, Coconut Milk and Bissap" },
        { name: "Fresh Pineapple Juice, Coconut Milk and Tonic" },
        { name: "Fresh Mixed Juice, Bissap with Tonic or Soda" },
        { name: "Fresh Orange Juice, Blue Curacao", description: "0%" }
      ]
    },
    {
      title: "SINGLE SHOTS",
      dishes: [
        { name: "Old Admiral Brandy, Kasapreko Gin or Mandingo" },
        { name: "Takai", description: "African Coffee Liquor" },
        { name: "Pastis" },
        { name: "Bermuda Rum" },
        { name: "Johnnie Walker Red or Black & White", description: "Whisky" },
        { name: "Bombay Sapphire or New Amsterdam", description: "Gin" },
        { name: "Bacardi White, Bacardi Gold", description: "Rum" },
        { name: "Absolut or Smirnoff Red", description: "Vodka" },
        { name: "Martini Bianco, Campari, Kahlua, Baileys, Tequila or Di Amore Amaretto" }
      ]
    }
  ];

  const koOkiCocktails = [
    {
      title: "KO-OKI BAR COCKTAILS",
      dishes: [
        { name: "Malibu Beach", description: "Malibu, soda, pineapple juice" },
        { name: "Red Dream", description: "Gin, lime cordial, sugar, bissap" },
        { name: "Cuba Libre", description: "Bacardi gold, lime cordial, coke" },
        { name: "Beach Boy", description: "Bacardi gold, lime cordial, sugar" },
        { name: "Blue Moon", description: "Absolut vodka, Blue curacao, orange juice" },
        { name: "Sea Breeze Coffee", description: "Espresso, Absolut vodka, Kahlua" },
        { name: "Ko-Sa Summer Shooter", description: "Kahlua, Absolut vodka, Pineapple juice" },
        { name: "Lady in Blue", description: "Blue curacao, gin, lime juice" },
        { name: "Sex on the Beach", description: "Vodka, Peach schnapps, orange juice, Cranberry juice" },
        { name: "Caipivodka on the Shore", description: "Absolut vodka, sugar, lime, soda" },
        { name: "Vanilla Kahlua Ice", description: "Baileys, Kahlua, vanilla ice cream" },
        { name: "Ko-Sa Iced Tea", description: "Absolut vodka, Bacardi superior, Tequila, gin, Campari, lemon juice, grenadine, coke" },
        { name: "Long Island", description: "Vodka, triple sec, Gin, Rum, Tequila, Lemon juice" },
        { name: "Tequila Sunrise", description: "Tequila, Orange juice, Grenadine Syrup" },
        { name: "Classic Gin & Tonic", description: "Gin, tonic, lemon, cucumber" },
        { name: "Spicy Gin(ger) & Tonic", description: "Bombay Saphire Gin, tonic, fresh ginger" },
        { name: "Ko-Oki Cocktail", description: "Malibu, Absolut vodka, Pineapple juice, grenadine" }
      ]
    }
  ];

  const winesMenu = [
    {
      title: "WHITE WINES",
      dishes: [
        { 
          name: "Nederburg - Sauvignon Blanc", 
          description: "2020 - 13.5% - South Africa. Crisp and medium bodied with delicious combination of tropical and herbaceous notes" 
        },
        { 
          name: "Fleur Du Cap - Sauvignon Blanc", 
          description: "2022 - 12.5% - South Africa. Very fresh, high in complexity, green tones of apple, elderflower, citrus lime and pineapple" 
        }
      ]
    },
    {
      title: "RED WINES",
      dishes: [
        { 
          name: "Zonnebloem - Cabernet Sauvignon", 
          description: "2020 - 14% - South Africa. Aromas of blackcurrants, dark berries, raspberries and oak spice" 
        },
        { 
          name: "Nederburg - Baronne", 
          description: "2020 - 13.5% - South Africa. This noble red blend has a rich heritage, a true South African classic" 
        }
      ]
    },
    {
      title: "HOUSE WINES",
      dishes: [
        { 
          name: "Whispering Mountain - Sauvignon Blanc (White)", 
          description: "2023 - 13.5% - South Africa. Crisp and fresh with hints of passionfruit and ripe tropical flavours on the nose. Available by glass or bottle" 
        },
        { 
          name: "Whispering Mountain - Cabernet Sauvignon (Red)", 
          description: "2021 - 14% - South Africa. Easy drinking wine with upfront red berries. Available by glass or bottle" 
        }
      ],
      note: "Cork fee for bottles from outside"
    }
  ];

  const renderMenuSection = (menuData: any[]) => (
    <div className="space-y-16">
      {menuData.map((category, idx) => (
        <div key={idx} className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground border-b-2 border-primary pb-2">
            {category.title}
          </h2>
          
          {category.image && (
            <div className="relative h-80 rounded-lg overflow-hidden mb-6 bg-muted/20">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.dishes.map((dish: any, dishIdx: number) => (
              <Card key={dishIdx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {dish.name}
                  </h3>
                  {dish.description && (
                    <p className="text-sm text-muted-foreground">
                      {dish.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {category.note && (
            <p className="text-sm italic text-muted-foreground mt-4 p-3 bg-muted/30 rounded-md">
              {category.note}
            </p>
          )}
        </div>
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
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Taste the Coast</h1>
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
                Starters
              </TabsTrigger>
              <TabsTrigger value="main-dishes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Main Dishes
              </TabsTrigger>
              <TabsTrigger value="childrens-menu" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Children's Menu
              </TabsTrigger>
              <TabsTrigger value="dessert" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Dessert
              </TabsTrigger>
              <TabsTrigger value="drinks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Drinks Menu
              </TabsTrigger>
              <TabsTrigger value="ko-oki-cocktails" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Ko-Oki Cocktails
              </TabsTrigger>
              <TabsTrigger value="wines" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Wines
              </TabsTrigger>
            </TabsList>

            <div className="mt-12">
              <TabsContent value="breakfast">
                {renderMenuSection(breakfastMenu)}
              </TabsContent>

              <TabsContent value="starters">
                {renderMenuSection(startersMenu)}
              </TabsContent>

              <TabsContent value="main-dishes">
                {renderMenuSection(mainDishesMenu)}
              </TabsContent>

              <TabsContent value="childrens-menu">
                {renderMenuSection(childrensMenu)}
              </TabsContent>

              <TabsContent value="dessert">
                {renderMenuSection(dessertMenu)}
              </TabsContent>

              <TabsContent value="drinks">
                {renderMenuSection(drinksMenu)}
              </TabsContent>

              <TabsContent value="ko-oki-cocktails">
                {renderMenuSection(koOkiCocktails)}
              </TabsContent>

              <TabsContent value="wines">
                {renderMenuSection(winesMenu)}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Restaurant;