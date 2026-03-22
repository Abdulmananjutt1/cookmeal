import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AIToolsList() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Smart Kitchen</Text>

      {/* Hero AI Card */}
      <TouchableOpacity 
        style={[styles.heroCard, { backgroundColor: theme.primary, shadowColor: theme.primary }]}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Jarvis')}
      >
        <View style={styles.heroContent}>
          <View style={[styles.heroIconBox, { backgroundColor: theme.white }]}>
            <Ionicons name="sparkles" size={28} color={theme.primary} />
          </View>
          <View style={styles.heroTextContent}>
            <Text style={[styles.heroTitle, { color: theme.white }]}>Astra AI Chef</Text>
            <Text style={[styles.heroDesc, { color: theme.white + 'D9' }]}>Ask anything, from recipes to substitutions instantly!</Text>
          </View>
        </View>
        
        <View style={[styles.heroAction, { backgroundColor: theme.black + '40' }]}>
          <Text style={[styles.heroActionText, { color: theme.white }]}>Chat Now</Text>
          <Ionicons name="arrow-forward" size={16} color={theme.white} />
        </View>
      </TouchableOpacity>

      {/* Secondary Tools Grid */}
      <View style={styles.grid}>
        <TouchableOpacity 
          style={[styles.gridCard, { backgroundColor: theme.surface, shadowColor: theme.text }]} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('BarcodeScanner')}
        >
          <View style={[styles.smallIconBox, { backgroundColor: theme.primary + '1A' }]}>
            <Ionicons name="barcode" size={24} color={theme.primary} />
          </View>
          <Text style={[styles.gridTitle, { color: theme.text }]}>Barcode</Text>
          <Text style={[styles.gridDesc, { color: theme.placeholder }]}>Scan Groceries</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridCard, { backgroundColor: theme.surface, shadowColor: theme.text }]} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MealAnalyzer')}
        >
          <View style={[styles.smallIconBox, { backgroundColor: theme.primary + '1A' }]}>
            <Ionicons name="camera" size={24} color={theme.primary} />
          </View>
          <Text style={[styles.gridTitle, { color: theme.text }]}>Analyzer</Text>
          <Text style={[styles.gridDesc, { color: theme.placeholder }]}>Analyze Meals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    elevation: 4,
  },
  heroTextContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  heroDesc: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  heroAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heroActionText: {
    fontWeight: 'bold',
    fontSize: 13,
    marginRight: 6,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCard: {
    flex: 0.48,
    borderRadius: 20,
    padding: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  smallIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gridDesc: {
    fontSize: 12,
    fontWeight: '500',
  },
});
