import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Category } from '@/types';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (name: string) => void;
}

export function CategoryList({ categories, selectedCategory, onSelectCategory }: CategoryListProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[(colorScheme as 'light' | 'dark') ?? 'light'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          onPress={() => onSelectCategory(cat.name)}
          style={[
            styles.item,
            selectedCategory === cat.name && { backgroundColor: theme.primary },
            selectedCategory !== cat.name && { borderColor: theme.border, borderWidth: 1 }
          ]}>
          <Text style={[styles.text, selectedCategory === cat.name ? { color: theme.background } : { color: theme.icon }]}>
            {cat.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 24,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
