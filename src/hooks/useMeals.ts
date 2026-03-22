import { useState, useEffect } from 'react';
import { Meal, Category } from '../types';
import { mealService } from '../services/mealService';

export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const [allMeals, allCats] = await Promise.all([
        mealService.getMeals(),
        mealService.getCategories(),
      ]);
      setMeals(allMeals);
      setCategories(allCats);
      setLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    async function filterMeals() {
      setLoading(true);
      const filtered = await mealService.getMeals(selectedCategory);
      setMeals(filtered);
      setLoading(false);
    }
    filterMeals();
  }, [selectedCategory]);

  return {
    meals,
    categories,
    selectedCategory,
    setSelectedCategory,
    loading,
  };
}
