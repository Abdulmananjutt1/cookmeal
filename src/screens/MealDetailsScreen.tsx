import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useMealDetails } from '@/hooks/useMealDetails';
import { BackgroundWrapper } from '@/components/common/BackgroundWrapper';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/common/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MealDetailsScreen() {
  const route = useRoute<any>();
  const id = route.params?.id;
  const navigation = useNavigation<any>();
  const { meal, loading } = useMealDetails(id);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  if (loading) {
    return (
      <BackgroundWrapper style={styles.centered}>
        <ActivityIndicator size="large" color={theme.primary} />
      </BackgroundWrapper>
    );
  }

  if (!meal) {
    return (
      <BackgroundWrapper style={styles.centered}>
        <ThemedText>Meal not found</ThemedText>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
          <ThemedText colorType="primary" type="button">Go Back</ThemedText>
        </TouchableOpacity>
      </BackgroundWrapper>
    );
  }

  return (
    <ScreenWrapper 
      useTopInset={false} 
      showBack={false} 
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image source={meal.image} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.headerBtns, { top: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.iconBtn, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
              <Ionicons name="chevron-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
              <Ionicons name={meal.isFavorite ? "heart" : "heart-outline"} size={24} color={meal.isFavorite ? "#FF6B6B" : "#FFF"} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.content, { backgroundColor: theme.background }]}>
          <View style={[styles.typeBadge, { backgroundColor: theme.primary + '1A' }]}>
            <ThemedText type="label" colorType="primary">{meal.category}</ThemedText>
          </View>
          <ThemedText type="h1" style={[styles.title, { color: theme.text }]}>{meal.title}</ThemedText>
          
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Ionicons name="flame" size={24} color="#FF6B6B" />
              <ThemedText type="h3" style={{ color: theme.text }}>{meal.calories.split(' ')[0]}</ThemedText>
              <ThemedText type="label" colorType="placeholder">kcal</ThemedText>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Ionicons name="fitness" size={24} color="#4ECDC4" />
              <ThemedText type="h3" style={{ color: theme.text }}>{meal.protein?.split(' ')[0] || '0'}</ThemedText>
              <ThemedText type="label" colorType="placeholder">Protein</ThemedText>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Ionicons name="leaf" size={24} color="#FFE66D" />
              <ThemedText type="h3" style={{ color: theme.text }}>{meal.carbs?.split(' ')[0] || '0'}</ThemedText>
              <ThemedText type="label" colorType="placeholder">Carbs</ThemedText>
            </View>
          </View>

          <View style={styles.tabRow}>
            <View style={[styles.infoPill, { backgroundColor: theme.surface }]}>
              <Ionicons name="time-outline" size={16} color={theme.primary} />
              <ThemedText type="label" style={{ color: theme.text }}>{meal.duration}</ThemedText>
            </View>
            <View style={[styles.infoPill, { backgroundColor: theme.surface }]}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <ThemedText type="label" style={{ color: theme.text }}>{meal.rating}</ThemedText>
            </View>
          </View>

          <ThemedText type="h3" style={[styles.sectionTitle, { color: theme.text }]}>Description</ThemedText>
          <ThemedText style={[styles.description, { color: theme.placeholder }]}>{meal.description}</ThemedText>

          <View style={styles.sectionHeader}>
            <ThemedText type="h3" style={[styles.sectionTitle, { color: theme.text, marginBottom: 0 }]}>Ingredients</ThemedText>
            <ThemedText type="label" colorType="primary">{meal.ingredients.length} items</ThemedText>
          </View>
          <View style={styles.ingredientsList}>
            {meal.ingredients.map((ing, i) => (
              <View key={i} style={[styles.ingredientItem, { backgroundColor: theme.surface }]}>
                <View style={[styles.ingredientIcon, { backgroundColor: theme.primary + '1A' }]}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
                </View>
                <ThemedText style={[styles.ingredientName, { color: theme.text }]}>{ing.name}</ThemedText>
                <ThemedText type="button" style={{ color: theme.primary }}>{ing.amount}</ThemedText>
              </View>
            ))}
          </View>

          <ThemedText type="h3" style={[styles.sectionTitle, { color: theme.text }]}>Preparation Steps</ThemedText>
          <View style={styles.stepsList}>
            {meal.steps.map((step) => (
              <View key={step.order} style={[styles.stepItem, { backgroundColor: theme.surface }]}>
                <View style={[styles.stepNumber, { backgroundColor: theme.primary }]}>
                  <ThemedText type="button" style={{ color: '#FFF' }}>{step.order}</ThemedText>
                </View>
                <ThemedText style={[styles.stepDescription, { color: theme.text }]}>{step.description}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Footer Button */}
      <View style={[styles.footer, { borderTopColor: theme.border, backgroundColor: theme.background }]}>
        <TouchableOpacity style={[styles.startBtn, { backgroundColor: theme.primary }]}>
          <ThemedText type="button" style={{ color: theme.white }}>Start Cooking Now</ThemedText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 350,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerBtns: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    marginTop: -30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  typeBadgeText: {
  },
  title: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    gap: 4,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
  },
  description: {
    lineHeight: 24,
    marginBottom: 24,
  },
  ingredientsList: {
    gap: 12,
    marginBottom: 32,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
  },
  ingredientIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ingredientName: {
    flex: 1,
    fontWeight: '500',
  },
  stepsList: {
    gap: 16,
    marginBottom: 40,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderRadius: 20,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
  },
  stepDescription: {
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  startBtn: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtnText: {
    color: '#FFFFFF',
  },
});
