import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from '@/hooks/useTheme';

type MacroItem = {
  label: string;
  consumed: number;
  goal: number;
  color: string;
  icon: string;
};

type Props = {
  calories: number;
  calorieGoal: number;
  macros: MacroItem[];
};

export default function CalorieCard({ calories, calorieGoal, macros }: Props) {
  const { theme, isDark } = useTheme();

  return (
    <View
      style={[
        styles.glassCard,
        {
          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        },
      ]}
    >
      <LinearGradient colors={[theme.primary + '10', 'transparent']} style={styles.cardGlow} />

      <View style={styles.summaryTop}>
        {/* Left: calories left info */}
        <View style={styles.summaryText}>
          <Text style={[styles.summaryLabel, { color: theme.placeholder }]}>Calories Left</Text>
          <Text style={[styles.summaryMainVal, { color: theme.text }]}>{calorieGoal - calories}</Text>
          <View style={[styles.kcalStatus, { backgroundColor: theme.primary + '20' }]}>
            <Ionicons name="flash" size={12} color={theme.primary} />
            <Text style={[styles.kcalStatusText, { color: theme.primary }]}>Efficient Burn</Text>
          </View>
        </View>

        {/* Right: circular progress from library */}
        <AnimatedCircularProgress
          size={100}
          width={10}
          fill={(calories / calorieGoal) * 100}
          tintColor={theme.primary}
          backgroundColor={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}
          lineCap="round"
          rotation={0}
        >
          {(fill: number) => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '900', color: theme.text }}>
                {Math.round(fill)}%
              </Text>
              <Text style={{ fontSize: 9, fontWeight: '700', color: theme.placeholder, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                burned
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      {/* Macro pills */}
      <View style={styles.macroPillsRow}>
        {macros.map((m, i) => (
          <View key={i} style={[styles.macroPill, { backgroundColor: theme.surface }]}>
            <Ionicons name={m.icon as any} size={14} color={m.color} />
            <View style={styles.pillText}>
              <Text style={[styles.pillLabel, { color: theme.placeholder }]}>{m.label}</Text>
              <Text style={[styles.pillVal, { color: theme.text }]}>{m.consumed}g</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glassCard: {
    padding: 24,
    borderRadius: 35,
    marginBottom: 25,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 4,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  summaryText: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryMainVal: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  kcalStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
    gap: 4,
  },
  kcalStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  macroPillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  macroPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    gap: 10,
  },
  pillText: {
    flex: 1,
  },
  pillLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  pillVal: {
    fontSize: 12,
    fontWeight: '800',
  },
});
