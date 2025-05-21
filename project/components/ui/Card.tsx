import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, shadows, borderRadius } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'small' | 'medium' | 'large' | 'none';
  background?: string;
  rounded?: boolean;
}

export function Card({
  children,
  style,
  elevation = 'medium',
  background = colors.background.card,
  rounded = true,
}: CardProps) {
  const cardStyles = [
    styles.card,
    rounded && styles.rounded,
    elevation !== 'none' && styles[`elevation_${elevation}`],
    { backgroundColor: background },
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: colors.background.card,
    width: '100%',
  },
  rounded: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  elevation_small: {
    ...shadows.small,
  },
  elevation_medium: {
    ...shadows.medium,
  },
  elevation_large: {
    ...shadows.large,
  },
});