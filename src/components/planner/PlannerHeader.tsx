import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DAYS = [
  { day: 'Mon', date: '12' },
  { day: 'Tue', date: '13' },
  { day: 'Wed', date: '14', active: true },
  { day: 'Thu', date: '15' },
  { day: 'Fri', date: '16' },
  { day: 'Sat', date: '17' },
  { day: 'Sun', date: '18' },
];

export default function PlannerHeader() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Curved Colored Background */}
      <View style={[styles.curvedBg, { backgroundColor: theme.primary, paddingTop: insets.top + 10 }]} />

      <View style={[styles.topRow, { marginTop: insets.top + 10 }]}>
        <View>
          <Text style={[styles.monthText, { color: theme.white }]}>October 2023</Text>
          <Text style={[styles.subtitle, { color: theme.white + 'CC' }]}>Plan your perfect week</Text>
        </View>
        <TouchableOpacity style={[styles.calendarIcon, { backgroundColor: theme.surface }]}>
          <Ionicons name="calendar" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysList}
      >
        {DAYS.map((d, index) => (
          <TouchableOpacity 
            key={index}
            activeOpacity={0.8}
            style={[
              styles.dayCard, 
              { backgroundColor: theme.surface },
              d.active && [styles.activeDayCard, { backgroundColor: theme.text }]
            ]}
          >
            <Text style={[styles.dayName, { color: d.active ? theme.surface : theme.placeholder }]}>
              {d.day}
            </Text>
            <Text style={[styles.dayDate, { color: d.active ? theme.surface : theme.text }]}>
              {d.date}
            </Text>
            {d.active && <View style={[styles.activeDot, { backgroundColor: theme.primary }]} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    position: 'relative',
    zIndex: 10,
  },
  curvedBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: -1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  monthText: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
    fontWeight: '500',
  },
  calendarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  daysList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  dayCard: {
    width: 66,
    height: 90,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  activeDayCard: {
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    transform: [{ scale: 1.05 }],
  },
  dayName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  dayDate: {
    fontSize: 22,
    fontWeight: '900',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    position: 'absolute',
    bottom: 12,
  },
});
