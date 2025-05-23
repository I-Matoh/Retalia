import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, Mic, Image as ImageIcon } from 'lucide-react-native';
import { useTransactionStore } from '@/store/transactionStore';
import { getCategoriesByType } from '@/constants/categories';
import Colors from '@/constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactionStore();
  
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [showCamera, setShowCamera] = useState(false);
  
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  
  const categories = getCategoriesByType(type);
  
  const handleSave = () => {
    if (!amount || !description || !categoryId) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    
    addTransaction({
      amount: parsedAmount,
      description,
      categoryId,
      type,
      date: new Date().toISOString(),
      imageUri,
      notes,
    });
    
    Alert.alert(
      'Success',
      'Transaction added successfully!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };
  
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  
  const handleTakePhoto = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Camera permission is needed to take photos.');
        return;
      }
    }
    
    setShowCamera(true);
  };
  
  const handleCameraCapture = (photo: string) => {
    setImageUri(photo);
    setShowCamera(false);
  };
  
  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onMountError={(error) => {
            console.error('Camera error:', error);
            Alert.alert('Camera Error', 'Failed to start camera.');
            setShowCamera(false);
          }}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={() => {
                // In a real app, you would capture the photo here
                // For this example, we'll just simulate it
                handleCameraCapture('https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000');
              }}
            />
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'income' && styles.selectedTypeButton,
            ]}
            onPress={() => setType('income')}
          >
            <Text
              style={[
                styles.typeButtonText,
                type === 'income' && styles.selectedTypeButtonText,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'expense' && styles.selectedTypeButton,
            ]}
            onPress={() => setType('expense')}
          >
            <Text
              style={[
                styles.typeButtonText,
                type === 'expense' && styles.selectedTypeButtonText,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount*</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description*</Text>
          <TextInput
            style={styles.input}
            placeholder="What is this transaction for?"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category*</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  categoryId === category.id && styles.selectedCategoryButton,
                ]}
                onPress={() => setCategoryId(category.id)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    categoryId === category.id && styles.selectedCategoryButtonText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any additional notes here..."
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Receipt or Image</Text>
          <View style={styles.imageOptions}>
            <TouchableOpacity 
              style={styles.imageOptionButton}
              onPress={handleTakePhoto}
            >
              <Camera size={24} color={Colors.primary} />
              <Text style={styles.imageOptionText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.imageOptionButton}
              onPress={handlePickImage}
            >
              <ImageIcon size={24} color={Colors.primary} />
              <Text style={styles.imageOptionText}>Choose Image</Text>
            </TouchableOpacity>
          </View>
          
          {imageUri && (
            <View style={styles.imagePreviewContainer}>
              <Text style={styles.imagePreviewText}>Image selected</Text>
              <TouchableOpacity
                onPress={() => setImageUri(undefined)}
              >
                <Text style={styles.removeImageText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Voice Input</Text>
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={() => {
              Alert.alert(
                'Voice Input',
                'This feature would allow users to describe transactions verbally. For example: "Sold 10 shirts for $50" or "Bought 5 kg rice for $20".'
              );
            }}
          >
            <Mic size={24} color={Colors.background} />
            <Text style={styles.voiceButtonText}>Record Transaction</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTypeButton: {
    backgroundColor: Colors.primary,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textLight,
  },
  selectedTypeButtonText: {
    color: Colors.background,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.card,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedCategoryButtonText: {
    color: Colors.background,
  },
  imageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageOptionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  imageOptionText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  imagePreviewText: {
    fontSize: 14,
    color: Colors.text,
  },
  removeImageText: {
    fontSize: 14,
    color: Colors.danger,
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
  },
  voiceButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: Colors.background,
    marginBottom: 30,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 15,
  },
  cancelButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});