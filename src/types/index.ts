export interface Ingredient {
  name: string;
  amount: string;
}

export interface Step {
  order: number;
  description: string;
}

export interface Meal {
  id: string;
  title: string;
  category: string;
  duration: string;
  rating: string;
  image: any;
  calories: string;
  protein?: string;
  carbs?: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  isFavorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
