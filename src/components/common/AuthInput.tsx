import React from 'react';
import { StyleSheet, View, TextInput, Text, TextInputProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ 
  label, 
  icon, 
  error, 
  ...props 
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[(colorScheme as 'light' | 'dark') ?? 'light'];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, Typography.label, { color: theme.text }]}>{label}</Text>
      <View style={[
          styles.inputContainer, 
          { backgroundColor: theme.surface, borderColor: error ? theme.error : theme.border }
      ]}>
        {icon && <Ionicons name={icon} size={20} color={theme.icon} style={styles.icon} />}
        <TextInput
          placeholderTextColor={theme.icon}
          style={[styles.input, { color: theme.text }]}
          {...props}
        />
      </View>
      {error && <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
