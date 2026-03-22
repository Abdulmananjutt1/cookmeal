import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import ScreenWrapper from '@/components/common/ScreenWrapper';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'chef';
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Hello! I am Astra, your AI Health & Cooking Assistant. How can I guide you today?', sender: 'chef', time: '10:00 AM' },
  { id: '2', text: 'Astra, what can I cook with these eggs?', sender: 'user', time: '10:02 AM' },
  { id: '3', text: 'I can suggest several recipes! Based on your profile, a protein-rich scramble or a classic omelette would be perfect.', sender: 'chef', time: '10:03 AM' },
];


export default function ChatScreen() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<any>();

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Auto-scroll
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.userRow : styles.chefRow]}>
        {!isUser && (
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
             <Ionicons name="sparkles" size={14} color={theme.white} />
          </View>
        )}

        <View style={[
          styles.bubble, 
          isUser ? [styles.userBubble, { backgroundColor: theme.primary, shadowColor: theme.text }] : [styles.chefBubble, { backgroundColor: theme.surface, shadowColor: theme.text }]
        ]}>
          <Text style={[styles.messageText, { color: isUser ? theme.white : theme.text }]}>{item.text}</Text>
          <Text style={[styles.timeText, { color: isUser ? theme.white + 'B3' : theme.placeholder }]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper 
      title="Astra AI" 
      subtitle="Ask anything about health & cooking"
      useBottomInset={true}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.premiumInputArea}>
             <View style={[styles.glassInput, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', borderColor: theme.border }]}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Ask Astra..."
                  placeholderTextColor={theme.placeholder}
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                />
                <TouchableOpacity 
                   style={[styles.premiumSendBtn, { backgroundColor: theme.primary }]} 
                   onPress={sendMessage}
                   disabled={!inputText.trim()}
                >
                   <Ionicons name="send" size={18} color={theme.white} />
                </TouchableOpacity>
             </View>
          </View>
          {/* Spacer for bottom tab bar */}
          <View style={{ height: 75 }} />
        </KeyboardAvoidingView>

      </View>
    </ScreenWrapper>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  chefRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  chefBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timeText: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  premiumInputArea: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  glassInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1.5,
  },
  leftIconBox: {
    paddingLeft: 12,
  },
  premiumSendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
});
