import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/hooks/useTheme';

export type HeaderProps = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  rightText?: string;
  onRightPress?: () => void;
  rightColor?: string;
  transparent?: boolean;
};

export default function Header({ 
  title, 
  subtitle,
  showBack = false, 
  onBackPress, 
  rightIcon, 
  rightText,
  onRightPress, 
  rightColor,
  transparent = false 
}: HeaderProps) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[
      styles.header, 
      { 
        backgroundColor: transparent ? 'transparent' : theme.background,
        borderBottomColor: transparent ? 'transparent' : theme.border,
        borderBottomWidth: transparent ? 0 : 1 
      }
    ]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={28} color={theme.text} />
          </TouchableOpacity>
        )}
        <View style={styles.titleWrapper}>
          {title && (
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.placeholder }]} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={styles.iconBtn}>
            <Ionicons name={rightIcon} size={24} color={rightColor || theme.primary} />
          </TouchableOpacity>
        ) : rightText ? (
          <TouchableOpacity onPress={onRightPress} style={styles.textBtn}>
            <Text style={[styles.rightText, { color: rightColor || theme.primary }]}>{rightText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 25,
    paddingBottom: 15,
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  titleWrapper: {
    justifyContent: 'center',
    marginLeft: 4,
  },
  rightContainer: {
    width: 60,
    alignItems: 'flex-end',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    height: 44,
  },
  rightText: {
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
});
