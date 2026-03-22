import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color?: string;
  onPress: () => void;
};

export default function ProfileMenu() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const MENU_ITEMS: MenuItemProps[] = [
    { icon: 'bookmark', title: 'Saved Recipes', color: theme.primary, onPress: () => navigation.navigate('SavedRecipes') },
    { icon: 'settings', title: 'Settings', onPress: () => navigation.navigate('Settings') },
    { icon: 'notifications', title: 'Notifications', onPress: () => navigation.navigate('Notifications') },
    { icon: 'help-circle', title: 'Help & Support', onPress: () => navigation.navigate('HelpSupport') },
    { icon: 'log-out', title: 'Logout', color: theme.error, onPress: () => {} },
  ];

  return (
    <View style={styles.menuContainer}>
      {MENU_ITEMS.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.menuItem, { borderBottomColor: theme.border }]}
          activeOpacity={0.6}
          onPress={item.onPress}
        >
          <View style={[styles.iconBox, { backgroundColor: (item.color || theme.text) + '15' }]}>
            <Ionicons name={item.icon} size={20} color={item.color || theme.text} />
          </View>
          <Text style={[styles.menuTitle, { color: item.color || theme.text }]}>{item.title}</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.placeholder} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
});
