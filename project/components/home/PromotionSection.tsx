import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { PromotionCard } from '@/components/common/PromotionCard';
import { colors, spacing, typography } from '@/constants/theme';
import { Promotion } from '@/types/types';
import { useRouter } from 'expo-router';

interface PromotionSectionProps {
  promotions: Promotion[];
}

export function PromotionSection({ promotions }: PromotionSectionProps) {
  const router = useRouter();

  const handlePromotionPress = (promotion: Promotion) => {
    // Navigate to promotion details or apply promotion
    console.log(`Promotion pressed: ${promotion.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Special Offers</Text>
        <Text style={styles.description}>
          Discover our latest promotions and seasonal specials
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {promotions.map((promotion) => (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            onPress={() => handlePromotionPress(promotion)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
});