import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

// Get screen height
const { height: screenHeight } = Dimensions.get('window');

const Culture = [
    {
        id: 1,
        name: 'Kiluun',
        goal: '300,000 CFA',
        content: 'The project "Building a Nso Corporative Credit Union" aims...',
        location: 'Buea',
        topic: 'Building a Nso Corporative Credit Union',
        image: require('../assets/images/1.jpeg'),
    },
    {
        id: 2,
        name: 'Taavisa',
        goal: '500,000 CFA',
        content: 'Rebuilding the Nso Cultural Town Center is an essential project...',
        location: 'Nso',
        topic: 'Rebuild the Nso Cultural Town Center',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 3,
        name: 'Mbiame',
        goal: '150,000 CFA',
        content: 'The Annual Ekuji Ekiti Festival in Nsei-Nsem is a vital cultural event...',
        location: 'Nso',
        topic: 'The Annual Ekuji Ekiti Festival in Nsei-Nsem',
        image: require('../assets/images/1.jpeg'),
    },
    {
        id: 4,
        name: 'Njavnyuy',
        goal: '400,000 CFA',
        content: 'The Nso Health Center for the Blind and Disabled aims...',
        location: 'Douala',
        topic: 'Nso Health Center for the Blind and Disabled',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 5,
        name: 'Manjong',
        goal: '400,000 CFA',
        content: 'The Nso Health Center for the Blind and Disabled aims...',
        location: 'Douala',
        topic: 'Nso Health Center for the Blind and Disabled',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 6,
        name: 'Kumbo',
        goal: '400,000 CFA',
        content: 'The Nso Health Center for the Blind and Disabled aims...',
        location: 'Douala',
        topic: 'Nso Health Center for the Blind and Disabled',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 7,
        name: 'Din',
        goal: '400,000 CFA',
        content: 'The Nso Health Center for the Blind and Disabled aims...',
        location: 'Douala',
        topic: 'Nso Health Center for the Blind and Disabled',
        image: require('../assets/images/2.jpeg'),
    },
];

const Quarters = () => {
    const router = useRouter(); // Initialize router
    const [playingLecture, setPlayingLecture] = useState(null);
    const [paused, setPaused] = useState(false);

    const getRandomProgress = () => Math.floor(Math.random() * 101);

    const handleImagePress = (id) => {
        router.push(`/quarters/${id}`); // Navigate to the dynamic route
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.subtitle}>Support Us</Text>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#AAA" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#AAA"
                    />
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {Culture.map((culture) => {
                    const progress = getRandomProgress();
                    return (
                        <TouchableOpacity
                            key={culture.id}
                            style={styles.card}
                            onPress={() => handleImagePress(culture.id)} // Call navigation on card press
                        >
                            <View style={styles.imageContainer}>
                                <Image source={require('../assets/images/traveling.png')} style={styles.image} />
                            </View>
                            <View style={styles.text}>
                                <View style={styles.icon}>
                                    <Ionicons
                                        name="location-outline"
                                        size={25}
                                        color={'#D8C9AE'}
                                    />
                                    <Text
                                        style={{
                                            color: '#D8C9AE',
                                            textDecorationLine: 'underline',
                                        }}
                                    >
                                        {' '}
                                        {culture.name}{' '}
                                    </Text>
                                </View>
                                <Text style={styles.topic}>Welcome to {culture.name}. Tap to see what goes on in our community</Text>
                                <View style={styles.progressContainer}>
                                    <View
                                        style={[styles.progressBar]}
                                    />
                                </View>
                                <Text style={styles.progressText}>
                                   Active Quarter
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default Quarters;


const styles = StyleSheet.create({
    container: { padding: 10 },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        height: 140,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        display: 'flex',
        flexDirection: 'row',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
    imageContainer: {
        width: 125,
        height: 125,
        backgroundColor: '#D8C9AE',
        borderRadius: 8,
        marginRight: 15,
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 5,
    },
    progressContainer: {
        width: '100%',
        height: 6,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginTop: 8,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#D8C9AE',
        borderRadius: 5,
    },
    progressText: {
        fontSize: 12,
        color: '#575757',
        marginTop: 5,
    },
    closeIconContainer: {
        position: 'absolute',
        top: 30,
        right: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Subtle background for better visibility
        borderRadius: 50,
        padding: 10,
    },

    closeIcon: {
        color: '#FFF',
    },

    supportContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 25,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 6,
    },

    supportText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 15,
        textAlign: 'center',
    },

    supportInput: {
        width: '100%',
        height: 50,
        padding: 12,
        borderWidth: 1,
        borderColor: '#D8C9AE',
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },

    supportButton: {
        width: '100%',
        backgroundColor: '#D8C9AE',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },

    supportButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    input: {
        backgroundColor: '#f7f7f7',
        marginBottom: 15,
        padding: 12,
        borderRadius: 8,
        height: 50,
        width: '100%',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#D8C9AE',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#575757',
        fontSize: 16,
        fontWeight: 'bold',
    },
    remainingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        justifyContent: 'space-around',
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        lineHeight: 28,
    },
    topic: {
        fontSize: 16,
        color: '#575757',
        lineHeight: 22,
    },
    header: {
        backgroundColor: '#4A4A4A',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    subtitle: {
        fontSize: 20,
        color: '#D8C9AE',
        marginTop: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#4A4A4A',
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    addItem: {
        fontSize: 14,
        fontWeight: '500',
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
    },
    filterItem: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
        flexDirection: 'row',
        backgroundColor: '#D8C9AE',
        padding: 10,
        borderRadius: 15,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
