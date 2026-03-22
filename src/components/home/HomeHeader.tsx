import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeHeader() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <View style={styles.greetingRow}>
          <Ionicons name="sunny" size={20} color={theme.primary} style={{ marginRight: 6 }} />
          <Text style={[styles.greeting, { color: theme.placeholder }]}>Good Morning, Chef!</Text>
        </View>
        <Text style={[styles.title, { color: theme.text }]}>
          What are we <Text style={{ color: theme.primary }}>cooking</Text> today?
        </Text>
      </View>
      <TouchableOpacity 
        style={[styles.profileButton, { borderColor: theme.primary, shadowColor: theme.primary, backgroundColor: theme.surface }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
          style={styles.profileImage} 
        />
        {/* Notification Dot */}
        <View style={[styles.notificationDot, { backgroundColor: theme.error, borderColor: theme.background }]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  greeting: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
  },
});
