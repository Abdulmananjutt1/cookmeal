import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const notifications = [
    { id: 1, title: 'New Recipe Alert!', body: 'Try our new Mediterranean Pasta Salad.', time: '2m ago', type: 'recipe', unread: true },
    { id: 2, title: 'Drink Water', body: 'Time for your hourly hydration. 💧', time: '1h ago', type: 'health', unread: true },
    { id: 3, title: 'Achievement Unlocked', body: 'You completed your 7-day streak!', time: 'Yesterday', type: 'goal', unread: false },
    { id: 4, title: 'System Update', body: 'Chef Astra is now even smarter.', time: '2 days ago', type: 'system', unread: false },
  ];

  return (
    <ScreenWrapper title="Notifications" showBack={true} rightText="Mark all read" onRightPress={() => { }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {notifications.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.notiCard, { backgroundColor: theme.card, shadowColor: theme.text, borderColor: theme.border }]}>
            <View style={[styles.iconBox, { backgroundColor: theme.primary + '15' }]}>
              <Ionicons
                name={item.type === 'recipe' ? 'restaurant' : item.type === 'health' ? 'water' : 'ribbon'}
                size={22}
                color={theme.primary}
              />
            </View>
            <View style={styles.notiContent}>
              <View style={styles.titleRow}>
                <Text style={[styles.notiTitle, { color: theme.text }]}>{item.title}</Text>
                {item.unread && <View style={[styles.dot, { backgroundColor: theme.primary }]} />}
              </View>
              <Text style={[styles.notiBody, { color: theme.placeholder }]}>{item.body}</Text>
              <Text style={[styles.notiTime, { color: theme.placeholder }]}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={[styles.emptyPrompt, { color: theme.placeholder }]}>No more notifications</Text>

      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginLeft: 10,
    flex: 1,
  },
  markRead: {
    paddingHorizontal: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  notiCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  notiContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notiTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notiBody: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 6,
  },
  notiTime: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyPrompt: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    fontWeight: '500',
  },
});
