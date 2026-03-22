import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RECIPES = [
  {
    id: '1',
    title: 'Spicy Garlic Butter Shrimp',
    time: '25 min',
    rating: '4.9',
    calories: '320 kcal',
    image: 'https://images.unsplash.com/photo-1625944230945-1b7dd12a80f1?w=600&auto=format&fit=crop&q=60',
    tag: 'Trending',
  },
  {
    id: '2',
    title: 'Creamy Tuscan Chicken',
    time: '40 min',
    rating: '4.8',
    calories: '450 kcal',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=60',
    tag: 'Dinner',
  },
  {
    id: '3',
    title: 'Avocado Quinoa Salad',
    time: '15 min',
    rating: '4.7',
    calories: '280 kcal',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60',
    tag: 'Healthy',
  },
];

export default function FeaturedRecipes() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Recipes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ExploreRecipes')}>
          <Text style={[styles.seeAll, { color: theme.primary }]}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {RECIPES.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            activeOpacity={0.9} 
            onPress={() => navigation.navigate('MealDetails', { id: item.id })}
            style={[styles.cardWrapper, { backgroundColor: theme.card, shadowColor: theme.text }]}
          >
            <ImageBackground 
              source={{ uri: item.image }} 
              style={styles.imageBackground}
              imageStyle={{ borderRadius: 28 }}
            >
              <View style={[styles.darkOverlay, { backgroundColor: theme.cardOverlay }]} />
              
              {/* Top Row: Tag & Bookmark */}
              <View style={styles.cardHeader}>
                <View style={[styles.tagBadge, { backgroundColor: theme.primary, shadowColor: theme.black }]}>
                  <Text style={[styles.tagText, { color: theme.white }]}>{item.tag}</Text>
                </View>
                <TouchableOpacity style={[styles.bookmarkBtn, { backgroundColor: theme.white + '33' }]}>
                  <Ionicons name="bookmark-outline" size={18} color={theme.white} />
                </TouchableOpacity>
              </View>

              {/* Bottom Row: Content */}
              <View style={styles.cardContent}>
                <Text style={[styles.recipeTitle, { color: theme.white, textShadowColor: theme.black + '80' }]} numberOfLines={2}>
                  {item.title}
                </Text>

                <View style={styles.metaRow}>
                  <View style={[styles.metaBadge, { backgroundColor: theme.white + '33' }]}>
                    <Ionicons name="time" size={14} color={theme.white} style={{ marginRight: 4 }} />
                    <Text style={[styles.metaBadgeText, { color: theme.white }]}>{item.time}</Text>
                  </View>
                  <View style={[styles.metaBadge, { backgroundColor: theme.white + '33' }]}>
                    <Ionicons name="flame" size={14} color={theme.error} style={{ marginRight: 4 }} />
                    <Text style={[styles.metaBadgeText, { color: theme.white }]}>{item.calories}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardWrapper: {
    width: 180,
    height: 240,
    marginHorizontal: 8,
    borderRadius: 24,
    elevation: 6,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  tagText: {
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  bookmarkBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 14,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    lineHeight: 24,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  metaBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
