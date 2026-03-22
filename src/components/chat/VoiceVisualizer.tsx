import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export default function VoiceVisualizer({ active }: { active: boolean }) {
  const { theme } = useTheme();
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.5)).current;

  const pulseScale2 = useRef(new Animated.Value(1)).current;
  const pulseOpacity2 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (active) {
      const animate = () => {
        pulseScale.setValue(1);
        pulseOpacity.setValue(0.5);
        pulseScale2.setValue(1);
        pulseOpacity2.setValue(0.3);

        Animated.parallel([
          Animated.loop(
            Animated.sequence([
              Animated.timing(pulseScale, {
                toValue: 2,
                duration: 2000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(pulseOpacity, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
              }),
            ])
          ),
          Animated.loop(
            Animated.sequence([
              Animated.delay(1000),
              Animated.timing(pulseScale2, {
                toValue: 2.5,
                duration: 2500,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              Animated.timing(pulseOpacity2, {
                toValue: 0,
                duration: 2500,
                useNativeDriver: true,
              }),
            ])
          ),
        ]).start();
      };
      animate();
    } else {
      pulseScale.stopAnimation();
      pulseScale2.stopAnimation();
    }
  }, [active]);

  return (
    <View style={styles.container}>
      {active && (
        <>
          <Animated.View 
            style={[
              styles.pulse, 
              { 
                transform: [{ scale: pulseScale }], 
                opacity: pulseOpacity,
                borderColor: theme.error 
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.pulse, 
              { 
                transform: [{ scale: pulseScale2 }], 
                opacity: pulseOpacity2,
                borderColor: theme.primary 
              }
            ]} 
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  pulse: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    borderWidth: 2,
  },
});
