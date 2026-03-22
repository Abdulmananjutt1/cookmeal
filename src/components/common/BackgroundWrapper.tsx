import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface BackgroundWrapperProps extends ViewProps {
  children: React.ReactNode;
  disableSafeArea?: boolean;
}

export const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ 
  children, 
  style, 
  disableSafeArea = false,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[(colorScheme as 'light' | 'dark') ?? 'light'];

  const Container = disableSafeArea ? View : SafeAreaView;

  return (
    <View style={[styles.outerContainer, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.background}
      />
      <Container style={[styles.innerContainer, style]} {...props}>
        {children}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});
