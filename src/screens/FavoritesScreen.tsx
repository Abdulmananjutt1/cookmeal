import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { MealCard } from '@/components/MealCard';
import { BackgroundWrapper } from '@/components/common/BackgroundWrapper';
import { ThemedText } from '@/components/common/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { mealService } from '@/services/mealService';
import { Meal } from '@/types';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const fetchFavorites = async () => {
    setLoading(true);
    const allMeals = await mealService.getMeals();
    setFavorites(allMeals.filter(m => m.isFavorite));
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, [])
  );

  return (
    <BackgroundWrapper>
      <View style={styles.header}>
        <ThemedText type="h2" style={styles.title}>Your Favorites</ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 40 }} />
        ) : favorites.length > 0 ? (
          favorites.map((meal) => (
            <MealCard key={meal.id} {...meal} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color={theme.border} />
            <ThemedText colorType="icon" style={styles.emptyText}>You haven't saved any recipes yet. Tap the heart icon on a recipe to save it here!</ThemedText>
          </View>
        )}
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  title: {
    marginBottom: 4,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
