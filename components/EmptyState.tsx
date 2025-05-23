import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { PlusCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';

type EmptyStateProps = {
  title: string;
  message: string;
  showAddButton?: boolean;
};

export default function EmptyState({ 
  title, 
  message, 
  showAddButton = true 
}: EmptyStateProps) {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <PlusCircle size={48} color={Colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {showAddButton && (
        <View style={styles.buttonContainer}>
          <Text 
            style={styles.button}
            onPress={() => router.push('/add')}
          >
            Add Transaction
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    padding: 12,
  },
});