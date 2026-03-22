import { useState, useEffect } from 'react';
import { Meal } from '../types';
import { mealService } from '../services/mealService';

export function useMealDetails(id: string) {
  const [meal, setMeal] = useState<Meal | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const data = await mealService.getMealById(id);
      setMeal(data);
      setLoading(false);
    }
    if (id) {
      fetchDetails();
    }
  }, [id]);

  return { meal, loading };
}
