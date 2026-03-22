import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MessageProps = {
  text: string;
  sender: 'user' | 'chef';
  time: string;
};

export default function ChatMessageBubble({ text, sender, time }: MessageProps) {
  const isUser = sender === 'user';

  return (
    <View style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowChef]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <Ionicons name="sparkles" size={14} color="#FFF" />
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        isUser ? styles.bubbleUser : styles.bubbleChef
      ]}>
        <Text style={[styles.messageText, isUser ? styles.textUser : styles.textChef]}>
          {text}
        </Text>
        <Text style={[styles.timeText, isUser ? styles.timeUser : styles.timeChef]}>
          {time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowChef: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 24,
  },
  bubbleUser: {
    backgroundColor: '#FF6B6B', // vibrant primary
    borderBottomRightRadius: 6,
    elevation: 4,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bubbleChef: {
    backgroundColor: 'rgba(255,255,255,0.08)', // Dark glass effect
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  textUser: {
    color: '#FFF',
    fontWeight: '500',
  },
  textChef: {
    color: '#E0E0E0', 
    fontWeight: '400',
  },
  timeText: {
    fontSize: 11,
    marginTop: 8,
    alignSelf: 'flex-end',
    fontWeight: '600',
  },
  timeUser: {
    color: 'rgba(255,255,255,0.7)',
  },
  timeChef: {
    color: 'rgba(255,255,255,0.4)',
  },
});
