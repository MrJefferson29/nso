import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true); // Set default to true
  const flatListRef = useRef(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem("chatMessages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error("Failed to load messages from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom only if the user is at the bottom
    if (isAtBottom && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isAtBottom]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    Keyboard.dismiss(); // Dismiss keyboard when sending

    // Create the new message from the user
    const newMessage = { text: prompt, sender: "user", timestamp: moment().format("h:mm A") };
    const updatedMessages = [...messages, newMessage];

    try {
      setLoading(true);
      // Make the POST request with only the prompt
      const response = await axios.post("https://gofar.pythonanywhere.com/api/generate", {
        prompt, // Only send the prompt to the API
      });

      // Extract the response from the API
      const aiResponse = response.data.response;

      // Create the AI's message
      const aiMessage = {
        text: aiResponse || "Sorry, something went wrong.",
        sender: "ai",
        timestamp: moment().format("h:mm A"),
      };

      // Add the AI response to the message list
      updatedMessages.push(aiMessage);

      // Update state and AsyncStorage
      setMessages(updatedMessages);
      await AsyncStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

    } catch (error) {
      console.error("Error generating AI response:", error);
      updatedMessages.push({ text: "Sorry, something went wrong.", sender: "ai", timestamp: moment().format("h:mm A") });
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    
    // Check if the user is at the bottom
    if (contentHeight - contentOffsetY <= layoutHeight + 10) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <View style={[styles.message, item.sender === "ai" ? styles.aiMessage : styles.userMessage]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()} // Use a more unique key if possible
            initialNumToRender={10} // Limit the initial render for better performance
            maxToRenderPerBatch={5} // Limit number of items rendered per batch
            windowSize={21} // Increase window size for smoother scrolling
            onScroll={handleScroll}
            scrollEventThrottle={400} // Adjust throttle for better scroll performance
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Type a message..."
            placeholderTextColor="#A0A0A0"
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="paper-plane" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator style={styles.loader} size="large" color="#00D1FF" />}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 40,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  message: {
    maxWidth: "75%",
    marginVertical: 8,
    padding: 12,
    borderRadius: 15,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: "#2563EB",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  aiMessage: {
    backgroundColor: "#374151",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "#E5E7EB",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    padding: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#334155",
    padding: 12,
    borderRadius: 25,
    color: "white",
    fontSize: 16,
    minHeight: 50,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 50,
  },
  loader: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});

export default Chat;
