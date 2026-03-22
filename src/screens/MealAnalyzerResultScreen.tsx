import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { useTheme } from '@/hooks/useTheme';

export default function MealAnalyzerResultScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { theme } = useTheme();

  // Mock data if no params passed
  const mealImage = route.params?.imageUri || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop';

  const renderMacro = (label: string, value: string, percentage: number) => (
    <View style={[styles.macroCard, { backgroundColor: theme.surface }]}>
      <View style={styles.macroHeader}>
        <Text style={[styles.macroLabel, { color: theme.placeholder }]}>{label}</Text>
        <Text style={[styles.macroValue, { color: theme.primary }]}>{value}</Text>
      </View>
      <View style={[styles.progressBarContainer, { backgroundColor: theme.border }]}>
        <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: theme.primary }]} />
      </View>
    </View>
  );

  return (
    <ScreenWrapper 
      title="Meal Analysis" 
      showBack={true} 
      rightIcon="share-outline"
    >
      <LinearGradient
        colors={[theme.background, theme.primary + '10', theme.background]}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Analyzed Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: mealImage }} style={styles.mealImage} />
          <View style={[styles.badge, { backgroundColor: theme.primary }]}>
            <Text style={styles.badgeText}>AI VERIFIED</Text>
          </View>
        </View>

        {/* Results Body */}
        <View style={styles.resultsBody}>
          <View style={[styles.summaryCard, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: theme.text }]}>
            <Text style={[styles.totalCals, { color: theme.text }]}>420</Text>
            <Text style={[styles.totalCalsLabel, { color: theme.placeholder }]}>Estimated Calories</Text>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <Text style={[styles.healthScore, { color: theme.primary }]}>Nutritional Value: 8.5/10</Text>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>Macronutrients</Text>
          {renderMacro('Protein', '28g', 60)}
          {renderMacro('Carbs', '45g', 45)}
          {renderMacro('Fats', '14g', 30)}

          <View style={styles.ingredientsBox}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Ingredients Detected</Text>
            <View style={styles.tagCloud}>
              {['Salmon', 'Quinoa', 'Asparagus', 'Lemon', 'Olive Oil'].map((ing, i) => (
                <View key={i} style={[styles.tag, { backgroundColor: theme.primary + '15', borderColor: theme.primary + '30' }]}>
                  <Text style={[styles.tagText, { color: theme.primary }]}>{ing}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.mainBtn, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Planner' })}
          >
            <Text style={[styles.btnText, { color: theme.white }]}>Add to Daily Log</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.secondaryBtn, { borderColor: theme.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.secondaryBtnText, { color: theme.primary }]}>Scan Another Meal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    marginHorizontal: 25,
    height: 250,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 10,
    position: 'relative',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  mealImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resultsBody: {
    paddingHorizontal: 25,
    marginTop: 25,
  },
  summaryCard: {
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 30,
  },
  totalCals: {
    fontSize: 48,
    fontWeight: '900',
  },
  totalCalsLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: -5,
  },
  divider: {
    width: '50%',
    height: 1,
    marginVertical: 15,
  },
  healthScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  macroCard: {
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  ingredientsBox: {
    marginTop: 20,
    marginBottom: 10,
  },
  tagCloud: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
  },
  actions: {
    paddingHorizontal: 25,
    marginTop: 30,
    gap: 15,
  },
  mainBtn: {
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  secondaryBtn: {
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
