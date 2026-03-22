import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

type MealItemProps = {
  title: string;
  kcal: string;
  macros: string;
  time: string;
};

function MealItem({ title, kcal, macros, time }: MealItemProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.iconBox, { backgroundColor: theme.primary + '12' }]}>
        <Ionicons name="restaurant" size={22} color={theme.primary} />
      </View>
      <View style={styles.infoBox}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={styles.meta}>
          <Text style={[styles.macrosText, { color: theme.placeholder }]}>{macros}</Text>
          <View style={[styles.dot, { backgroundColor: theme.placeholder + '40' }]} />
          <Text style={[styles.timeText, { color: theme.placeholder }]}>{time}</Text>
        </View>
      </View>
      <View style={styles.valueBox}>
        <Text style={[styles.kcal, { color: theme.text }]}>{kcal}</Text>
        <Text style={[styles.kcalLabel, { color: theme.placeholder }]}>kcal</Text>
      </View>
    </TouchableOpacity>
  );
}

type MealLogProps = {
  meals: MealItemProps[];
  onLogMeal?: () => void;
};

export default function MealLog({ meals, onLogMeal }: MealLogProps) {
  const { theme } = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Today's Activity</Text>
        <TouchableOpacity style={[styles.logBtn, { backgroundColor: theme.primary }]} onPress={onLogMeal}>
          <Ionicons name="add" size={20} color={theme.white} />
          <Text style={[styles.logBtnText, { color: theme.white }]}>Log Meal</Text>
        </TouchableOpacity>
      </View>
      {meals.map((meal, i) => (
        <MealItem key={i} {...meal} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  logBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  logBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 28,
    marginBottom: 15,
    borderWidth: 1,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  infoBox: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  macrosText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  valueBox: {
    alignItems: 'flex-end',
  },
  kcal: {
    fontSize: 18,
    fontWeight: '900',
  },
  kcalLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
