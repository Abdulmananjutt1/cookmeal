import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type ProfileStatsProps = {
  recipes: string;
  followers: string;
  following: string;
};

export default function ProfileStats({ recipes, followers, following }: ProfileStatsProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.statsContainer, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: theme.text }]}>
      <View style={styles.statBox}>
        <Text style={[styles.statValue, { color: theme.primary }]}>{recipes}</Text>
        <Text style={[styles.statLabel, { color: theme.placeholder }]}>Recipes</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <View style={styles.statBox}>
        <Text style={[styles.statValue, { color: theme.text }]}>{followers}</Text>
        <Text style={[styles.statLabel, { color: theme.placeholder }]}>Followers</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <View style={styles.statBox}>
        <Text style={[styles.statValue, { color: theme.text }]}>{following}</Text>
        <Text style={[styles.statLabel, { color: theme.placeholder }]}>Following</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 30,
  },
});
