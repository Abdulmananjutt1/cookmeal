import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

export type PantryStatus = 'In Stock' | 'Low' | 'Out of Stock';

export type PantryItemProps = {
  name: string;
  qty: string;
  status: PantryStatus;
  source?: string;
  onPress?: () => void;
  onToggleStatus?: () => void;
};

export default function PantryItem({ name, qty, status, source, onPress, onToggleStatus }: PantryItemProps) {
  const { theme, isDark } = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case 'In Stock': return theme.primary;
      case 'Low': return '#FFB020'; // Warning gold
      case 'Out of Stock': return '#FF4842'; // Danger red
      default: return theme.placeholder;
    }
  };

  const statusColor = getStatusColor();

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : theme.card,
          borderColor: theme.border,
          shadowColor: theme.text
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <TouchableOpacity 
          style={[styles.statusDot, { backgroundColor: statusColor }]} 
          onPress={onToggleStatus}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>{name}</Text>
          <View style={styles.metaRow}>
            <Text style={[styles.qty, { color: theme.placeholder }]}>{qty}</Text>
            {source && (
              <>
                <View style={[styles.dot, { backgroundColor: theme.placeholder + '40' }]} />
                <Text style={[styles.source, { color: theme.placeholder }]} numberOfLines={1}>{source}</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <View style={styles.rightContent}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qty: {
    fontSize: 12,
    fontWeight: '600',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  source: {
    fontSize: 11,
    fontWeight: '500',
    fontStyle: 'italic',
    flex: 1,
  },
  rightContent: {
    marginLeft: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
