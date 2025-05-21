import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { Product } from '@/types/types';
import { CirclePlus as PlusCircle } from 'lucide-react-native';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <Card 
        style={[
          styles.card, 
          compact ? styles.cardCompact : styles.cardFull
        ]}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
          />
          {product.new && <View style={styles.newBadge}><Text style={styles.badgeText}>NEW</Text></View>}
          {product.featured && !product.new && <View style={styles.featuredBadge}><Text style={styles.badgeText}>FEATURED</Text></View>}
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          {!compact && (
            <Text style={styles.description} numberOfLines={2}>
              {product.description}
            </Text>
          )}
          <View style={styles.footer}>
            <Button
              title="Add to Order"
              variant="outline"
              size="small"
              onPress={handlePress}
              icon={<PlusCircle size={16} color={colors.primary.main} style={{marginRight: 4}} />}
              iconPosition="left"
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  cardFull: {
    width: Platform.OS === 'web' ? 320 : '100%',
  },
  cardCompact: {
    width: Platform.OS === 'web' ? 200 : 160,
    marginRight: spacing.md,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    flex: 1,
  },
  price: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.accent.main,
    marginLeft: spacing.sm,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  newBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.util.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  featuredBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.accent.main,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.bold,
  },
});