import { Meal, Category, Ingredient, Step } from '../types';

const SPOONACULAR_API_KEY = 'YOUR_API_KEY_HERE'; // User needs to replace this
const BASE_URL = 'https://api.spoonacular.com/recipes';

const mapSpoonacularToMeal = (recipe: any): Meal => {
  const nutrients = recipe.nutrition?.nutrients || [];
  const findNutrient = (name: string) => nutrients.find((n: any) => n.name === name)?.amount + ' ' + nutrients.find((n: any) => n.name === name)?.unit;

  return {
    id: recipe.id.toString(),
    title: recipe.title,
    category: recipe.dishTypes?.[0] || 'Main Course',
    duration: `${recipe.readyInMinutes} min`,
    rating: (recipe.spoonacularScore / 20).toFixed(1), // Convert 100-scale to 5-scale
    image: { uri: recipe.image },
    calories: findNutrient('Calories') || '0 kcal',
    protein: findNutrient('Protein') || '0g',
    carbs: findNutrient('Carbohydrates') || '0g',
    description: recipe.summary?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...', // Clean HTML and truncate
    ingredients: recipe.extendedIngredients?.map((ing: any): Ingredient => ({
      name: ing.name,
      amount: `${ing.amount} ${ing.unit}`
    })) || [],
    steps: recipe.analyzedInstructions?.[0]?.steps?.map((step: any): Step => ({
      order: step.number,
      description: step.step
    })) || [],
    isFavorite: false,
  };
};

const MOCK_FALLBACK: Meal[] = [
  {
    id: '716429',
    title: 'Pasta with Garlic, Scallions, and Pepper',
    category: 'Lunch',
    duration: '45 min',
    rating: '4.8',
    image: { uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60' },
    calories: '584 kcal',
    protein: '12g',
    carbs: '82g',
    description: 'A classic pasta dish with a kick of garlic and fresh scallions. Perfect for a quick and healthy meal.',
    ingredients: [
      { name: 'Pasta', amount: '200g' },
      { name: 'Garlic', amount: '4 cloves' },
      { name: 'Scallions', amount: '3 stalks' },
      { name: 'Olive Oil', amount: '2 tbsp' },
      { name: 'Black Pepper', amount: '1 tsp' },
      { name: 'Parmesan', amount: '30g' }
    ],
    steps: [
      { order: 1, description: 'Bring a large pot of salted water to a boil.' },
      { order: 2, description: 'Add pasta and cook according to package instructions.' },
      { order: 3, description: 'In a large skillet, sauté minced garlic and sliced scallions in olive oil until fragrant.' },
      { order: 4, description: 'Drain pasta and toss with the garlic and scallion mixture.' },
      { order: 5, description: 'Season with plenty of black pepper and top with fresh parmesan.' }
    ],
    isFavorite: false,
  },
  {
    id: '715538',
    title: 'Bruschetta with Tomato and Basil',
    category: 'Appetizer',
    duration: '15 min',
    rating: '4.9',
    image: { uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60' },
    calories: '210 kcal',
    protein: '5g',
    carbs: '30g',
    description: 'Toasted bread topped with fresh tomatoes and aromatic basil. A Mediterranean classic.',
    ingredients: [
      { name: 'Baguette', amount: '1 loaf' },
      { name: 'Roma Tomatoes', amount: '4 large' },
      { name: 'Fresh Basil', amount: '1 bunch' },
      { name: 'Balsamic Glaze', amount: '2 tbsp' },
      { name: 'Extra Virgin Olive Oil', amount: '3 tbsp' }
    ],
    steps: [
      { order: 1, description: 'Slice baguette into 1-inch thick pieces.' },
      { order: 2, description: 'Toast the bread until golden brown.' },
      { order: 3, description: 'Dice tomatoes and chop basil, then mix in a bowl with olive oil.' },
      { order: 4, description: 'Top each slice of bread with the tomato mixture.' },
      { order: 5, description: 'Drizzle with balsamic glaze right before serving.' }
    ],
    isFavorite: false,
  }
];

export const mealService = {
  getMeals: async (query: string = '', category?: string): Promise<Meal[]> => {
    try {
      if (!SPOONACULAR_API_KEY || SPOONACULAR_API_KEY === 'YOUR_API_KEY_HERE') {
        return MOCK_FALLBACK;
      }

      const response = await fetch(
        `${BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&type=${category === 'all' ? '' : category}&addRecipeInformation=true&addRecipeNutrition=true&number=10`
      );
      const data = await response.json();
      return data.results.length > 0 ? data.results.map(mapSpoonacularToMeal) : MOCK_FALLBACK;
    } catch (error) {
      console.error('Error fetching meals:', error);
      return MOCK_FALLBACK;
    }
  },

  getTrendingRecipes: async (): Promise<Meal[]> => {
    try {
      if (!SPOONACULAR_API_KEY || SPOONACULAR_API_KEY === 'YOUR_API_KEY_HERE') {
        return MOCK_FALLBACK;
      }

      const response = await fetch(
        `${BASE_URL}/random?apiKey=${SPOONACULAR_API_KEY}&number=15`
      );
      const data = await response.json();
      return data.recipes.length > 0 ? data.recipes.map(mapSpoonacularToMeal) : MOCK_FALLBACK;
    } catch (error) {
      console.error('Error fetching trending meals:', error);
      return MOCK_FALLBACK;
    }
  },

  getMealById: async (id: string): Promise<Meal | undefined> => {
    try {
      if (!SPOONACULAR_API_KEY || SPOONACULAR_API_KEY === 'YOUR_API_KEY_HERE') {
        const fallback = MOCK_FALLBACK.find(m => m.id === id) || MOCK_FALLBACK[0];
        return fallback;
      }

      const response = await fetch(
        `${BASE_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=true`
      );
      const recipe = await response.json();
      return mapSpoonacularToMeal(recipe);
    } catch (error) {
      console.error('Error fetching meal details:', error);
      const fallback = MOCK_FALLBACK.find(m => m.id === id) || MOCK_FALLBACK[0];
      return fallback;
    }
  },

  getCategories: async (): Promise<Category[]> => {
    return [
      { id: 'all', name: 'All', icon: 'restaurant' },
      { id: 'breakfast', name: 'Breakfast', icon: 'sunny' },
      { id: 'lunch', name: 'Lunch', icon: 'fast-food' },
      { id: 'dinner', name: 'Dinner', icon: 'moon' },
      { id: 'snack', name: 'Snack', icon: 'leaf' },
    ];
  },

  toggleFavorite: async (id: string): Promise<void> => {
    // This would typically involve local storage or a backend
    console.log('Toggling favorite for:', id);
  }
};
