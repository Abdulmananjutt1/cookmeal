import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import ScannerOverlay from '@/components/analyzer/ScannerOverlay';
import { useTheme } from '@/hooks/useTheme';

export default function MealAnalyzerScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const [appState, setAppState] = useState<'CAPTURE' | 'SCANNING'>('CAPTURE');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const startScan = (imageUri: string) => {
    setSelectedImage(imageUri);
    setAppState('SCANNING');
    
    // Simulate AI Scan duration
    setTimeout(() => {
      setAppState('CAPTURE');
      navigation.navigate('MealAnalyzerResult', { imageUri });
    }, 3500);
  };

  const handleCapture = () => {
    startScan('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop');
  };

  const handleGallery = () => {
    startScan('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop');
  };

  return (
    <ScreenWrapper 
      title="AI Meal Analyzer" 
      showBack={true} 
      rightIcon="flask-outline" 
      onRightPress={() => navigation.navigate('MealAnalyzerResult')}
    >


      <View style={styles.scrollContent}>
        {/* Main Viewport */}
        <View style={styles.viewportSection}>
          <View style={[styles.imageBox, { borderColor: theme.border, backgroundColor: theme.surface }]}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.mealImage} />
            ) : (
              <View style={styles.placeholderBox}>
                <Ionicons name="camera-outline" size={60} color={theme.placeholder} />
                <Text style={[styles.placeholderText, { color: theme.placeholder }]}>Point your camera at your meal</Text>
              </View>
            )}
            {appState === 'SCANNING' && <ScannerOverlay color={theme.primary} />}
          </View>
          
          {appState === 'SCANNING' && (
            <Text style={[styles.statusText, { color: theme.primary }]}>AI ANALYZING MEAL...</Text>
          )}
        </View>

        {/* Capture Controls */}
        {appState === 'CAPTURE' && (
          <View style={styles.captureControls}>
            <TouchableOpacity style={styles.sideControl} onPress={handleGallery}>
              <Ionicons name="images-outline" size={24} color={theme.text} />
              <Text style={[styles.controlLabel, { color: theme.text }]}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mainCaptureBtn} onPress={handleCapture}>
              <View style={[styles.captureInner, { borderColor: theme.primary }]}>
                <View style={[styles.captureCore, { backgroundColor: theme.primary }]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sideControl}>
              <Ionicons name="flash-outline" size={24} color={theme.text} />
              <Text style={[styles.controlLabel, { color: theme.text }]}>Auto</Text>
            </TouchableOpacity>
          </View>
        )}
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
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  viewportSection: {
    alignItems: 'center',
    marginTop: -40,
  },
  imageBox: {
    width: '85%',
    aspectRatio: 1,
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  mealImage: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholderBox: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  statusText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  captureControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  mainCaptureBtn: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  captureCore: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  sideControl: {
    alignItems: 'center',
    width: 60,
  },
  controlLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
