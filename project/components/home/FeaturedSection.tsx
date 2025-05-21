import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ProductCard } from '@/components/common/ProductCard';
import { colors, spacing, typography } from '@/constants/theme';
import { Product } from '@/types/types';

interface FeaturedSectionProps {
  title: string;
  description?: string;
  products: Product[];
  showViewAll?: boolean;
  onViewAllPress?: () => void;
}

export function FeaturedSection({
  title,
  description,
  products,
  showViewAll = true,
  onViewAllPress,
}: FeaturedSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        {showViewAll && (
          <Text style={styles.viewAll} onPress={onViewAllPress}>
            View All
          </Text>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  viewAll: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.accent.main,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
});