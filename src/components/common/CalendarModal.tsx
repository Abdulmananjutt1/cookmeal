import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onDateSelect?: (date: string) => void;
};

export default function CalendarModal({ visible, onClose, onDateSelect }: Props) {
  const { theme, isDark } = useTheme();
  const today = new Date().toISOString().split('T')[0];
  const [selected, setSelected] = useState(today);

  const handleDayPress = (day: { dateString: string }) => {
    setSelected(day.dateString);
    onDateSelect?.(day.dateString);
  };

  const calendarTheme = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textSectionTitleColor: theme.placeholder,
    selectedDayBackgroundColor: theme.primary,
    selectedDayTextColor: '#fff',
    todayTextColor: theme.primary,
    dayTextColor: theme.text,
    textDisabledColor: theme.border,
    dotColor: theme.primary,
    arrowColor: theme.primary,
    monthTextColor: theme.text,
    textDayFontWeight: '600' as any,
    textMonthFontWeight: '800' as any,
    textDayHeaderFontWeight: '700' as any,
    textDayFontSize: 14,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 12,
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Card */}
      <View style={styles.centeredWrapper} pointerEvents="box-none">
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? '#1a1f2e' : '#fff',
              shadowColor: theme.text,
            },
          ]}
        >
          {/* Header row */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Pick a Date</Text>
            <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: theme.surface }]}>
              <Ionicons name="close" size={18} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <Calendar
            current={selected}
            onDayPress={handleDayPress}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true },
            }}
            theme={calendarTheme}
            style={styles.calendar}
          />

          {/* Confirm button */}
          <TouchableOpacity
            style={[styles.confirmBtn, { backgroundColor: theme.primary }]}
            onPress={onClose}
          >
            <Text style={styles.confirmText}>Confirm — {selected}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    borderRadius: 30,
    padding: 20,
    elevation: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  confirmBtn: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
