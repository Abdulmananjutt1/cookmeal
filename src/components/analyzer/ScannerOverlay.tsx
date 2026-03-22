import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';

const { width } = Dimensions.get('window');
const SCANNER_SIZE = width * 0.8;

export default function ScannerOverlay({ color }: { color?: string }) {
  const { theme } = useTheme();
  const activeColor = color || theme.primary;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: SCANNER_SIZE,
            duration: 2000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    animate();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.scannerBox, { borderColor: theme.text + '1A' }]}>
        {/* Corner Brackets */}
        <View style={[styles.corner, styles.topLeft, { borderColor: activeColor }]} />
        <View style={[styles.corner, styles.topRight, { borderColor: activeColor }]} />
        <View style={[styles.corner, styles.bottomLeft, { borderColor: activeColor }]} />
        <View style={[styles.corner, styles.bottomRight, { borderColor: activeColor }]} />

        {/* Laser Line */}
        <Animated.View style={[styles.laserLine, { transform: [{ translateY }] }]}>
          <LinearGradient
            colors={['transparent', activeColor, 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientLine}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerBox: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  laserLine: {
    width: '100%',
    height: 3,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  gradientLine: {
    flex: 1,
  },
});
