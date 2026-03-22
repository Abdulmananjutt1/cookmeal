import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

type MealCardProps = {
  type: string;
  title: string;
  time: string;
  calories: string;
  image: string;
  completed?: boolean;
};

export default function MealCard({ type, title, time, calories, image, completed = false }: MealCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={[
        styles.cardContainer, 
        { borderColor: completed ? theme.success : 'transparent', borderWidth: completed ? 2 : 0 }
      ]}
    >
      <ImageBackground source={{ uri: image }} style={styles.imageBackground} imageStyle={{ borderRadius: 28 }}>
        <View style={[styles.darkOverlay, { backgroundColor: theme.black + '4D' }]} />
        
        {/* Top Badges */}
        <View style={styles.badgeRow}>
          <View style={[styles.typeBadge, { backgroundColor: completed ? theme.success : theme.primary }]}>
            <Text style={[styles.typeText, { color: theme.white }]}>{type}</Text>
          </View>
          
          {completed && (
            <View style={[styles.circularBadge, { backgroundColor: theme.success }]}>
              <Ionicons name="checkmark-done" size={16} color={theme.white} />
            </View>
          )}
        </View>

        {/* Bottom Content */}
        <View style={styles.contentBottom}>
          <Text style={[styles.titleText, { color: theme.white, textShadowColor: theme.black + '80' }]} numberOfLines={2}>
            {title}
          </Text>
          
          <View style={styles.metaRow}>
            <View style={[styles.blurBadge, { backgroundColor: theme.white + '33' }]}>
              <Ionicons name="time" size={14} color={theme.white} style={{ marginRight: 6 }} />
              <Text style={[styles.metaText, { color: theme.white }]}>{time}</Text>
            </View>
            <View style={[styles.blurBadge, { backgroundColor: theme.white + '33' }]}>
              <Ionicons name="flame" size={14} color={theme.primary} style={{ marginRight: 6 }} />
              <Text style={[styles.metaText, { color: theme.white }]}>{calories}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    height: 220,
    borderRadius: 30,
    elevation: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  typeText: {
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  circularBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  contentBottom: {
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blurBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 10,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
