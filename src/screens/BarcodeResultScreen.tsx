import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { useTheme } from '@/hooks/useTheme';

export default function BarcodeResultScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  return (
    <ScreenWrapper 
      title="Product Details" 
      showBack={true} 
      rightIcon="share-outline"
    >
      <LinearGradient
        colors={[theme.background, theme.primary + '10', theme.background]}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Product Card */}
        <View style={[styles.productCard, { backgroundColor: theme.surface, shadowColor: theme.text }]}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={[styles.brand, { color: theme.primary }]}>NATURE'S BASKET</Text>
            <Text style={[styles.productName, { color: theme.text }]}>Organic Greek Yogurt</Text>
            <Text style={[styles.productWeight, { color: theme.placeholder }]}>500g | 1.1 lbs</Text>
          </View>
        </View>

        {/* Nutrition Facts */}
        <View style={styles.nutritionSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Nutrition Facts</Text>
          <View style={[styles.nutritionTable, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.tableHead}>
              <Text style={[styles.headText, { color: theme.placeholder }]}>Serving Size 100g</Text>
              <Text style={[styles.headText, { color: theme.primary }]}>110 kcal</Text>
            </View>

            {[
              { label: 'Total Fat', value: '3.5g', sub: '5%' },
              { label: 'Saturated Fat', value: '2.1g', sub: '11%' },
              { label: 'Cholesterol', value: '13mg', sub: '4%' },
              { label: 'Sodium', value: '45mg', sub: '2%' },
              { label: 'Total Carbohydrate', value: '4.7g', sub: '2%' },
              { label: 'Protein', value: '10g', sub: '20%' },
            ].map((row, i) => (
              <View key={i} style={[styles.nutritionRow, { borderBottomColor: theme.border }]}>
                <Text style={[styles.rowLabel, { color: theme.text }]}>{row.label}</Text>
                <View style={styles.rowRight}>
                  <Text style={[styles.rowValue, { color: theme.text }]}>{row.value}</Text>
                  <Text style={[styles.rowSub, { color: theme.placeholder }]}>{row.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.mainBtn, { backgroundColor: theme.primary }]}>
            <Text style={[styles.btnText, { color: theme.white }]}>Add to Pantry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryBtn, { borderColor: theme.primary }]}>
            <Text style={[styles.secondaryBtnText, { color: theme.primary }]}>Find Recipes</Text>
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
  productCard: {
    marginHorizontal: 25,
    borderRadius: 30,
    padding: 20,
    marginTop: 10,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  productInfo: {
    alignItems: 'center',
  },
  brand: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 6,
  },
  productName: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
    textAlign: 'center',
  },
  productWeight: {
    fontSize: 14,
  },
  nutritionSection: {
    paddingHorizontal: 25,
    marginTop: 35,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nutritionTable: {
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
  },
  tableHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValue: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  rowSub: {
    fontSize: 12,
    width: 35,
    textAlign: 'right',
  },
  actions: {
    paddingHorizontal: 25,
    marginTop: 35,
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
