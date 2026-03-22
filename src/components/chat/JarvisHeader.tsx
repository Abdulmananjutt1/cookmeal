import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';

export default function JarvisHeader({ onBack, hideImage = false }: { onBack: () => void; hideImage?: boolean }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const renderContent = () => (
    <>
      <View style={[styles.headerTop, { paddingTop: 20, paddingBottom: 30 }]}>
        <View style={styles.sideContainer}>
          <TouchableOpacity onPress={onBack} style={[styles.iconBtn, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.centerHeaderContainer}>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>Astra</Text>
        </View>

        <View style={[styles.sideContainer, { alignItems: 'flex-end' }]}>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  if (hideImage) {
    return (
      <View style={[styles.headerTop, { paddingTop: 15, paddingBottom: 15, backgroundColor: '#0A0B0B' }]}>
        {renderContent()}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#0A0B0B' }]}>
      <ImageBackground
        source={require('@/assets/images/jarvis_chef.png')}
        style={styles.imageBg}
        imageStyle={{ opacity: 0.8 }}
      >
        <LinearGradient
          colors={['transparent', theme.background + 'CC', theme.background]}
          style={StyleSheet.absoluteFillObject}
          locations={[0, 0.4, 1]}
        />
        {renderContent()}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 380, // Massive immersive height
    width: '100%',
  },
  imageBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  sideContainer: {
    width: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
