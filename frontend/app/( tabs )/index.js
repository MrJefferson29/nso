import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert, SafeAreaView, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
import { useRef } from 'react';
import Carousel from '../carousel';
import Features from '../features';



export default function Index() {
  const router = useRouter()

  const DrawerWithHeader = ({ children }) => {
    const drawerRef = useRef(null);

    const renderDrawerContent = () => (
      <View style={styles.drawerContent}>
      </View>
    );

    const handlePress = async (url) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open the URL: ${url}`);
      }
    };

    return (
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={250}
        drawerPosition="left"
        renderNavigationView={renderDrawerContent}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/profile')} style={styles.circle}>
            <Image source={require('../../assets/images/logos.webp')} style={{width: 45, height: 45, borderRadius: 70}} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>NSO</Text>
            <Text style={styles.headerSubtitle}>
              Hosted by{' '}
              <Text
                style={{ color: 'teal', fontWeight: '500', textDecorationLine: 'underline' }}
                onPress={() => handlePress('https://mtn.cm/')}
              >
                MTN Cameroon
              </Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/chat')}>
            <Ionicons name="sparkles-outline" size={30} color="#575757" />
          </TouchableOpacity>
        </View>
        {children}
      </DrawerLayoutAndroid>
    );
  };

  return (
    <DrawerWithHeader>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Carousel />
          {/* Content Section */}
          <View style={styles.content}>
            {/* First Row */}
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push('/archive')}
              >
                <Text style={styles.cardText}>Archives</Text>
                <Text style={styles.subText}>Documents, Libraries, and live sessions with cultural experts.</Text>
                <View style={styles.icon}>
                  <Ionicons name="book" size={24} color="#D8C9AE" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push('/culture')}
              >
                <Text style={styles.cardText}>Culture and Tradition</Text>
                <Text style={styles.subText}>Unlock the world of Nso's greatest ideals and traditions.</Text>
                <View style={styles.icon}>
                  <Ionicons name="newspaper" size={24} color="#D8C9AE" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Second Row */}
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push('/quarters')}
              >
                <Text style={styles.cardText}>Quarters</Text>
                <Text style={styles.subText}>Navigate through the land of Nso, learning it's beautiful culture.</Text>
                <View style={styles.icon}>
                  <Ionicons name="location" size={24} color="#D8C9AE" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push('/projects')}
              >
                <Text style={styles.cardText}>Projects</Text>
                <Text style={styles.subText}>Ground-breaking innovations to carry the nations towards the future.</Text>
                <View style={styles.icon}>
                  <Ionicons name="build" size={24} color="#D8C9AE" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.heading}>Features For you</Text>
          <View>
            <Features />
          </View>
        </ScrollView>
      </SafeAreaView>
    </DrawerWithHeader>
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
    paddingTop: 13,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  drawerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
});
