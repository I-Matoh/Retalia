import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

type Period = 'day' | 'week' | 'month' | 'year';

type PeriodSelectorProps = {
  selectedPeriod: Period;
  onSelectPeriod: (period: Period) => void;
};

export default function PeriodSelector({ selectedPeriod, onSelectPeriod }: PeriodSelectorProps) {
  const periods: { value: Period; label: string }[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];

  return (
    <View style={styles.container}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period.value}
          style={[
            styles.periodButton,
            selectedPeriod === period.value && styles.selectedPeriod,
          ]}
          onPress={() => onSelectPeriod(period.value)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.periodText,
              selectedPeriod === period.value && styles.selectedPeriodText,
            ]}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedPeriod: {
    backgroundColor: Colors.primary,
  },
  periodText: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '500',
  },
  selectedPeriodText: {
    color: Colors.background,
  },
});