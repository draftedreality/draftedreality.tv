import type React from 'react';
import { Pressable } from 'react-native';
import type { ViewStyle } from 'react-native';

import type { ColorToken } from '../tokens';

import { Text } from './Text';
import type { ButtonProps } from './types';
import { useColors, getSpacing, getRadius, getColor } from './utils';

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  fill,
  padding,
  paddingHorizontal,
  paddingVertical,
  background,
  textColor,
  radius,
  borderColor,
  borderWidth,
  disabled = false,
}) => {
  const colors = useColors();

  // Default styling based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: getColor(colors, background) ?? colors.primary,
          textColor: getColor(colors, textColor) ?? colors.primaryText,
          borderWidth: borderWidth ?? 0,
          borderColor: getColor(colors, borderColor),
        };
      case 'secondary':
        return {
          backgroundColor: getColor(colors, background) ?? colors.surface,
          textColor: getColor(colors, textColor) ?? colors.text,
          borderWidth: borderWidth ?? 1,
          borderColor: getColor(colors, borderColor) ?? colors.border,
        };
      case 'ghost':
        return {
          backgroundColor: getColor(colors, background) ?? 'transparent',
          textColor: getColor(colors, textColor) ?? colors.primary,
          borderWidth: borderWidth ?? 0,
          borderColor: getColor(colors, borderColor),
        };
      default:
        return {
          backgroundColor: getColor(colors, background) ?? colors.primary,
          textColor: getColor(colors, textColor) ?? colors.primaryText,
          borderWidth: borderWidth ?? 0,
          borderColor: getColor(colors, borderColor),
        };
    }
  };

  const getSizePadding = () => {
    switch (size) {
      case 'sm':
        return { horizontal: 'sm', vertical: 'xs' } as const;
      case 'md':
        return { horizontal: 'md', vertical: 'sm' } as const;
      case 'lg':
        return { horizontal: 'lg', vertical: 'md' } as const;
      default:
        return { horizontal: 'md', vertical: 'sm' } as const;
    }
  };

  const variantStyles = getVariantStyles();
  const sizePadding = getSizePadding();

  const computedButtonStyle: ViewStyle = {
    flex: fill === true ? 1 : undefined,
    padding: getSpacing(padding),
    paddingHorizontal:
      getSpacing(paddingHorizontal) ?? getSpacing(sizePadding.horizontal),
    paddingVertical:
      getSpacing(paddingVertical) ?? getSpacing(sizePadding.vertical),
    backgroundColor: variantStyles.backgroundColor,
    borderRadius: getRadius(radius) ?? getRadius('md'),
    borderColor: variantStyles.borderColor,
    borderWidth: variantStyles.borderWidth,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  };

  const getTextSize = (): 'sm' | 'md' | 'lg' => {
    switch (size) {
      case 'sm':
        return 'sm';
      case 'md':
        return 'md';
      case 'lg':
        return 'lg';
      default:
        return 'md';
    }
  };

  const getTextColor = (): ColorToken => {
    if (textColor) return textColor;

    switch (variant) {
      case 'primary':
        return 'primaryText';
      case 'secondary':
        return 'text';
      case 'ghost':
        return 'primary';
      default:
        return 'primaryText';
    }
  };

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        computedButtonStyle,
        pressed &&
          !disabled && {
            opacity: 0.7,
            transform: [{ scale: 0.98 }],
          },
      ]}
      onPress={onPress}
    >
      <Text
        align='center'
        color={getTextColor()}
        size={getTextSize()}
        weight='medium'
      >
        {label}
      </Text>
    </Pressable>
  );
};
