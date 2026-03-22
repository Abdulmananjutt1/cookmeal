import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';

export default function HelpSupportScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <ScreenWrapper title="Help & Support" showBack={true}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Support Hero - ULTRA PREMIUM */}
        <TouchableOpacity 
            style={[styles.heroCard, { shadowColor: theme.primary }]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Chat')}
        >
          <LinearGradient
            colors={['#4E54C8', '#8F94FB']}
            style={styles.heroGradient}
          >
            <View style={styles.heroInfo}>
                <View style={[styles.bubbleIcon, { backgroundColor: theme.surface }]}>
                    <Ionicons name="sparkles" size={24} color="#4E54C8" />
                </View>
                <View>
                    <Text style={styles.heroTitle}>Chat with Astra</Text>
                    <Text style={styles.heroSub}>Instant AI Support 24/7</Text>
                </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={40} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

        {/* FAQ Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Common Questions</Text>
        
        <FAQItem title="How do I track my water intake?" theme={theme} />
        <FAQItem title="Can I customize my meal plan?" theme={theme} />
        <FAQItem title="How to reset my password?" theme={theme} />
        <FAQItem title="Is my data secure with Astra?" theme={theme} />

        {/* Contact Stage */}
        <View style={[styles.contactCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
           <Text style={[styles.contactTitle, { color: theme.text }]}>Still need help?</Text>
           <Text style={[styles.contactSub, { color: theme.placeholder }]}>Our team is here to assist you.</Text>
           
           <View style={styles.actions}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.primary + '15' }]}>
                 <Ionicons name="mail-outline" size={20} color={theme.primary} />
                 <Text style={[styles.actionText, { color: theme.primary }]}>Support Email</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.primary + '15' }]}>
                 <Ionicons name="call-outline" size={20} color={theme.primary} />
                 <Text style={[styles.actionText, { color: theme.primary }]}>Call Center</Text>
              </TouchableOpacity>
           </View>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}

function FAQItem({ title, theme }: any) {
    return (
        <TouchableOpacity style={[styles.faqRow, { borderBottomColor: theme.border }]}>
            <Text style={[styles.faqText, { color: theme.text }]}>{title}</Text>
            <Ionicons name="chevron-down" size={18} color={theme.placeholder} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginLeft: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 35,
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  heroGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
  },
  heroInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  bubbleIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  heroSub: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 15,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  faqText: {
    fontSize: 15,
    fontWeight: '600',
  },
  contactCard: {
    marginTop: 40,
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5,
  },
  contactSub: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
