import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import { useTransactionStore } from '@/store/transactionStore';
import { ArrowUpDown, HelpCircle, Languages, LogOut, Moon, Share2, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function SettingsScreen() {
  const { clearAllTransactions } = useTransactionStore();
  
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all transactions? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            clearAllTransactions();
            Alert.alert('Success', 'All transactions have been deleted.');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'This would allow users to export their transaction data as CSV or PDF for accounting purposes.'
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your app preferences</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Moon size={20} color={Colors.text} />
            <Text style={styles.settingLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.background}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Daily Reminders</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.background}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <TouchableOpacity style={styles.settingButton} onPress={handleExportData}>
          <View style={styles.settingInfo}>
            <Share2 size={20} color={Colors.text} />
            <Text style={styles.settingLabel}>Export Data</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingButton} onPress={handleClearData}>
          <View style={styles.settingInfo}>
            <Trash2 size={20} color={Colors.danger} />
            <Text style={[styles.settingLabel, { color: Colors.danger }]}>Clear All Data</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingInfo}>
            <ArrowUpDown size={20} color={Colors.text} />
            <Text style={styles.settingLabel}>Currency</Text>
          </View>
          <Text style={styles.settingValue}>USD ($)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingInfo}>
            <Languages size={20} color={Colors.text} />
            <Text style={styles.settingLabel}>Language</Text>
          </View>
          <Text style={styles.settingValue}>English</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingInfo}>
            <HelpCircle size={20} color={Colors.text} />
            <Text style={styles.settingLabel}>Help & Support</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingButton}>
          <View style={styles.settingInfo}>
            <LogOut size={20} color={Colors.text} />
            <Text style={styles.settingLabel}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.versionText}>GrowEasy v1.0.0</Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 16,
    color: Colors.textLight,
  },
  versionText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
});