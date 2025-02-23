import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const Lectures = [
    { id: 1, title: 'Chapter 01', topic: 'Learning the alphabet in the Nso dialect, phonetic translations', video: require('../../assets/videos/vid3.mp4') },
    { id: 2, title: 'Chapter 02', topic: 'Counting from 1 to 50 in Nso, cardinal and ordinal numbers', video: require('../../assets/videos/vid3.mp4') },
    { id: 3, title: 'Chapter 03', topic: 'Basic nouns in the dialect, and pronunciation, tenses.', video: require('../../assets/videos/vid3.mp4') },
    { id: 4, title: 'Chapter 04', topic: 'Singing common songs in the dialect, Happy birthday song and more', video: require('../../assets/videos/vid3.mp4') },
];

const LecturesScreen = () => {
    const router = useRouter();
    const [openedCards, setOpenedCards] = useState([1]);
    const [playingLecture, setPlayingLecture] = useState(null);

    useEffect(() => {
        const loadOpenedCards = async () => {
            try {
                const storedCards = await AsyncStorage.getItem('openedCards');
                if (storedCards) {
                    setOpenedCards(JSON.parse(storedCards));
                }
            } catch (error) {
                console.error('Failed to load opened cards:', error);
            }
        };
        loadOpenedCards();
    }, []);

    useEffect(() => {
        const saveOpenedCards = async () => {
            try {
                const storedCards = await AsyncStorage.getItem('openedCards');
                if (storedCards !== JSON.stringify(openedCards)) {
                    await AsyncStorage.setItem('openedCards', JSON.stringify(openedCards));
                }
            } catch (error) {
                console.error('Failed to save opened cards:', error);
            }
        };
        saveOpenedCards();
    }, [openedCards]);

    const handleCardPress = (lecture) => {
        if (openedCards.includes(lecture.id)) {
            router.push(`/lecture/${lecture.id}`);
            if (!openedCards.includes(lecture.id + 1)) {
                setOpenedCards((prev) => [...prev, lecture.id + 1]);
            }
        }
    };

    const handleVideoPress = (lectureId) => {
        setPlayingLecture(lectureId === playingLecture ? null : lectureId);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {Lectures.map((lecture) => (
                <TouchableOpacity
                    key={lecture.id}
                    style={[styles.card, !openedCards.includes(lecture.id) && styles.disabledCard]}
                    onPress={() => handleCardPress(lecture)}
                    disabled={!openedCards.includes(lecture.id)}
                    accessible={true}
                    accessibilityLabel={lecture.title}
                    accessibilityHint={`Tap to view ${lecture.topic}`}
                >
                    <View style={styles.videoContainer}>
                        <Video
                            source={lecture.video}
                            style={styles.video}
                            shouldPlay={playingLecture === lecture.id}
                            isMuted={true}
                            resizeMode="cover"
                        />
                        <Ionicons
                            name="play"
                            size={50}
                            style={styles.playIcon}
                            onPress={() => handleVideoPress(lecture.id)}
                        />
                    </View>
                    <View style={styles.text}>
                        <View style={styles.titleContainer}>
                            <Ionicons name="school" size={28} color={'#D8C9AE'} />
                            <Text style={styles.title}>{lecture.title}</Text>
                        </View>
                        <Text style={styles.topic}>{lecture.topic}</Text>
                        <Text style={styles.timeAgo}>2 hours ago</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default LecturesScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#f5f5f5',
        paddingVertical: 25,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        height: 180,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden', // Prevent overflow from card content
    },
    disabledCard: {
        backgroundColor: '#d3d3d3',
        opacity: 0.6,
    },
    videoContainer: {
        width: 140,
        height: 140,
        backgroundColor: '#575757',
        borderRadius: 12,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden', // Ensure video is contained within the container
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    playIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -22 }, { translateY: -22 }],
        color: '#fff',
    },
    text: {
        flex: 1,
        justifyContent: 'space-between',
        maxWidth: width - 180, // Prevent text from overflowing the card
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
        flexShrink: 1, // Prevent title from overflowing
    },
    topic: {
        fontSize: 15,
        color: '#575757',
        marginBottom: 5,
        lineHeight: 20,
        flexShrink: 1, // Prevent topic text from overflowing
    },
    timeAgo: {
        fontSize: 13,
        fontWeight: '600',
        color: '#888',
    },
});
