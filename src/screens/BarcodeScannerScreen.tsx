import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { useTheme } from '@/hooks/useTheme';

const { width } = Dimensions.get('window');
const SCAN_FRAME_SIZE = width * 0.7;

export default function BarcodeScannerScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: SCAN_FRAME_SIZE,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleTestScan = () => {
    navigation.navigate('BarcodeResult');
  };

  return (
    <ScreenWrapper 
      title="Barcode Scanner" 
      showBack={true} 
      rightIcon="flask-outline" 
      onRightPress={handleTestScan}
    >


      <View style={styles.main}>
        <Text style={[styles.instruction, { color: theme.placeholder }]}>
          Align barcode within the frame to scan
        </Text>

        <View style={styles.scanContainer}>
          <View style={[styles.scanFrame, { borderColor: theme.border }]}>
            {/* Corner Brackets */}
            <View style={[styles.corner, styles.topLeft, { borderColor: theme.primary }]} />
            <View style={[styles.corner, styles.topRight, { borderColor: theme.primary }]} />
            <View style={[styles.corner, styles.bottomLeft, { borderColor: theme.primary }]} />
            <View style={[styles.corner, styles.bottomRight, { borderColor: theme.primary }]} />

            {/* Animated Scan Line */}
            <Animated.View 
              style={[
                styles.scanLine, 
                { 
                  backgroundColor: theme.primary, 
                  transform: [{ translateY: scanLineAnim }],
                  shadowColor: theme.primary,
                }
              ]} 
            />
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={[styles.controlBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name="flash-outline" size={28} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBtn, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={() => {}}>
            <Ionicons name="images-outline" size={28} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 40,
    textAlign: 'center',
  },
  scanContainer: {
    width: SCAN_FRAME_SIZE,
    height: SCAN_FRAME_SIZE,
    position: 'relative',
  },
  scanFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  scanLine: {
    width: '100%',
    height: 3,
    position: 'absolute',
    top: 0,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    zIndex: 10,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 15,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 15,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 15,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 15,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 60,
    gap: 40,
  },
  controlBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
