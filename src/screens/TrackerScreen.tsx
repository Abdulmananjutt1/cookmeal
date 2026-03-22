import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import CalendarModal from '@/components/common/CalendarModal';
import DateSelector from '@/components/tracker/DateSelector';
import CalorieCard from '@/components/tracker/CalorieCard';
import WaterWaveCard from '@/components/tracker/WaterWaveCard';
import StepsCard from '@/components/tracker/StepsCard';
import MealLog from '@/components/tracker/MealLog';


const MACROS = [
  { label: 'Protein', consumed: 110, goal: 150, color: '#FF7E5F', icon: 'fitness' },
  { label: 'Carbs',   consumed: 195, goal: 250, color: '#FEB47B', icon: 'nutrition' },
  { label: 'Fats',    consumed: 48,  goal: 70,  color: '#6A11CB', icon: 'water' },
];

const MEALS = [
  { title: 'Oatmeal Royale',        kcal: '320', macros: '12g P | 45g C | 8g F',  time: '08:30 AM' },
  { title: 'Grilled Chicken Caesar', kcal: '540', macros: '45g P | 12g C | 24g F', time: '01:15 PM' },
  { title: 'Omega Smoothie',         kcal: '180', macros: '8g P | 22g C | 4g F',   time: '04:45 PM' },
];

export default function TrackerScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [waterIntake, setWaterIntake]   = useState(2.25);
  const [calories]                       = useState(1580);
  const calorieGoal                      = 2200;
  const [calendarVisible, setCalendarVisible] = useState(false);

  const addWater    = () => setWaterIntake(prev => Math.min(prev + 0.25, 4));
  const removeWater = () => setWaterIntake(prev => Math.max(prev - 0.25, 0));

  return (
    <>
      <ScreenWrapper
        title="Health & Vitals"
        subtitle="Real-time performance tracking"
        rightIcon="calendar-outline"
        onRightPress={() => setCalendarVisible(true)}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />

          <CalorieCard calories={calories} calorieGoal={calorieGoal} macros={MACROS} />

          <View style={styles.vitalsRow}>
            <WaterWaveCard waterIntake={waterIntake} onAdd={addWater} onRemove={removeWater} />
            <StepsCard steps={8432} goal={10000} />
          </View>

          <MealLog meals={MEALS} onLogMeal={() => {}} />

        </ScrollView>
      </ScreenWrapper>

      <CalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        onDateSelect={(date) => console.log('Selected:', date)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  vitalsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
});
