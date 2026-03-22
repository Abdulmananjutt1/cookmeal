import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeSearchBar() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={[
        styles.searchWrapper, 
        { 
          backgroundColor: theme.surface,
          shadowColor: theme.text,
        }
      ]}>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Search')}
          style={styles.inputArea}
        >
          <Ionicons name="search" size={22} color={theme.placeholder} style={styles.searchIcon} />
          <TextInput 
            style={[styles.input, { color: theme.text }]}
            placeholder="Search recipes, ingredients..."
            placeholderTextColor={theme.placeholder}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        
        <TouchableOpacity 
          style={[styles.filterBtn, { backgroundColor: theme.primary + '1A' }]}
          onPress={() => console.log('Filter pressed')}
        >
          <Ionicons name="options" size={22} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
    zIndex: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 8,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  searchIcon: {
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 28,
    marginHorizontal: 8,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
