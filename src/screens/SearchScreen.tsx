import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { MealCard } from '@/components/MealCard';
import { BackgroundWrapper } from '@/components/common/BackgroundWrapper';
import { ThemedText } from '@/components/common/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { mealService } from '@/services/mealService';
import { Meal } from '@/types';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setLoading(true);
        const fetchedMeals = await mealService.getMeals(searchQuery);
        setResults(fetchedMeals);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <BackgroundWrapper>
      <View style={styles.header}>
        <ThemedText type="h2" style={styles.title}>Search Recipes</ThemedText>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <Ionicons name="search-outline" size={20} color={theme.icon} />
        <TextInput
          placeholder="What's in your fridge?"
          placeholderTextColor={theme.icon}
          style={[styles.searchInput, { color: theme.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={theme.icon} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.resultsList}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 40 }} />
        ) : searchQuery.length > 2 ? (
          results.length > 0 ? (
            results.map((meal) => (
              <MealCard key={meal.id} {...meal} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={64} color={theme.border} />
              <ThemedText colorType="icon" style={styles.emptyText}>No recipes found for "{searchQuery}"</ThemedText>
            </View>
          )
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={64} color={theme.border} />
            <ThemedText colorType="icon" style={styles.emptyText}>Try searching for "Pizza", "Salad", or "Italian"</ThemedText>
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
  },
  title: {
    marginBottom: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  resultsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
