// Color palette for the coffee shop app
export const colors = {
  // Primary colors
  primary: {
    dark: '#3E2723',   // Deep espresso
    main: '#5D4037',   // Rich brown
    light: '#8D6E63',  // Lighter brown
  },
  // Secondary colors
  secondary: {
    dark: '#A1887F',   // Taupe
    main: '#BCAAA4',   // Warm gray
    light: '#D7CCC8',  // Light taupe
  },
  // Accent colors
  accent: {
    dark: '#A05B2C',   // Dark copper
    main: '#CB8442',   // Copper
    light: '#E0A370',  // Light copper
  },
  // Background colors
  background: {
    primary: '#FFFFFF',     // White
    secondary: '#F5F5F5',   // Light gray
    tertiary: '#FFF8E1',    // Creamy beige
    card: '#FFFFFF',        // Card background
  },
  // Text colors
  text: {
    primary: '#212121',     // Near black
    secondary: '#757575',   // Medium gray
    tertiary: '#9E9E9E',    // Light gray
    inverse: '#FFFFFF',     // White (for dark backgrounds)
    accent: '#CB8442',      // Accent color for text
  },
  // Utility colors
  util: {
    success: '#4CAF50',     // Green
    warning: '#FFAB00',     // Amber
    error: '#F44336',       // Red
    info: '#2196F3',        // Blue
    disabled: '#BDBDBD',    // Disabled state
  },
  // Border colors
  border: {
    light: '#E0E0E0',       // Light border
    medium: '#BDBDBD',      // Medium border
    dark: '#9E9E9E',        // Dark border
  },
};

// Spacing system (8px grid)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Typography
export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  lineHeight: {
    tight: 1.2,     // For headings (120%)
    normal: 1.5,    // For body text (150%)
    loose: 1.8,     // For more spacious text (180%)
  },
};

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,  // Fully rounded (for pills, circles)
};

// Shadows
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Animation durations
export const animations = {
  fast: 200,
  medium: 300,
  slow: 500,
};

// Z-index levels
export const zIndex = {
  base: 0,
  above: 1,
  dropdown: 10,
  modal: 100,
  toast: 1000,
};

// Layout constants
export const layout = {
  maxContentWidth: 1200,  // Maximum content width for large screens
  tabBarHeight: 56,       // Height of the tab bar
  headerHeight: 64,       // Height of headers
};

// Breakpoints for responsive design
export const breakpoints = {
  phone: 576,       // Small phones
  tablet: 768,      // Tablets and large phones
  desktop: 1024,    // Small desktops and large tablets
  largeDesktop: 1440, // Large desktops
};