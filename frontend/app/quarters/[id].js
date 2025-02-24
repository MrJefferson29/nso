import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Video } from "expo-av";

const { width: screenWidth } = Dimensions.get("window");

const projectsData = [
  {
    id: 1,
    name: 'Kiluun',
    goal: '300,000 CFA',
    content: 'The project "Building a Nso Corporative Credit Union" aims...',
    location: 'Buea',
    topic: 'Many individuals face difficulties in finding reliable and skilled unskilled labor for domestic and personal tasks. Existing solutions often lack transparency, convenience, and reliability, resulting in inefficiencies. This project aims to bridge this gap by developing a centralized digital platform, making the hiring process seamless and trustworthy.',
    image: require('../../assets/images/1.jpeg'),
    projects: [
      { description: "Community Garden Initiative", members: 25, essay: "The Food Bank Coordination project seeks to collect, store, and distribute food to individuals and families facing food insecurity. By establishing partnerships with local businesses and volunteers, the project ensures that nutritious food is provided to those in need, reducing hunger and promoting community welfare." },
      { description: "Weekly Cleanup Drives", members: 15, essay: "The Food Bank Coordination project seeks to collect, store, and distribute food to individuals and families facing food insecurity. By establishing partnerships with local businesses and volunteers, the project ensures that nutritious food is provided to those in need, reducing hunger and promoting community welfare." },
      { description: "Public Library Expansion", members: 20, essay: "The Food Bank Coordination project seeks to collect, store, and distribute food to individuals and families facing food insecurity. By establishing partnerships with local businesses and volunteers, the project ensures that nutritious food is provided to those in need, reducing hunger and promoting community welfare." },
    ],
  },
  {
    id: 2,
    name: 'Taavisa',
    goal: '500,000 CFA',
    content: 'Rebuilding the Nso Cultural Town Center is an essential project...',
    location: 'Nso',
    topic: 'Many individuals face difficulties in finding reliable and skilled unskilled labor for domestic and personal tasks. Existing solutions often lack transparency, convenience, and reliability, resulting in inefficiencies. This project aims to bridge this gap by developing a centralized digital platform, making the hiring process seamless and trustworthy.',
    image: require('../../assets/images/2.jpeg'),
    projects: [
      { description: "Community Garden Initiative", members: 25, essay: "The Food Bank Coordination project seeks to collect, store, and distribute food to individuals and families facing food insecurity. By establishing partnerships with local businesses and volunteers, the project ensures that nutritious food is provided to those in need, reducing hunger and promoting community welfare." },
      { description: "Weekly Cleanup Drives", members: 15, essay: "The Food Bank Coordination project seeks to collect, store, and distribute food to individuals and families facing food insecurity. By establishing partnerships with local businesses and volunteers, the project ensures that nutritious food is provided to those in need, reducing hunger and promoting community welfare." },
      { description: "Public Library Expansion", members: 20, essay: "The Food Bank Coordination project seeks to collect, store, and distribute food to individuals and families facing food insecurity. By establishing partnerships with local businesses and volunteers, the project ensures that nutritious food is provided to those in need, reducing hunger and promoting community welfare." }
    ],
  },
  {
    id: 3,
    name: 'Mbiame',
    goal: '150,000 CFA',
    content: 'Many individuals face difficulties in finding reliable and skilled unskilled labor for domestic and personal tasks. Existing solutions often lack transparency, convenience, and reliability, resulting in inefficiencies. This project aims to bridge this gap by developing a centralized digital platform, making the hiring process seamless and trustworthy.',
    location: 'Mbiame',
    topic: 'The Annual Ekuji Ekiti Festival in Nsei-Nsem',
    image: require('../../assets/images/1.jpeg'),
    projects: [
      { description: "Community Garden Initiative", members: 25 },
      { description: "Weekly Cleanup Drives", members: 15 },
      { description: "Public Library Expansion", members: 20 },
    ],
  },
  {
    id: 4,
    name: 'Njavnyuy',
    goal: '400,000 CFA',
    content: 'Many individuals face difficulties in finding reliable and skilled unskilled labor for domestic and personal tasks. Existing solutions often lack transparency, convenience, and reliability, resulting in inefficiencies. This project aims to bridge this gap by developing a centralized digital platform, making the hiring process seamless and trustworthy.',
    location: 'Douala',
    topic: 'Nso Health Center for the Blind and Disabled',
    image: require('../../assets/images/2.jpeg'),
    projects: [
      { description: "Community Garden Initiative", members: 25 },
      { description: "Weekly Cleanup Drives", members: 15 },
      { description: "Public Library Expansion", members: 20 },
    ],
  },
  {
    id: 5,
    name: 'Manjong',
    goal: '400,000 CFA',
    content: 'The Nso Health Center for the Blind and Disabled aims...',
    location: 'Douala',
    topic: 'Nso Health Center for the Blind and Disabled',
    image: require('../../assets/images/2.jpeg'),
    projects: [
      { description: "Community Garden Initiative", members: 25 },
      { description: "Weekly Cleanup Drives", members: 15 },
      { description: "Public Library Expansion", members: 20 },
    ],
  },
  {
    id: 6,
    name: 'Kumbo',
    goal: '400,000 CFA',
    content: 'The Nso Health Center for the Blind and Disabled aims...',
    location: 'Douala',
    topic: 'Nso Health Center for the Blind and Disabled',
    image: require('../../assets/images/2.jpeg'),
    projects: [
      { description: "Community Garden Initiative", members: 25 },
      { description: "Weekly Cleanup Drives", members: 15 },
      { description: "Public Library Expansion", members: 20 },
    ],
  },
  {
    id: 7,
    name: 'Din',
    goal: '400,000 CFA',
    content: 'The Nso Health Center for the Blind and Disabled aims...',
    location: 'Douala',
    topic: 'Nso Health Center for the Blind and Disabled',
    image: require('../../assets/images/2.jpeg'),
    projects: [
      { description: "Food Bank Coordination", members: 28, essay: "This initiative will establish a community garden that supports individuals with visual impairments and disabilities. It will provide an accessible space where people can grow their own food and engage in horticultural therapy, improving both physical and mental well-being." },
      { description: "Mental Health Awareness Walk", members: 17, essay: "This initiative will establish a community garden that supports individuals with visual impairments and disabilities. It will provide an accessible space where people can grow their own food and engage in horticultural therapy, improving both physical and mental well-being." },
      { description: "Road Safety Awareness Program", members: 20, essay: "This initiative will establish a community garden that supports individuals with visual impairments and disabilities. It will provide an accessible space where people can grow their own food and engage in horticultural therapy, improving both physical and mental well-being." },
    ],
  },
];

const Quartersdetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const videoRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Project");
  const [isPlaying, setIsPlaying] = useState(true);


  const project = projectsData.find((item) => item.id === parseInt(id, 10));

  const handleCardPress = (subProject) => {
    setSelectedProject(subProject);
    setModalVisible(true);
  };
  const randomNames = ["Alice Sambinus", "Mboma Bob", "Mbatuwe Charlie", "Fru Diana", "Parasite Eve"];
  const contributors = [
    { name: "Alice Sambinus", amount: 5000 },
    { name: "Mboma Bob", amount: 3000 },
    { name: "Mbatuwe Charlie", amount: 2500 },
  ];
  const goal = 100000;
  const totalContributions = contributors.reduce((sum, c) => sum + c.amount, 0);
  const progress = (totalContributions / goal) * 100;
  const closeModal = () => {
    setModalVisible(false);
    setSelectedProject(null);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync(); // Pause the video
    } else {
      videoRef.current.playAsync(); // Start the video
    }
    setIsPlaying(!isPlaying); // Toggle the play/pause state
  };

  if (!project) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Project not found!</Text>
        <TouchableOpacity onPress={() => router.push("/projects")}>
          <Text style={styles.errorLink}>Explore Other Projects</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={project.image} style={styles.image} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to {project.name} Quarter</Text>
        <View style={styles.line}></View>
        <Text style={styles.goal}>Location: {project.name}</Text>

        {project.projects.map((subProject, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(subProject)}
          >
            <Text style={styles.cardTitle}>{subProject.description}</Text>
            <Text style={styles.cardMembers}>{subProject.members} members involved</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Modal Drawer */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
            <View style={styles.tabContainer}>
              {["Project", "Members", "Contributors"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabButton,
                    activeTab === tab && styles.activeTabButton,
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {activeTab === "Project" && selectedProject && (
              <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.modalContainer} showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalTitle}>{selectedProject.description}</Text>
                  <Video
                    style={styles.video}
                    source={require('../../assets/videos/vid4.mp4')}
                    ref={videoRef}
                    resizeMode="contain"
                    shouldPlay={isPlaying} // Video autoplay
                    useNativeControls={isPlaying} // Optionally keep controls active when autoplay is on
                  />
                  <Text style={styles.modalText}>
                    {selectedProject.members} members are part of this initiative.
                  </Text>
                  <Text style={styles.essay}>{selectedProject.essay}</Text>
                  <TouchableOpacity
                    style={styles.support}
                    onPress={() => router.push("/support")}
                  >
                    <Text style={styles.supportText}>Support This Project</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}

            {activeTab === "Members" && (
              <View>
                {randomNames.map((name, index) => (
                  <Text key={index} style={styles.modalText}>
                    {name}
                  </Text>
                ))}
              </View>
            )}

            {activeTab === "Contributors" && (
              <View>
                {contributors.map((contributor, index) => (
                  <Text key={index} style={styles.modalText}>
                    {contributor.name}: XAF {contributor.amount}
                  </Text>
                ))}
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.modalText}>
                  {totalContributions} of {goal} reached
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 275,
  },
  modalContainer: {
    flexGrow: 1, // Key change: Allow content to scroll
  },
  video: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  contentContainer: {
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  essay: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 20,
  },
  line: {
    height: 2,
    backgroundColor: "#ddd",
    marginBottom: 15,
  },
  goal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#28a745",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardMembers: {
    fontSize: 14,
    color: "#555",
  },
  support: {
    width: "100%",
    backgroundColor: "#D8C9AE",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    position: 'relative',
    marginVertical: 10,
  },
  supportText: {
    fontSize: 16,
    color: "#FFF",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    height: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007bff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: "#007bff",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    color: "#555",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#28a745",
  },
});

export default Quartersdetails;
