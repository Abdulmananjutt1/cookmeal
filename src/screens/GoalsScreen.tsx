import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

type GoalItemProps = {
  label: string;
  value: string;
  unit: string;
  icon: string;
  color: string;
  onChange: (text: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

function GoalInput({ label, value, unit, icon, color, onChange, onIncrement, onDecrement }: GoalItemProps) {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.goalCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.goalHeader}>
        <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon as any} size={20} color={color} />
        </View>
        <Text style={[styles.goalLabel, { color: theme.text }]}>{label}</Text>
      </View>

      <View style={styles.inputRow}>
        <TouchableOpacity 
          style={[styles.stepBtn, { borderColor: theme.border }]} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onDecrement();
          }}
        >
          <Ionicons name="remove" size={20} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.valueWrapper}>
          <TextInput
            style={[styles.input, { color: theme.text }]}
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            selectionColor={theme.primary}
          />
          <Text style={[styles.unit, { color: theme.placeholder }]}>{unit}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.stepBtn, { borderColor: theme.border }]} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onIncrement();
          }}
        >
          <Ionicons name="add" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function GoalsScreen() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation();

  const [calories, setCalories] = useState('2200');
  const [water, setWater] = useState('2.5');
  const [protein, setProtein] = useState('150');
  const [carbs, setCarbs] = useState('250');
  const [fats, setFats] = useState('70');

  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // In a real app, save to storage/context
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient colors={[theme.primaryGradientStart, theme.primaryGradientEnd]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: theme.glassWhite }]}>
            <Ionicons name="close" size={24} color={theme.white} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.white }]}>Daily Goals</Text>
          <TouchableOpacity onPress={handleSave} style={[styles.saveBtnTop, { backgroundColor: theme.glassWhite }]}>
            <Text style={[styles.saveBtnTextTop, { color: theme.white }]}>Save</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerSubtitle, { color: theme.white + 'CC' }]}>Set your targets for a healthier life</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>General Goals</Text>
          
          <GoalInput
            label="Daily Calories"
            value={calories}
            unit="kcal"
            icon="flash"
            color={theme.calories}
            onChange={setCalories}
            onIncrement={() => setCalories(c => (parseInt(c) + 50).toString())}
            onDecrement={() => setCalories(c => Math.max(0, parseInt(c) - 50).toString())}
          />

          <GoalInput
            label="Water Intake"
            value={water}
            unit="Liters"
            icon="water"
            color={theme.water}
            onChange={setWater}
            onIncrement={() => setWater(w => (parseFloat(w) + 0.25).toFixed(2))}
            onDecrement={() => setWater(w => Math.max(0, parseFloat(w) - 0.25).toFixed(2))}
          />

          <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>Macronutrients</Text>

          <GoalInput
            label="Protein"
            value={protein}
            unit="grams"
            icon="fitness"
            color={theme.protein}
            onChange={setProtein}
            onIncrement={() => setProtein(p => (parseInt(p) + 5).toString())}
            onDecrement={() => setProtein(p => Math.max(0, parseInt(p) - 5).toString())}
          />

          <GoalInput
            label="Carbohydrates"
            value={carbs}
            unit="grams"
            icon="nutrition"
            color={theme.carbs}
            onChange={setCarbs}
            onIncrement={() => setCarbs(c => (parseInt(c) + 10).toString())}
            onDecrement={() => setCarbs(c => Math.max(0, parseInt(c) - 10).toString())}
          />

          <GoalInput
            label="Fats"
            value={fats}
            unit="grams"
            icon="leaf"
            color={theme.fats}
            onChange={setFats}
            onIncrement={() => setFats(f => (parseInt(f) + 5).toString())}
            onDecrement={() => setFats(f => Math.max(0, parseInt(f) - 5).toString())}
          />

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: theme.primary, shadowColor: theme.black }]}
            onPress={handleSave}
          >
            <Text style={[styles.saveBtnText, { color: theme.white }]}>Save All Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnTop: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  saveBtnTextTop: {
    fontWeight: '700',
    fontSize: 14,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 15,
    marginLeft: 5,
  },
  goalCard: {
    borderRadius: 24,
    borderWidth: 1.5,
    padding: 20,
    marginBottom: 15,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  input: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    minWidth: 60,
  },
  unit: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  saveBtn: {
    marginTop: 20,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  saveBtnText: {
    fontSize: 18,
    fontWeight: '800',
  },
});
