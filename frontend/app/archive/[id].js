import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Get screen dimensions
const { width: screenWidth } = Dimensions.get("window");

const projectsData = [
    {
        id: 1,
        name: '0.1 Location and Demographics',
        content: "Nso is one of the prominent villages in the Bui Division of Cameroon's Northwest Region. It is located approximately 38 km from Bamenda along the Bamenda-Nkambe stretch of the ring road, situated just before Ndop (Bui town). As of the 2005 census, Nso had a population of approximately 40,000 residents.",
        topic: 'Building Location and Demographics',
        image: require('../../assets/images/1.jpeg'),
    },
    {
        id: 2,
        name: '0.2 Traditional Pottery and Prescraft',
        content: "Nso is renowned for its rich pottery tradition, exemplified by the Nso Pottery Center, which has been instrumental in preserving and promoting local pottery techniques. The center introduces innovations such as the potter's wheel, glazing, and wood kiln firing, enhancing the quality and diversity of products. Collaborations with designers from Switzerland help develop new pottery designs.",
        location: 'Nso',
        topic: 'Rebuild Traditional Pottery and Prescraft',
        image: require('../../assets/images/2.jpeg'),
    },
    {
        id: 3,
        name: '0.3 Craft Economy and Fair Trade',
        content: 'Prescraft operates multiple centers across the Northwest Region, including Nso, employing over 300 artisans across various crafts such as wood carving, basketry, and pottery. The organization is committed to Fair Trade principles, ensuring artisans receive equitable compensation and access to sustainable markets. As a member of the World Fair Trade Organization (WFTO), Prescraft actively promotes ethical trading.',
        location: 'Nso',
        topic: 'The Annual Nso Cultural Festival',
        image: require('../../assets/images/1.jpeg'),
    },
    {
        id: 4,
        name: '0.4 Environmental Sustainability',
        content: 'Prescraft is dedicated to environmental conservation, maintaining fuel plantations and implementing reforestation programs in collaboration with local farmers in Nso. These initiatives aim to ensure a sustainable supply of raw materials and promote ecological balance in the region.',
        location: 'Nso',
        topic: 'Nso Environmental Sustainability',
        image: require('../../assets/images/2.jpeg'),
    },
    {
        id: 5,
        name: '0.5 Administration',
        content: 'Nso operates as a second-class Fondom, led by a traditional ruler, the Fon of Nso, whose decisions are guided by the Ngumba (secret society). The Fon also serves as an auxiliary administrator, working alongside government-appointed divisional and sub-divisional service heads coordinated by the senior officer of Bui Division.',
        location: 'Nso',
        topic: 'Nso Administration',
        image: require('../../assets/images/2.jpeg'),
    },
    {
        id: 6,
        name: '0.6 Education',
        content: 'The village offers a range of educational institutions, including government-owned, privately-owned, and denominational schools, catering to nursery, primary, secondary, and high school levels. These institutions provide comprehensive education to the local population, contributing to the community’s development.',
        location: 'Nso',
        topic: 'Nso Education',
        image: require('../../assets/images/2.jpeg'),
    },
    {
        id: 7,
        name: '0.7 Social and Religious Impact',
        content: 'As a project of the Presbyterian Church in Cameroon (PCC), Prescraft embodies the church’s commitment to economic justice, education, and equal rights. The PCC’s involvement in economic and political matters reflects its quest for justice and equal rights for every Cameroonian citizen. Prescraft’s activities are guided by these principles, aiming to provide employment opportunities, preserve traditional crafts, and contribute to community development in Nso.',
        location: 'Nso',
        topic: 'Nso Health Center for the Blind and Disabled',
        image: require('../../assets/images/2.jpeg'),
    },
    {
        id: 8,
        name: '0.9 Current Affairs',
        content: 'In December 2024, the Fon of Nso called on separatist fighters in the region to surrender their weapons and embrace peace, emphasizing the suffering inflicted on the community due to ongoing conflicts. He urged fighters to join the Disarmament, Demobilization, and Reintegration Commission centers, offering assistance throughout the process. The Fon set a deadline of December 31, 2024, for fighters to comply, warning of traditional, administrative, and legal sanctions against those who continue to participate in separatist activities.',
        location: 'Nso',
        topic: 'Nso Health Center for the Blind and Disabled',
        image: require('../../assets/images/2.jpeg'),
    },
];


const ArchiveDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Fetch the dynamic id from the route

    const project = projectsData.find((item) => item.id === parseInt(id, 10));

    if (!project) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Project not found!</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={project.image} style={styles.image} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{project.topic}</Text>
                <View style={styles.line}></View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.head}>{project.head} </Text>
                    </View>
                </View>
                <Text style={styles.content}>{project.content}</Text>
            </View>
        </ScrollView>
    );
};

export default ArchiveDetails;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    image: {
        width: '100%',
        height: 275,
        marginBottom: 15,
    },
    contentContainer: {
        width: "100%",
        paddingHorizontal: 10,
    },
    line: {
        borderWidth: 0.2,
        borderColor: '#575757',
        marginVertical: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#4A4A4A",
        marginBottom: 10,
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    locationText: {
        marginLeft: 5,
        fontSize: 18,
        color: "#575757",
    },
    goal: {
        fontSize: 20,
        color: "#D8C9AE",
        marginBottom: 15,
    },
    head: {
        fontSize: 20,
        color: "#D8C9AE",
        marginTop: 10,
    },
    content: {
        fontSize: 17,
        lineHeight: 24,
        color: "#575757",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        backgroundColor: "#D8C9AE",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    backButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#FFF",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
    support: {
        width: '100%',
        marginVertical: 20,
        backgroundColor: '#D8C9AE',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
