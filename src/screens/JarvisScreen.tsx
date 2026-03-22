import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import JarvisHeader from '@/components/chat/JarvisHeader';
import VoiceVisualizer from '@/components/chat/VoiceVisualizer';
import { useTheme } from '@/hooks/useTheme';

export default function JarvisScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Tap bottom button to speak');

  const chefScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(chefScale, {
            toValue: 1.05,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(chefScale, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.spring(chefScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
      chefScale.stopAnimation();
    }
  }, [isListening]);

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setStatus('Listening...');
      // Simulate stopping listening and AI processing
      setTimeout(() => {
        setIsListening(false);
        setStatus('Astra is thinking...');
        setTimeout(() => {
          setStatus('Astra is responding...');
        }, 1500);
      }, 4000);
    } else {
      setIsListening(false);
      setStatus('Tap bottom button to speak');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0B0B' }}>
      <StatusBar style="light" />
      <ScreenWrapper
        useTopInset={true}
        style={{ backgroundColor: '#0A0B0B' }}
        transparentHeader={true}
      >
        <JarvisHeader onBack={() => navigation.goBack()} hideImage={true} />

        <View style={styles.content}>
          <View style={styles.immersiveChefBox}>
            <Animated.View style={[styles.mainChefWrapper, { transform: [{ scale: chefScale }] }]}>
              <VoiceVisualizer active={isListening} />
              <Image
                source={require('@/assets/images/jarvis_chef.png')}
                style={styles.chefImageFull}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          <View style={[styles.statusBox, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }]}>
            <Text style={[styles.statusTitle, { color: '#FFFFFF' }]}>Astra AI Assistant</Text>
            <Text style={[styles.statusSubtitle, { color: isListening ? theme.primary : '#8E9491' }]}>
              {status}
            </Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={[styles.sideButton, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.micButton, isListening && styles.micButtonActive, { shadowColor: isListening ? theme.error : theme.primary }]}
              activeOpacity={0.8}
              onPress={toggleListening}
            >
              <LinearGradient
                colors={isListening ? [theme.error, theme.error + 'CC'] : [theme.primary, theme.primary + 'CC']}
                style={styles.micGradient}
              >
                <Ionicons
                  name={isListening ? "mic" : "mic-outline"}
                  size={36}
                  color={theme.white}
                />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.sideButton, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }]}>
              <Ionicons name="volume-high-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 25,
    zIndex: 1,
  },
  immersiveChefBox: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mainChefWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chefImageFull: {
    width: '120%', // Massive scale
    height: '100%',
    marginTop: -20,
  },
  bottomBlend: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  statusBox: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 30, // Pushes it away from the mic
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: 1,
  },
  statusSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  sideButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  micButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    elevation: 15,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  micButtonActive: {
    transform: [{ scale: 1.1 }],
  },
  micGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
