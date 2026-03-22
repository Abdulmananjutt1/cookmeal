import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { BackgroundWrapper } from '@/components/common/BackgroundWrapper';
import { ThemedText } from '@/components/common/ThemedText';
import { MealCard } from '@/components/MealCard';
import { mealService } from '@/services/mealService';
import { Meal, Category } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

export default function ExploreRecipesScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingMeals, setTrendingMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [cats, meals] = await Promise.all([
      mealService.getCategories(),
      mealService.getTrendingRecipes()
    ]);
    setCategories(cats);
    setTrendingMeals(meals);
    setLoading(false);
  };

  const handleCategoryPress = async (categoryId: string) => {
    setActiveCategory(categoryId);
    setLoading(true);
    const meals = await mealService.getMeals('', categoryId);
    setTrendingMeals(meals);
    setLoading(false);
  };

  if (loading && trendingMeals.length === 0) {
    return (
      <BackgroundWrapper style={styles.centered}>
        <ActivityIndicator size="large" color={theme.primary} />
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header with Gradient Background */}
        <View style={styles.header}>
          <LinearGradient
            colors={[theme.primary, theme.primary + 'CC']}
            style={styles.headerGradient}
          >
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={22} color={theme.white} />
            </TouchableOpacity>
            <ThemedText type="h1" style={styles.headerTitle}>Discover</ThemedText>
            <ThemedText style={styles.headerSubtitle}>Find your next favorite meal</ThemedText>
          </LinearGradient>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <ThemedText type="h3">Categories</ThemedText>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.id}
              onPress={() => handleCategoryPress(cat.id)}
              style={[
                styles.categoryChip, 
                { backgroundColor: activeCategory === cat.id ? theme.primary : theme.surface }
              ]}
            >
              <Ionicons 
                name={cat.icon as any} 
                size={18} 
                color={activeCategory === cat.id ? theme.white : theme.icon} 
              />
              <ThemedText 
                style={[
                  styles.categoryText, 
                  { color: activeCategory === cat.id ? theme.white : theme.text }
                ]}
              >
                {cat.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending/Results Section */}
        <View style={styles.sectionHeader}>
          <ThemedText type="h3">
            {activeCategory === 'all' ? 'Trending Recipes' : `${activeCategory} Recipes`}
          </ThemedText>
          {loading && <ActivityIndicator size="small" color={theme.primary} />}
        </View>
        
        <View style={styles.listContainer}>
          {trendingMeals.map((meal) => (
            <MealCard key={meal.id} {...meal} grid={true} />
          ))}
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    height: 200,
    marginBottom: 20,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  headerTitle: {
    color: '#FFFFFF', // Keep white for contrast on gradient
    fontSize: 40,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    fontWeight: '700',
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
