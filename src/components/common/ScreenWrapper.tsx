import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import Header, { HeaderProps } from './Header';

interface ScreenWrapperProps extends ViewProps {
  children: ReactNode;
  useTopInset?: boolean;
  useBottomInset?: boolean;
  withScroll?: boolean;
  scrollProps?: any;
  // Header Props
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  rightIcon?: HeaderProps['rightIcon'];
  rightText?: string;
  onRightPress?: HeaderProps['onRightPress'];
  transparentHeader?: boolean;
}

export default function ScreenWrapper({ 
  children, 
  useTopInset = true, 
  useBottomInset = false,
  withScroll = false,
  scrollProps = {},
  style,
  title,
  subtitle,
  showBack,
  rightIcon,
  rightText,
  onRightPress,
  transparentHeader = false,
  ...props 
}: ScreenWrapperProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const renderContent = () => {
    if (withScroll) {
      return (
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          {...scrollProps}
          contentContainerStyle={[
            scrollProps.contentContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      );
    }
    return children;
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.background,
          paddingTop: useTopInset ? insets.top : 0,
          paddingBottom: useBottomInset ? insets.bottom : 0,
        },
        style
      ]}
      {...props}
    >
      {(title || showBack) && (
        <Header 
          title={title} 
          subtitle={subtitle}
          showBack={showBack} 
          rightIcon={rightIcon} 
          rightText={rightText}
          onRightPress={onRightPress}
          transparent={transparentHeader}
        />
      )}
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
