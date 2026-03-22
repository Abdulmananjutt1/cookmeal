import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import PantryItem, { PantryItemProps } from './PantryItem';

type CategorySectionProps = {
  title: string;
  icon: string;
  color: string;
  items: PantryItemProps[];
  onItemPress?: (item: PantryItemProps) => void;
};

export default function CategorySection({ title, icon, color, items, onItemPress }: CategorySectionProps) {
  const { theme } = useTheme();

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon as any} size={20} color={color} />
        </View>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: theme.surface }]}>
          <Text style={[styles.count, { color: theme.placeholder }]}>{items.length}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {items.map((item, idx) => (
          <PantryItem 
            key={idx} 
            {...item} 
            onPress={() => onItemPress?.(item)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
    letterSpacing: 0.2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  count: {
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    gap: 0, // PantryItem has its own margin
  },
});
