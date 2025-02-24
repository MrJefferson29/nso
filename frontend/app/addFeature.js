import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { AuthContext } from './Contexts/AuthContext';
import { Video } from 'expo-av'; // Import Video component
import { useRouter } from 'expo-router';

const AddFeature = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [video, setVideo] = useState(null);
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'You need to grant access to your media library');
      }

      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        Alert.alert('Camera permission required', 'You need to grant access to your camera');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    console.log('Image Picker Result:', result);

    if (!result.canceled && result.assets) {
      setVideo(result.assets[0]); // Use the first asset
    } else {
      Alert.alert('No video selected');
    }
  };

  const handleSubmit = async () => {
    if (!title || !notes || !category || !video) {
      Alert.alert('Please fill all fields and select a video.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('notes', notes);
    formData.append('category', category);
    formData.append('files', {
      uri: video.uri,
      name: video.uri.split('/').pop(),
      type: 'video/mp4', // Update as necessary
    });

    try {
      setLoading(true); // Set loading to true
      const response = await fetch('http://192.168.14.1:5000/features/create', { // Change from /feature/create to /features/create
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`, // Remove 'Content-Type' as it's set automatically
        },
        body: formData,
      });
      

      const text = await response.text();
      console.log('Response:', text);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = JSON.parse(text);
      Alert.alert('Feature created successfully!', data.message);
      setTitle('');
      setNotes('');
      setCategory('');
      setVideo(null);
      router.push('/')
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to create feature. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Notes:</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Pick a Video" onPress={pickVideo} />
      {video && (
        <View style={styles.videoPreview}>
          <Text>Selected Video:</Text>
          <Video
            source={{ uri: video.uri }}
            style={styles.videoThumbnail}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      )}
      <Button title="Create Feature" onPress={handleSubmit} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
  videoPreview: {
    marginVertical: 10,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
});

export default AddFeature;
