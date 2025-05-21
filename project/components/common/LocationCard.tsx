import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { colors, spacing, typography, borderRadius } from '@/constants/theme';
import { Location } from '@/types/types';
import { MapPin, Clock, Phone } from 'lucide-react-native';

interface LocationCardProps {
  location: Location;
  onPress: () => void;
}

export function LocationCard({ location, onPress }: LocationCardProps) {
  const today = new Date().getDay();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayHours = location.hours[dayNames[today]];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card style={styles.card}>
        <Image source={{ uri: location.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{location.name}</Text>
          
          <View style={styles.infoRow}>
            <MapPin size={16} color={colors.text.secondary} style={styles.icon} />
            <Text style={styles.infoText}>
              {location.address}, {location.city}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={16} color={colors.text.secondary} style={styles.icon} />
            <Text style={styles.infoText}>Today: {todayHours}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Phone size={16} color={colors.text.secondary} style={styles.icon} />
            <Text style={styles.infoText}>{location.phone}</Text>
          </View>

          <View style={styles.amenitiesContainer}>
            {location.amenities.slice(0, 3).map((amenity, index) => (
              <View key={index} style={styles.amenityBadge}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
            {location.amenities.length > 3 && (
              <View style={styles.amenityBadge}>
                <Text style={styles.amenityText}>+{location.amenities.length - 3}</Text>
              </View>
            )}
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
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  icon: {
    marginRight: spacing.xs,
  },
  infoText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    flex: 1,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  amenityBadge: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  amenityText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.accent.dark,
  },
});