import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTransactionStore } from '@/store/transactionStore';
import { calculateTotals, calculateProfit, filterTransactionsByPeriod, getRecentTransactions } from '@/utils/transactionUtils';
import SummaryCard from '@/components/SummaryCard';
import PeriodSelector from '@/components/PeriodSelector';
import TransactionItem from '@/components/TransactionItem';
import EmptyState from '@/components/EmptyState';
import ProfitChart from '@/components/ProfitChart';
import Colors from '@/constants/colors';

export default function DashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [refreshing, setRefreshing] = useState(false);
  const { transactions } = useTransactionStore();
  
  const filteredTransactions = filterTransactionsByPeriod(transactions, selectedPeriod);
  const { income, expenses } = calculateTotals(filteredTransactions);
  const profit = calculateProfit(filteredTransactions);
  const recentTransactions = getRecentTransactions(transactions, 5);
  
  const periodLabels = {
    day: "Today's",
    week: "This Week's",
    month: "This Month's",
    year: "This Year's",
  };
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // In a real app, you might fetch new data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to</Text>
        <Text style={styles.appName}>GrowEasy</Text>
      </View>
      
      <PeriodSelector 
        selectedPeriod={selectedPeriod} 
        onSelectPeriod={setSelectedPeriod} 
      />
      
      <SummaryCard 
        income={income} 
        expenses={expenses} 
        profit={profit} 
        period={periodLabels[selectedPeriod]}
      />
      
      {filteredTransactions.length > 0 && (
        <ProfitChart 
          transactions={filteredTransactions} 
          period={selectedPeriod} 
        />
      )}
      
      <View style={styles.recentTransactionsHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>
      
      {recentTransactions.length > 0 ? (
        <View style={styles.transactionsList}>
          {recentTransactions.map((transaction) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
            />
          ))}
        </View>
      ) : (
        <EmptyState 
          title="No transactions yet" 
          message="Start tracking your business by adding your first transaction." 
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textLight,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
  },
  recentTransactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  transactionsList: {
    marginBottom: 16,
  },
});