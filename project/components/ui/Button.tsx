import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.button_disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.text_disabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.text.inverse : colors.primary.main}
          style={styles.loader}
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && icon}
      
      <Text style={textStyles}>{title}</Text>
      
      {!loading && icon && iconPosition === 'right' && icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  button_primary: {
    backgroundColor: colors.primary.main,
    borderWidth: 0,
  },
  button_secondary: {
    backgroundColor: colors.accent.main,
    borderWidth: 0,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  button_text: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  button_small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  button_medium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  button_large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  button_disabled: {
    backgroundColor: colors.util.disabled,
    borderColor: colors.util.disabled,
  },
  text: {
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
  },
  text_primary: {
    color: colors.text.inverse,
  },
  text_secondary: {
    color: colors.text.inverse,
  },
  text_outline: {
    color: colors.primary.main,
  },
  text_text: {
    color: colors.primary.main,
  },
  text_small: {
    fontSize: typography.fontSize.sm,
  },
  text_medium: {
    fontSize: typography.fontSize.md,
  },
  text_large: {
    fontSize: typography.fontSize.lg,
  },
  text_disabled: {
    color: colors.text.tertiary,
  },
  loader: {
    marginRight: spacing.sm,
  },
});