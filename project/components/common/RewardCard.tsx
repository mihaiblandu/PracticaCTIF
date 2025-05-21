import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { Reward } from '@/types/types';
import { Gift } from 'lucide-react-native';

interface RewardCardProps {
  reward: Reward;
  currentPoints: number;
  onPress: () => void;
}

export function RewardCard({ reward, currentPoints, onPress }: RewardCardProps) {
  const canRedeem = currentPoints >= reward.pointsCost;
  
  return (
    <Card style={styles.card}>
      <View style={styles.iconContainer}>
        <Gift size={32} color={colors.accent.main} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{reward.name}</Text>
        <Text style={styles.description}>{reward.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.points}>{reward.pointsCost} points</Text>
          <Button
            title={canRedeem ? "Redeem" : "Not Enough Points"}
            variant={canRedeem ? "primary" : "outline"}
            size="small"
            onPress={onPress}
            disabled={!canRedeem}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  points: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.accent.main,
  },
});