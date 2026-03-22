import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useThemeContext } from '@/context/ThemeContext';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { toggleTheme, manualTheme } = useThemeContext();
  const navigation = useNavigation();
  const [isPushEnabled, setIsPushEnabled] = useState(true);

  return (
    <ScreenWrapper title="Settings" showBack={true}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <SettingsSection title="Account Settings" theme={theme}>
          <SettingsItem icon="person-outline" label="Personal Information" theme={theme} />
          <SettingsItem icon="mail-outline" label="Email Notifications" theme={theme} />
          <SettingsItem icon="lock-closed-outline" label="Password & Security" theme={theme} />
        </SettingsSection>

        <SettingsSection title="Preferences" theme={theme}>
          <SettingsToggle 
            icon="notifications-outline" 
            label="Push Notifications" 
            value={isPushEnabled} 
            onValueChange={setIsPushEnabled} 
            theme={theme} 
          />
          <SettingsToggle 
            icon="moon-outline" 
            label="Dark Mode (Beta)" 
            value={manualTheme === 'dark'} 
            onValueChange={toggleTheme} 
            theme={theme} 
          />
          <SettingsItem icon="globe-outline" label="Language" value="English" theme={theme} />
        </SettingsSection>

        <SettingsSection title="Data & Privacy" theme={theme}>
          <SettingsItem icon="shield-checkmark-outline" label="Privacy Policy" theme={theme} />
          <SettingsItem icon="document-text-outline" label="Terms of Service" theme={theme} />
        </SettingsSection>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color={theme.error} />
          <Text style={[styles.logoutText, { color: theme.error }]}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </ScreenWrapper>
  );
}

function SettingsSection({ title, children, theme }: any) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.placeholder }]}>{title}</Text>
      <View style={[styles.sectionCard, { backgroundColor: theme.card, shadowColor: theme.text }]}>
        {children}
      </View>
    </View>
  );
}

function SettingsItem({ icon, label, value, theme }: any) {
  return (
    <TouchableOpacity style={[styles.item, { borderBottomColor: theme.border }]}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconBox, { backgroundColor: theme.background }]}>
          <Ionicons name={icon} size={20} color={theme.primary} />
        </View>
        <Text style={[styles.itemLabel, { color: theme.text }]}>{label}</Text>
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={[styles.itemValue, { color: theme.placeholder }]}>{value}</Text>}
        <Ionicons name="chevron-forward" size={18} color={theme.placeholder} />
      </View>
    </TouchableOpacity>
  );
}

function SettingsToggle({ icon, label, value, onValueChange, theme }: any) {
  return (
    <View style={[styles.item, { borderBottomColor: theme.border }]}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconBox, { backgroundColor: theme.background }]}>
          <Ionicons name={icon} size={20} color={theme.primary} />
        </View>
        <Text style={[styles.itemLabel, { color: theme.text }]}>{label}</Text>
      </View>
      <Switch 
        value={value} 
        onValueChange={onValueChange}
        trackColor={{ false: theme.border, true: theme.primary + '80' }}
        thumbColor={value ? theme.primary : theme.placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 5,
  },
  sectionCard: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 20,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
