import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/colors';
import { Transaction } from '@/types/transaction';
import { calculateProfit } from '@/utils/transactionUtils';

type ProfitChartProps = {
  transactions: Transaction[];
  period: 'day' | 'week' | 'month' | 'year';
};

export default function ProfitChart({ transactions, period }: ProfitChartProps) {
  // For a simple implementation, we'll create a basic bar chart
  // In a real app, you might want to use a charting library
  
  const getChartData = () => {
    if (transactions.length === 0) return [];
    
    let data: { label: string; value: number }[] = [];
    
    if (period === 'day') {
      // Group by hour
      const hours = Array.from({ length: 24 }, (_, i) => i);
      data = hours.map(hour => {
        const hourTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          return date.getHours() === hour;
        });
        return {
          label: `${hour}:00`,
          value: calculateProfit(hourTransactions),
        };
      });
    } else if (period === 'week') {
      // Group by day of week
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      data = days.map((day, index) => {
        const dayTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          return date.getDay() === index;
        });
        return {
          label: day,
          value: calculateProfit(dayTransactions),
        };
      });
    } else if (period === 'month') {
      // Group by week
      const weeks = [1, 2, 3, 4];
      data = weeks.map(week => {
        const weekTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          const dayOfMonth = date.getDate();
          return Math.ceil(dayOfMonth / 7) === week;
        });
        return {
          label: `Week ${week}`,
          value: calculateProfit(weekTransactions),
        };
      });
    } else if (period === 'year') {
      // Group by month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = months.map((month, index) => {
        const monthTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          return date.getMonth() === index;
        });
        return {
          label: month,
          value: calculateProfit(monthTransactions),
        };
      });
    }
    
    return data;
  };
  
  const chartData = getChartData();
  
  // Find max absolute value for scaling
  const maxValue = Math.max(
    ...chartData.map(item => Math.abs(item.value)),
    1 // Ensure we don't divide by zero
  );
  
  const screenWidth = Dimensions.get('window').width - 48; // Accounting for padding
  const barWidth = screenWidth / chartData.length - 8; // 8px gap between bars
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profit Trend</Text>
      
      <View style={styles.chartContainer}>
        {/* Zero line */}
        <View style={styles.zeroLine} />
        
        {/* Bars */}
        <View style={styles.barsContainer}>
          {chartData.map((item, index) => {
            const barHeight = Math.abs(item.value) / maxValue * 100;
            const isPositive = item.value >= 0;
            
            return (
              <View key={index} style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar,
                    {
                      height: `${barHeight}%`,
                      backgroundColor: isPositive ? Colors.success : Colors.danger,
                      width: barWidth,
                      alignSelf: isPositive ? 'flex-end' : 'flex-start',
                    },
                    isPositive ? styles.positiveBar : styles.negativeBar,
                  ]}
                />
                <Text style={styles.barLabel}>{item.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  chartContainer: {
    height: 200,
    position: 'relative',
  },
  zeroLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1,
    backgroundColor: Colors.border,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  barWrapper: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    borderRadius: 4,
  },
  positiveBar: {
    position: 'absolute',
    bottom: '50%',
  },
  negativeBar: {
    position: 'absolute',
    top: '50%',
  },
  barLabel: {
    position: 'absolute',
    bottom: -20,
    fontSize: 10,
    color: Colors.textLight,
    textAlign: 'center',
  },
}); 