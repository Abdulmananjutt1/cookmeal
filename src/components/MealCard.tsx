import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface MealCardProps {
  id: string;
  title: string;
  image: any;
  duration: string;
  rating: string;
  category: string;
  calories?: string;
  protein?: string;
  grid?: boolean;
}

export function MealCard({ id, title, image, duration, rating, category, calories, protein, grid }: MealCardProps) {
  const navigation = useNavigation<any>();
  const colorScheme = useColorScheme();
  const theme = Colors[(colorScheme as 'light' | 'dark') ?? 'light'];

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('MealDetails', { id })}
      style={[
        styles.card, 
        { backgroundColor: theme.card },
        grid && styles.gridCard
      ]}
    >
      <Image source={image} style={[styles.image, grid && styles.gridImage]} />
      
      {/* Glassmorphism Badge */}
      {!grid && (
        <View style={[styles.badge, { backgroundColor: theme.cardOverlay }]}>
          <Text style={[styles.badgeText, { color: theme.white }]}>{category}</Text>
        </View>
      )}

      <TouchableOpacity 
        style={[
          styles.favoriteBtn, 
          { backgroundColor: theme.cardOverlay },
          grid && styles.gridFavoriteBtn
        ]}
      >
        <Ionicons name="heart-outline" size={grid ? 16 : 20} color={theme.primary} />
      </TouchableOpacity>

      <View style={[styles.content, grid && styles.gridContent]}>
        <Text style={[styles.title, { color: theme.text }, grid && styles.gridTitle]} numberOfLines={1}>{title}</Text>
        
        <View style={[styles.infoRow, grid && styles.gridInfoRow]}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={grid ? 12 : 14} color={theme.icon} />
            <Text style={[styles.infoText, { color: theme.icon }, grid && styles.gridInfoText]}>{duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="star" size={grid ? 12 : 14} color={theme.accent} />
            <Text style={[styles.infoText, { color: theme.icon }, grid && styles.gridInfoText]}>{rating}</Text>
          </View>
        </View>

        {!grid && (
          <View style={styles.nutritionRow}>
            {calories && (
              <View style={[styles.nutrientPill, { backgroundColor: theme.primary + '15' }]}>
                <Text style={[styles.nutrientText, { color: theme.primary }]}>{calories}</Text>
              </View>
            )}
            {protein && (
              <View style={[styles.nutrientPill, { backgroundColor: theme.accent + '15' }]}>
                <Text style={[styles.nutrientText, { color: theme.accent }]}>{protein.includes('undefined') ? 'N/A' : protein} Protein</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    width: '100%',
    // Premium Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  gridCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  gridImage: {
    height: 120,
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  gridFavoriteBtn: {
    width: 30,
    height: 30,
    top: 10,
    right: 10,
  },
  content: {
    padding: 20,
  },
  gridContent: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  gridTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  gridInfoRow: {
    gap: 8,
    marginBottom: 0,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
  },
  gridInfoText: {
    fontSize: 11,
  },
  nutritionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  nutrientPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  nutrientText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
