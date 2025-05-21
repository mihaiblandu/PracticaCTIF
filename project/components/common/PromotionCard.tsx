import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { Promotion } from '@/types/types';
import { ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PromotionCardProps {
  promotion: Promotion;
  onPress: () => void;
}

export function PromotionCard({ promotion, onPress }: PromotionCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card style={styles.card} elevation="large">
        <Image source={{ uri: promotion.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{promotion.title}</Text>
            <Text style={styles.description}>{promotion.description}</Text>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>Learn More</Text>
              <ArrowRight size={16} color={colors.accent.light} />
            </View>
          </View>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    height: 240,
    marginBottom: spacing.md,
    width: 300,
    marginRight: spacing.md,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.md,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
    justifyContent: 'flex-end',
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.text.inverse,
    marginBottom: spacing.xs,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.inverse,
    opacity: 0.9,
    marginBottom: spacing.md,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.accent.light,
    marginRight: spacing.xs,
  },
});