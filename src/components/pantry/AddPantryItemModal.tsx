import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
};

const CATEGORIES = [
  { name: 'Vegetables', icon: 'leaf', color: '#4ECDC4' },
  { name: 'Proteins', icon: 'fitness', color: '#FF6B6B' },
  { name: 'Dairy', icon: 'water', color: '#4E54C8' },
  { name: 'Grains', icon: 'nutrition', color: '#F7B733' },
  { name: 'Others', icon: 'apps', color: '#A29BFE' },
];

export default function AddPantryItemModal({ visible, onClose, onSave }: Props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [source, setSource] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name, qty, category, source, status: 'In Stock' });
    setName('');
    setQty('');
    setSource('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}
            >
              <View 
                style={[
                  styles.card, 
                  { 
                    backgroundColor: theme.card,
                    paddingBottom: Math.max(insets.bottom, 20),
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                  }
                ]}
              >
                {/* Bottom filler to ensure no gaps */}
                <View 
                  style={{
                    position: 'absolute',
                    bottom: -100,
                    left: -1,
                    right: -1,
                    height: 100,
                    backgroundColor: theme.card,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: theme.border,
                  }} 
                />
                {/* Pull indicator */}
                <View style={[styles.indicator, { backgroundColor: theme.placeholder + '40' }]} />

                <View style={styles.header}>
                  <Text style={[styles.title, { color: theme.text }]}>Add to Pantry</Text>
                  <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: theme.surface }]}>
                    <Ionicons name="close" size={20} color={theme.text} />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.placeholder }]}>Item Name</Text>
                    <TextInput 
                      style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
                      placeholder="e.g. Greek Yogurt"
                      placeholderTextColor={theme.placeholder}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>

                  <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                      <Text style={[styles.label, { color: theme.placeholder }]}>Quantity</Text>
                      <TextInput 
                        style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
                        placeholder="e.g. 500g"
                        placeholderTextColor={theme.placeholder}
                        value={qty}
                        onChangeText={setQty}
                      />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1.5 }]}>
                      <Text style={[styles.label, { color: theme.placeholder }]}>Source (Optional)</Text>
                      <TextInput 
                        style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.border }]}
                        placeholder="e.g. Salad Recipe"
                        placeholderTextColor={theme.placeholder}
                        value={source}
                        onChangeText={setSource}
                      />
                    </View>
                  </View>

                  <Text style={[styles.label, { color: theme.placeholder, marginBottom: 12 }]}>Category</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
                    {CATEGORIES.map((cat, idx) => (
                      <TouchableOpacity 
                        key={idx}
                        style={[
                          styles.categoryChip, 
                          { backgroundColor: category === cat.name ? cat.color : theme.surface },
                        ]}
                        onPress={() => setCategory(cat.name)}
                      >
                        <Ionicons name={cat.icon as any} size={16} color={category === cat.name ? '#fff' : theme.placeholder} />
                        <Text style={[styles.categoryText, { color: category === cat.name ? '#fff' : theme.text }]}>{cat.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <TouchableOpacity 
                    style={[styles.saveBtn, { backgroundColor: theme.primary }]}
                    onPress={handleSave}
                  >
                    <Text style={styles.saveText}>Add Item</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
  },
  card: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 28,
    paddingTop: 16,
    maxHeight: '96%',
  },
  indicator: {
    width: 60,
    height: 6,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 26,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    height: 64,
    borderRadius: 22,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  categoriesRow: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 20,
    marginRight: 12,
    gap: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '700',
  },
  saveBtn: {
    height: 68,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  saveText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
