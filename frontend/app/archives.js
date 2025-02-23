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
        name: '0.1 Location and Demographics',
        content: "Nso is one of the prominent villages in the Bui Division of Cameroon's Northwest Region. It is located approximately 38 km from Bamenda along the Bamenda-Nkambe stretch of the ring road, situated just before Ndop (Bui town). As of the 2005 census, Nso had a population of approximately 40,000 residents.",
        topic: 'Building Location and Demographics',
        image: require('../assets/images/1.jpeg'),
    },
    {
        id: 2,
        name: '0.2 Traditional Pottery and Prescraft',
        content: "Nso is renowned for its rich pottery tradition, exemplified by the Nso Pottery Center, which has been instrumental in preserving and promoting local pottery techniques. The center introduces innovations such as the potter's wheel, glazing, and wood kiln firing, enhancing the quality and diversity of products. Collaborations with designers from Switzerland help develop new pottery designs.",
        location: 'Nso',
        topic: 'Rebuild Traditional Pottery and Prescraft',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 3,
        name: '0.3 Craft Economy and Fair Trade',
        content: 'Prescraft operates multiple centers across the Northwest Region, including Nso, employing over 300 artisans across various crafts such as wood carving, basketry, and pottery. The organization is committed to Fair Trade principles, ensuring artisans receive equitable compensation and access to sustainable markets. As a member of the World Fair Trade Organization (WFTO), Prescraft actively promotes ethical trading.',
        location: 'Nso',
        topic: 'The Annual Nso Cultural Festival',
        image: require('../assets/images/1.jpeg'),
    },
    {
        id: 4,
        name: '0.4 Environmental Sustainability',
        content: 'Prescraft is dedicated to environmental conservation, maintaining fuel plantations and implementing reforestation programs in collaboration with local farmers in Nso. These initiatives aim to ensure a sustainable supply of raw materials and promote ecological balance in the region.',
        location: 'Nso',
        topic: 'Nso Environmental Sustainability',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 5,
        name: '0.5 Administration',
        content: 'Nso operates as a second-class Fondom, led by a traditional ruler, the Fon of Nso, whose decisions are guided by the Ngumba (secret society). The Fon also serves as an auxiliary administrator, working alongside government-appointed divisional and sub-divisional service heads coordinated by the senior officer of Bui Division.',
        location: 'Nso',
        topic: 'Nso Administration',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 6,
        name: '0.6 Education',
        content: 'The village offers a range of educational institutions, including government-owned, privately-owned, and denominational schools, catering to nursery, primary, secondary, and high school levels. These institutions provide comprehensive education to the local population, contributing to the community’s development.',
        location: 'Nso',
        topic: 'Nso Education',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 7,
        name: '0.7 Social and Religious Impact',
        content: 'As a project of the Presbyterian Church in Cameroon (PCC), Prescraft embodies the church’s commitment to economic justice, education, and equal rights. The PCC’s involvement in economic and political matters reflects its quest for justice and equal rights for every Cameroonian citizen. Prescraft’s activities are guided by these principles, aiming to provide employment opportunities, preserve traditional crafts, and contribute to community development in Nso.',
        location: 'Nso',
        topic: 'Nso Health Center for the Blind and Disabled',
        image: require('../assets/images/2.jpeg'),
    },
    {
        id: 8,
        name: '0.9 Current Affairs',
        content: 'In December 2024, the Fon of Nso called on separatist fighters in the region to surrender their weapons and embrace peace, emphasizing the suffering inflicted on the community due to ongoing conflicts. He urged fighters to join the Disarmament, Demobilization, and Reintegration Commission centers, offering assistance throughout the process. The Fon set a deadline of December 31, 2024, for fighters to comply, warning of traditional, administrative, and legal sanctions against those who continue to participate in separatist activities.',
        location: 'Nso',
        topic: 'Nso Health Center for the Blind and Disabled',
        image: require('../assets/images/2.jpeg'),
    },
];


const Quarters = () => {
    const router = useRouter(); // Initialize router
    const [playingLecture, setPlayingLecture] = useState(null);
    const [paused, setPaused] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');


    const getRandomProgress = () => Math.floor(Math.random() * 101);

    const handleImagePress = (id) => {
        router.push(`/archive/${id}`); // Navigate to the dynamic route
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

            <View style={styles.filter}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.addItem} onPress={() => router.push('/addFeature')}>
                        <Ionicons name="add-sharp" size={20} color={'white'} />
                        <Text style={{ color: 'white' }}> Add item </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === '' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('')}
                    >
                        <Text style={{ color: 'white' }}>All </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'History' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('History')}
                    >
                        <Text style={{ color: 'white' }}>History </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Art' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Art')}
                    >
                        <Text style={{ color: 'white' }}>Art and Craft </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Dance' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Dance')}
                    >
                        <Text style={{ color: 'white' }}>Music and Dance </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Religion' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Religion')}
                    >
                        <Text style={{ color: 'white' }}>Traditional Beliefs and Religions </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Clothing' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Clothing')}
                    >
                        <Text style={{ color: 'white' }}>Clothing and Textiles </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Cuisine' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Cuisine')}
                    >
                        <Text style={{ color: 'white' }}>Cuisine </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Social' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Social')}
                    >
                        <Text style={{ color: 'white' }}>Social Customs </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Festival' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Festival')}
                    >
                        <Text style={{ color: 'white' }}>Festivals and Celebrations </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Architecture' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Architecture')}
                    >
                        <Text style={{ color: 'white' }}>Architecture </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Education' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Education')}
                    >
                        <Text style={{ color: 'white' }}>Education and Knowledge </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Medicine' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Medicine')}
                    >
                        <Text style={{ color: 'white' }}>Traditional Medicine </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Heritage' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Heritage')}
                    >
                        <Text style={{ color: 'white' }}>Cultural Heritage and Identity </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterItem, selectedCategory === 'Community' && styles.selectedFilter]}
                        onPress={() => setSelectedCategory('Community')}
                    >
                        <Text style={{ color: 'white' }}>Community Governance </Text>
                    </TouchableOpacity>
                </ScrollView>
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
                                <Image source={culture.image} style={styles.image} />
                            </View>
                            <View style={styles.text}>
                                <View style={styles.icon}>
                                    <Ionicons
                                        name="school"
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
                                <Text style={styles.topic}>{culture.topic}</Text>
                                <View style={styles.progressContainer}>
                                    <View
                                        style={[styles.progressBar]}
                                    />
                                </View>
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
        alignItems: 'center',
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 8,
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
        marginRight: 10,
    },
    filterItem: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500',
        flexDirection: 'row',
        backgroundColor: '#D8C9AE',
        padding: 10,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    selectedFilter: {
        backgroundColor: '#4A4A4A',
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
