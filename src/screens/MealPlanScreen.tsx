import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PlannerHeader from '@/components/planner/PlannerHeader';
import DietProgress from '@/components/planner/DietProgress';
import MealCard from '@/components/planner/MealCard';

const TODAY_MEALS = [
  {
    id: '1',
    type: 'Breakfast',
    title: 'Avocado Toast & Eggs',
    time: '08:30 AM',
    calories: '420 kcal',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&auto=format&fit=crop&q=60',
    completed: true,
  },
  {
    id: '2',
    type: 'Lunch',
    title: 'Grilled Salmon Salad',
    time: '01:00 PM',
    calories: '550 kcal',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
    completed: false,
  },
  {
    id: '3',
    type: 'Dinner',
    title: 'Beef & Broccoli Stir Fry',
    time: '07:30 PM',
    calories: '480 kcal',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60',
    completed: false,
  },
];

export default function MealPlanScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <PlannerHeader />
        <DietProgress />

        <View style={styles.timelineWrapper}>
          {TODAY_MEALS.map((meal) => (
            <MealCard
              key={meal.id}
              type={meal.type}
              title={meal.title}
              time={meal.time}
              calories={meal.calories}
              image={meal.image}
              completed={meal.completed}
            />
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  timelineWrapper: {
    marginTop: 10,
  },
});
