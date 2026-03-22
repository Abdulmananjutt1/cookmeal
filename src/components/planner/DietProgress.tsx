import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

const MACROS = [
  { label: 'Carbs', current: 120, total: 200, color: '#4ECDC4', icon: 'nutrition' },
  { label: 'Protein', current: 85, total: 120, color: '#FF6B6B', icon: 'fish' },
  { label: 'Fat', current: 40, total: 65, color: '#FFE66D', icon: 'water' },
];

export default function DietProgress() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Left Large Calories Card */}
      <View style={[styles.calCard, { backgroundColor: theme.text }]}>
        <View style={styles.calCardHeader}>
          <Ionicons name="flame" size={24} color={theme.primary} />
          <Text style={styles.calCardTitle}>Calories</Text>
        </View>
        <Text style={styles.calBigNumber}>1,450</Text>
        <Text style={styles.calSubText}>of 2,000 kcal</Text>
        
        {/* Subtle Progress Bar */}
        <View style={styles.calProgressBg}>
          <View style={[styles.calProgressFill, { backgroundColor: theme.primary, width: '72%' }]} />
        </View>
      </View>

      {/* Right Column Grid */}
      <View style={styles.macrosColumn}>
        {MACROS.map((macro, index) => {
          const pct = Math.min((macro.current / macro.total) * 100, 100);
          return (
            <View key={index} style={[styles.macroCard, { backgroundColor: theme.surface }]}>
              <View style={[styles.macroIconBox, { backgroundColor: macro.color + '20' }]}>
                <Ionicons name={macro.icon as any} size={16} color={macro.color} />
              </View>
              <View style={styles.macroInfo}>
                <Text style={[styles.macroLabel, { color: theme.placeholder }]}>{macro.label}</Text>
                <Text style={[styles.macroValue, { color: theme.text }]}>{macro.current}g</Text>
                <View style={[styles.macroBarBg, { backgroundColor: theme.border }]}>
                  <View style={[styles.macroBarFill, { backgroundColor: macro.color, width: `${pct}%` }]} />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  calCard: {
    flex: 1.1,
    borderRadius: 28,
    padding: 20,
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  calCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  calCardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 6,
  },
  calBigNumber: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  calSubText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 20,
  },
  calProgressBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  calProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  macrosColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  macroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  macroIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  macroInfo: {
    flex: 1,
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  macroBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  macroBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
