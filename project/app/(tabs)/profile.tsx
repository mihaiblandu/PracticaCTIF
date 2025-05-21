import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { 
  User, Settings, CreditCard, Gift, ShoppingBag, 
  Heart, LogOut, ChevronRight 
} from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={40} color={colors.text.inverse} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jane Smith</Text>
            <Text style={styles.userEmail}>jane.smith@example.com</Text>
          </View>
          <Button
            title="Edit"
            variant="outline"
            size="small"
            onPress={() => {}}
            style={styles.editButton}
          />
        </View>
        
        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>350</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
        
        {/* Menu Items */}
        <Card style={styles.menuCard}>
          <Text style={styles.menuTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Settings size={20} color={colors.text.secondary} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Account Settings</Text>
            </View>
            <ChevronRight size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <CreditCard size={20} color={colors.text.secondary} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Gift size={20} color={colors.text.secondary} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Rewards</Text>
            </View>
            <ChevronRight size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        </Card>
        
        <Card style={styles.menuCard}>
          <Text style={styles.menuTitle}>Activity</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <ShoppingBag size={20} color={colors.text.secondary} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Order History</Text>
            </View>
            <ChevronRight size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Heart size={20} color={colors.text.secondary} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Favorite Items</Text>
            </View>
            <ChevronRight size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        </Card>
        
        <Card style={styles.menuCard}>
          <Text style={styles.menuTitle}>Preferences</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Settings size={20} color={colors.text.secondary} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Notification Settings</Text>
            </View>
            <ChevronRight size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Settings size={20} color={colors.text.secondary} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Privacy Settings</Text>
            </View>
            <ChevronRight size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        </Card>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={colors.util.error} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primary.main,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  userName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text.inverse,
  },
  userEmail: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.inverse,
    opacity: 0.8,
  },
  editButton: {
    backgroundColor: 'transparent',
    borderColor: colors.text.inverse,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.tertiary,
    padding: spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.accent.main,
  },
  statLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border.light,
  },
  menuCard: {
    margin: spacing.md,
  },
  menuTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: spacing.md,
  },
  menuItemText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.util.error,
    borderRadius: borderRadius.md,
  },
  logoutIcon: {
    marginRight: spacing.sm,
  },
  logoutText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.util.error,
  },
  versionText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
    marginTop: spacing.md,
  },
});