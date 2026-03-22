import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import CategorySection from '@/components/pantry/CategorySection';
import AddPantryItemModal from '@/components/pantry/AddPantryItemModal';
import { PantryItemProps, PantryStatus } from '@/components/pantry/PantryItem';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const INITIAL_CATEGORIES = [
  { 
    name: 'Vegetables', 
    icon: 'leaf', 
    color: '#4ECDC4', 
    items: [
      { name: 'Fresh Spinach', qty: '500g', status: 'In Stock' as PantryStatus, source: 'Salad Recipe' },
      { name: 'Organic Carrots', qty: '1kg', status: 'Low' as PantryStatus, source: 'Manual' },
      { name: 'Bell Peppers', qty: '3 units', status: 'In Stock' as PantryStatus, source: 'Pasta Recipe' },
    ] 
  },
  { 
    name: 'Proteins', 
    icon: 'fitness', 
    color: '#FF6B6B', 
    items: [
      { name: 'Chicken Breast', qty: '800g', status: 'In Stock' as PantryStatus, source: 'Meal Prep' },
      { name: 'Large Eggs', qty: '12pcs', status: 'In Stock' as PantryStatus, source: 'Breakfast' },
      { name: 'Atlantic Salmon', qty: '400g', status: 'Out of Stock' as PantryStatus, source: 'Dinner' },
    ] 
  },
  { 
    name: 'Dairy', 
    icon: 'water', 
    color: '#4E54C8', 
    items: [
      { name: 'Greek Yogurt', qty: '500g', status: 'Low' as PantryStatus, source: 'Manual' },
      { name: 'Almond Milk', qty: '1L', status: 'In Stock' as PantryStatus, source: 'Manual' },
    ] 
  },
];

const SUGGESTIONS = ['Milk', 'Avocado', 'Oats', 'Honey', 'Eggs', 'Yogurt'];

export default function GroceryScreen() {
  const { theme, isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleStatus = (catIdx: number, itemIdx: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nextCats = [...categories];
    const item = nextCats[catIdx].items[itemIdx];
    
    if (item.status === 'In Stock') item.status = 'Low';
    else if (item.status === 'Low') item.status = 'Out of Stock';
    else item.status = 'In Stock';
    
    setCategories(nextCats);
  };

  const addItem = (newItem: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nextCats = [...categories];
    const catIdx = nextCats.findIndex(c => c.name === newItem.category);
    
    if (catIdx > -1) {
      nextCats[catIdx].items.unshift(newItem);
    } else {
      nextCats.push({
        name: newItem.category,
        icon: 'apps',
        color: '#A29BFE',
        items: [newItem]
      });
    }
    setCategories(nextCats);
  };

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === 'All' || item.status === activeFilter;
      return matchesSearch && matchesFilter;
    })
  })).filter(cat => cat.items.length > 0);

  return (
    <ScreenWrapper title="Smart Pantry" subtitle="Real-time kitchen inventory">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Glass Search bar */}
        <View style={[styles.searchContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : theme.card, borderColor: theme.border }]}>
          <Ionicons name="search" size={20} color={theme.placeholder} />
          <TextInput 
            style={[styles.input, { color: theme.text }]}
            placeholder="Search your pantry..."
            placeholderTextColor={theme.placeholder}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity 
            style={[styles.addBtn, { backgroundColor: theme.primary }]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={24} color={theme.white} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
          {['All', 'In Stock', 'Low', 'Out of Stock'].map((filter) => (
            <TouchableOpacity 
              key={filter} 
              style={[
                styles.filterChip, 
                { 
                  backgroundColor: activeFilter === filter ? theme.primary : theme.surface,
                  borderColor: activeFilter === filter ? theme.primary : theme.border
                }
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, { color: activeFilter === filter ? theme.white : theme.text }]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Pantry Content */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, idx) => (
            <CategorySection 
              key={cat.name}
              title={cat.name}
              icon={cat.icon}
              color={cat.color}
              items={cat.items}
              onItemPress={(item) => {
                // Find global index and toggle
                const globalCatIdx = categories.findIndex(c => c.name === cat.name);
                const globalItemIdx = categories[globalCatIdx].items.findIndex(i => i.name === item.name);
                toggleStatus(globalCatIdx, globalItemIdx);
              }}
            />
          ))
        ) : (
          <View style={styles.emptyView}>
            <Ionicons name="cart-outline" size={64} color={theme.placeholder + '40'} />
            <Text style={[styles.emptyText, { color: theme.placeholder }]}>No items found</Text>
          </View>
        )}

        {/* Frequent suggestions */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Frequent Purchases</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsRow}>
          {SUGGESTIONS.map((item, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.suggestionChip, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => addItem({ name: item, qty: '1 unit', category: 'Others', source: 'Suggested', status: 'In Stock' })}
            >
              <Text style={[styles.suggestionText, { color: theme.text }]}>+ {item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <AddPantryItemModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={addItem}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16,
    borderRadius: 22,
    borderWidth: 1.5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 44,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersRow: {
    marginBottom: 30,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 15,
    marginTop: 10,
    letterSpacing: 0.3,
  },
  suggestionsRow: {
    flexDirection: 'row',
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    marginRight: 10,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
});
