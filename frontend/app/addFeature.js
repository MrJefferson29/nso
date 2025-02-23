import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useRouter } from 'expo-router';

const AddFeature = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const router = useRouter();

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    // Handle if the user cancels or picks an image
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedFiles((prevFiles) => [...prevFiles, { uri, type: result.assets[0].type }]);
    } else {
      console.log("No media selected or action canceled");
    }
  };

  console.log(selectedFiles); // Debugging log to ensure the selected files are updated correctly

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('notes', notes);
    formData.append('category', category);

    // Append files to formData
    selectedFiles.forEach((file, index) => {
      const mediaType = file.type.startsWith('image/') ? 'image/jpeg' : 'video/mp4'; // Adjust based on the media type
      const name = `file${index}.${mediaType === 'image/jpeg' ? 'jpg' : 'mp4'}`; // Set file extension based on type

      const mediaFile = {
        uri: file.uri,
        type: mediaType,
        name,
      };
      formData.append('files', mediaFile);
    });

    try {
      const response = await axios.post('http://192.168.14.1:5000/features/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Feature created successfully!');
      setTitle('');
      setNotes('');
      setCategory('');
      setSelectedFiles([]);
      router.push('/culture');
    } catch (error) {
      console.error('Error creating feature:', error);
      alert('Failed to create feature.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Feature</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Pick Image/Video" onPress={pickMedia} />
      <View style={styles.preview}>
        {selectedFiles.map((file, index) => (
          file.type.startsWith('image/') ? (
            <Image key={index} source={{ uri: file.uri }} style={styles.imagePreview} />
          ) : (
            <Text key={index} style={styles.videoPreview}>Video Selected</Text>
          )
        ))}
      </View>

      <Button title="Create Feature" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
  preview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 5,
  },
  videoPreview: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 100, // Center text vertically
  },
});

export default AddFeature;
