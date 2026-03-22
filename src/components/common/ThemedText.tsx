import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useColorScheme } from '@/hooks/useColorScheme';

type TypographyType = keyof typeof Typography;

interface ThemedTextProps extends TextProps {
  type?: TypographyType;
  colorType?: keyof typeof Colors.light;
  customColor?: string;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  type = 'bodyMedium', 
  colorType = 'text', 
  customColor,
  style, 
  children, 
  ...props 
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[(colorScheme as 'light' | 'dark') ?? 'light'];
  
  const textStyle: TextStyle = {
    ...Typography[type],
    color: customColor || (theme[colorType] as string),
  };

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};
