import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { colors, spacing, typography, layout } from '@/constants/theme';
import { ShoppingBag, Bell, Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  hasSearch?: boolean;
  hasNotifications?: boolean;
  hasCart?: boolean;
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
  onCartPress?: () => void;
}

export function Header({
  title = 'BrewBean Café',
  subtitle,
  hasSearch = true,
  hasNotifications = true,
  hasCart = true,
  onSearchPress,
  onNotificationsPress,
  onCartPress,
}: HeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        
        <View style={styles.actions}>
          {hasSearch && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onSearchPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Search size={24} color={colors.text.primary} />
            </TouchableOpacity>
          )}
          
          {hasNotifications && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onNotificationsPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Bell size={24} color={colors.text.primary} />
            </TouchableOpacity>
          )}
          
          {hasCart && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onCartPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={styles.cartIconContainer}>
                <ShoppingBag size={24} color={colors.text.primary} />
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>3</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background.primary,
    ...Platform.select({
      web: {
        paddingTop: 20,
      },
    }),
  },
  container: {
    height: layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.primary.main,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: spacing.md,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.accent.main,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: colors.text.inverse,
    fontSize: 10,
    fontFamily: typography.fontFamily.bold,
  },
});