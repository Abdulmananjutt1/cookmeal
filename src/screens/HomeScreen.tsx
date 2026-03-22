import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import ScreenWrapper from '@/components/common/ScreenWrapper';
import HomeHeader from '@/components/home/HomeHeader';
import HomeSearchBar from '@/components/home/HomeSearchBar';
import AIToolsList from '@/components/home/AIToolsList';
import FeaturedRecipes from '@/components/home/FeaturedRecipes';

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <HomeHeader />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <HomeSearchBar />
        <AIToolsList />
        <FeaturedRecipes />
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
