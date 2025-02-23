import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen({ navigation }) {

    const router = useRouter()

    return (
        <View style={styles.content}>
            {/* First Row */}
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push('/archives')}
                >
                    <Text style={styles.cardText}>Archives</Text>
                    <Text style={styles.subText}>Documents, Libraries, and live sessions with cultural experts.</Text>
                    <View style={styles.icon}>
                        <Ionicons name="bookmarks" size={24} color="#D8C9AE" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push('/soon')}
                >
                    <Text style={styles.cardText}>Virtual Museum</Text>
                    <Text style={styles.subText}>Dive into a virtual cultural world, and experience rea-life cultural heritage</Text>
                    <View style={styles.icon}>
                        <Ionicons name="glasses" size={24} color="#D8C9AE" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    adContainer: {
        backgroundColor: '#575757',
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    adText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#D8C9AE',
    },
    content: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: -25,
        padding: 20,
    },
    card: {
        backgroundColor: '#D8C9AE',
        width: '48%',
        height: 150,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        padding: 10,
        position: 'relative',
    },
    cardText: {
        fontSize: 17,
        fontWeight: '900',
        color: '#575757',
    },
    subText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
    },
    icon: {
        backgroundColor: '#575757',
        width: 37,
        height: 37,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    features: {},
    heading: {
        marginTop: 20,
        fontSize: 25,
        color: '#575757',
        padding: 20,
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingTop: 33,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#575757',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    circle: {
        borderWidth: 1,
        borderColor: '#575757',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
    },
});
