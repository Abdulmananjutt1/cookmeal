import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

type Props = {
  steps: number;
  goal: number;
};

export default function StepsCard({ steps, goal }: Props) {
  const { theme } = useTheme();
  const pct = Math.min((steps / goal) * 100, 100);

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.content}>
        <View style={[styles.iconBox, { backgroundColor: theme.primary + '15' }]}>
          <Ionicons name="footsteps" size={24} color={theme.primary} />
        </View>
        <Text style={[styles.value, { color: theme.text }]}>{steps.toLocaleString()}</Text>
        <Text style={[styles.label, { color: theme.placeholder }]}>
          Steps Goal: {(goal / 1000).toFixed(0)}k
        </Text>
        <View style={[styles.barWrap, { backgroundColor: theme.border }]}>
          <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: theme.primary }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 180,
    borderRadius: 35,
    overflow: 'hidden',
    elevation: 3,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 26,
    fontWeight: '900',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  barWrap: {
    height: 6,
    borderRadius: 3,
    marginTop: 15,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});
