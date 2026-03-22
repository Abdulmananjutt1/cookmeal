import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ScreenWrapper from '@/components/common/ScreenWrapper';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileMenu from '@/components/profile/ProfileMenu';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenWrapper useTopInset={false}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ProfileHeader
          name="Chef Alex"
          handle="@alex_cooks"
          bio="Food enthusiast & AI Chef explorer. Sharing simple, healthy and delicious recipes every single day! 🍳🥗"
          avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
        />

        <ProfileStats
          recipes="128"
          followers="10.5k"
          following="245"
        />

        <ProfileMenu />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
