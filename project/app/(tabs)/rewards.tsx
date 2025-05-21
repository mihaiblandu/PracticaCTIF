import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/ui/Card';
import { RewardCard } from '@/components/common/RewardCard';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';

import { rewards } from '@/data/mockData';

export default function RewardsScreen() {
  const currentPoints = 350;

  const handleRewardPress = (rewardId: string) => {
    console.log(`Reward pressed: ${rewardId}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Rewards" subtitle="Earn points, get free coffee" />
      
      <View style={styles.content}>
        {/* Points Summary */}
        <Card style={styles.pointsCard}>
          <Text style={styles.pointsTitle}>Your Points</Text>
          <Text style={styles.pointsValue}>{currentPoints}</Text>
          
          <View style={styles.nextRewardContainer}>
            <Text style={styles.nextRewardText}>
              {currentPoints >= 50 
                ? 'You have enough points for rewards!'
                : `${50 - currentPoints} more points until your next reward`
              }
            </Text>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min((currentPoints / 50) * 100, 100)}%` }
                ]} 
              />
            </View>
          </View>
        </Card>
        
        {/* How It Works */}
        <Card style={styles.howItWorksCard}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Sign In & Order</Text>
              <Text style={styles.stepDescription}>
                Place orders while signed in to your account
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Earn Points</Text>
              <Text style={styles.stepDescription}>
                Get 10 points for every dollar spent
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Redeem Rewards</Text>
              <Text style={styles.stepDescription}>
                Use your points for free drinks and food
              </Text>
            </View>
          </View>
        </Card>
        
        {/* Available Rewards */}
        <View style={styles.rewardsContainer}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              currentPoints={currentPoints}
              onPress={() => handleRewardPress(reward.id)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: spacing.md,
  },
  pointsCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  pointsTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  pointsValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxxl,
    color: colors.accent.main,
    marginBottom: spacing.md,
  },
  nextRewardContainer: {
    width: '100%',
  },
  nextRewardText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: 4,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.main,
    borderRadius: 4,
  },
  howItWorksCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumber: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.text.inverse,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  stepDescription: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  rewardsContainer: {
    marginBottom: spacing.lg,
  },
});