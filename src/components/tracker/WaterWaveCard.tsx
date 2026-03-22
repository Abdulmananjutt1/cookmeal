import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Svg, { Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_W = (width - 55) / 2;
const CARD_H = 180;

function buildWavePath(
  waveWidth: number,
  waveHeight: number,
  amplitude: number,
  yOffset: number
): string {
  const cp = amplitude * 0.5;
  return [
    `M 0 ${yOffset}`,
    `C ${waveWidth * 0.25} ${yOffset - cp}, ${waveWidth * 0.25} ${yOffset + cp}, ${waveWidth * 0.5} ${yOffset}`,
    `C ${waveWidth * 0.75} ${yOffset - cp}, ${waveWidth * 0.75} ${yOffset + cp}, ${waveWidth} ${yOffset}`,
    `C ${waveWidth * 1.25} ${yOffset - cp}, ${waveWidth * 1.25} ${yOffset + cp}, ${waveWidth * 1.5} ${yOffset}`,
    `C ${waveWidth * 1.75} ${yOffset - cp}, ${waveWidth * 1.75} ${yOffset + cp}, ${waveWidth * 2} ${yOffset}`,
    `L ${waveWidth * 2} ${waveHeight}`,
    `L 0 ${waveHeight}`,
    'Z',
  ].join(' ');
}

type Props = {
  waterIntake: number;
  goalLitres?: number;
  onAdd: () => void;
  onRemove: () => void;
};

export default function WaterWaveCard({
  waterIntake,
  goalLitres = 4,
  onAdd,
  onRemove,
}: Props) {
  const shift1 = useRef(new Animated.Value(0)).current;
  const shift2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shift1, {
        toValue: -CARD_W,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
    Animated.loop(
      Animated.timing(shift2, {
        toValue: -CARD_W,
        duration: 3200,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const fillPct = Math.min(waterIntake / goalLitres, 1);
  const waterLevelY = CARD_H * (1 - fillPct);
  const amplitude = 10;

  const wave1Path = buildWavePath(CARD_W, CARD_H, amplitude, waterLevelY + 6);
  const wave2Path = buildWavePath(CARD_W, CARD_H, amplitude, waterLevelY - 2);

  return (
    <View style={styles.card}>
      {/* Wave layer 1 */}
      <Animated.View style={[StyleSheet.absoluteFillObject, { left: shift1 }]}>
        <Svg width={CARD_W * 4} height={CARD_H}>
          <Defs>
            <ClipPath id="wclip1">
              <Rect x={0} y={0} width={CARD_W * 4} height={CARD_H} />
            </ClipPath>
          </Defs>
          <Path d={wave1Path} fill="#5bc8f5" opacity={0.4} clipPath="url(#wclip1)" />
        </Svg>
      </Animated.View>

      {/* Wave layer 2 */}
      <Animated.View style={[StyleSheet.absoluteFillObject, { left: shift2 }]}>
        <Svg width={CARD_W * 4} height={CARD_H}>
          <Defs>
            <ClipPath id="wclip2">
              <Rect x={0} y={0} width={CARD_W * 4} height={CARD_H} />
            </ClipPath>
          </Defs>
          <Path d={wave2Path} fill="#29b6f6" opacity={0.65} clipPath="url(#wclip2)" />
        </Svg>
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        <Ionicons name="water" size={22} color="rgba(255,255,255,0.92)" />
        <Text style={styles.val}>{waterIntake.toFixed(2)}L</Text>
        <Text style={styles.label}>Daily Goal: {goalLitres}L</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.fab} onPress={onRemove}>
            <Ionicons name="remove" size={14} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fab} onPress={onAdd}>
            <Ionicons name="add" size={14} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: CARD_H,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: '#0a1e36',
    elevation: 3,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    zIndex: 2,
  },
  val: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFF',
    marginTop: 8,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.82)',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 15,
  },
  fab: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
