import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

const DATES = [17, 18, 19, 20, 21, 22, 23];
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

type Props = {
  selectedDate: number;
  onSelectDate: (date: number) => void;
};

export default function DateSelector({ selectedDate, onSelectDate }: Props) {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.selector}
      contentContainerStyle={styles.content}
    >
      {DATES.map((date, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.dateCard,
            selectedDate === date && { backgroundColor: theme.primary, borderColor: theme.primary },
          ]}
          onPress={() => onSelectDate(date)}
        >
          <Text style={[styles.dayText, { color: selectedDate === date ? theme.white : theme.placeholder }]}>
            {DAYS[idx]}
          </Text>
          <Text style={[styles.dateText, { color: selectedDate === date ? theme.white : theme.text }]}>
            {date}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  selector: {
    marginBottom: 25,
    marginTop: 10,
  },
  content: {
    paddingRight: 20,
    gap: 12,
  },
  dateCard: {
    width: 60,
    height: 85,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  dayText: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '800',
  },
});
