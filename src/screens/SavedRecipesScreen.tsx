import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2;

const SAVED_RECIPES = [
  {
    id: '1',
    title: 'Avocado Toast Lux',
    calories: '320',
    time: '10 min',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500&auto=format&fit=crop',
    category: 'Breakfast',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Quinoa Buddha Bowl',
    calories: '450',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop',
    category: 'Lunch',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Grilled Salmon',
    calories: '550',
    time: '35 min',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=500&auto=format&fit=crop',
    category: 'Dinner',
    rating: 5.0
  },
  {
    id: '4',
    title: 'Berry Smoothie',
    calories: '210',
    time: '5 min',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=500&auto=format&fit=crop',
    category: 'Breakfast',
    rating: 4.7
  },
  {
    id: '5',
    title: 'Mediterranean Salad',
    calories: '280',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500&auto=format&fit=crop',
    category: 'Lunch',
    rating: 4.6
  },
  {
    id: '6',
    title: 'Mushroom Risotto',
    calories: '480',
    time: '40 min',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=500&auto=format&fit=crop',
    category: 'Dinner',
    rating: 4.9
  }
];

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export default function SavedRecipesScreen() {
  const { theme, isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = SAVED_RECIPES.filter(recipe => {
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderRecipeCard = ({ item }: { item: typeof SAVED_RECIPES[0] }) => (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
      <View style={[styles.cardMask, { backgroundColor: theme.surface }]}>
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.imageOverlay}
        />

        <View style={styles.topBadges}>
          <View style={[styles.badge, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
             <Ionicons name="star" size={10} color="#FFD700" />
             <Text style={styles.badgeText}>{item.rating}</Text>
          </View>
          <TouchableOpacity style={styles.heartButton}>
             <Ionicons name="heart" size={18} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.recipeTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.metaRow}>
             <View style={styles.metaItem}>
                <Ionicons name="timer-outline" size={12} color={theme.placeholder} />
                <Text style={[styles.metaText, { color: theme.placeholder }]}>{item.time}</Text>
             </View>
             <View style={styles.metaItem}>
                <Ionicons name="flame-outline" size={12} color={theme.placeholder} />
                <Text style={[styles.metaText, { color: theme.placeholder }]}>{item.calories} kcal</Text>
             </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper title="Saved Recipes" showBack={true}>
      <View style={styles.container}>
        {/* Glassmorphism Search */}
        <View style={[styles.searchWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderColor: theme.border }]}>
          <Ionicons name="search" size={20} color={theme.placeholder} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search your library..."
            placeholderTextColor={theme.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  selectedCategory === item && { backgroundColor: theme.primary, borderColor: theme.primary }
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={[
                  styles.categoryText,
                  { color: selectedCategory === item ? theme.white : theme.placeholder }
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.categoriesContent}
          />
        </View>

        {/* Grid */}
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="bookmark-outline" size={64} color={theme.border} />
              <Text style={[styles.emptyText, { color: theme.placeholder }]}>No recipes found</Text>
            </View>
          }
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  gridContent: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardContainer: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH * 1.4,
  },
  cardMask: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  heartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  recipeTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  }
});
