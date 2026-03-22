import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type ProfileHeaderProps = {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
};

export default function ProfileHeader({ name, handle, bio, avatarUrl }: ProfileHeaderProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Background Graphic */}
      <View style={[styles.curveBackground, { backgroundColor: theme.primary, shadowColor: theme.text }]} />
      
      {/* Avatar Content */}
      <View style={styles.avatarSection}>
        <View style={[styles.avatarWrapper, { borderColor: theme.surface, backgroundColor: theme.surface, shadowColor: theme.text }]}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        </View>
        
        <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
        <Text style={[styles.handle, { color: theme.placeholder }]}>{handle}</Text>
        <Text style={[styles.bio, { color: theme.text }]}>{bio}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  curveBackground: {
    width: width,
    height: 140,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    top: 0,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 80, // overlap the background
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    overflow: 'hidden',
    elevation: 6,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  handle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});
