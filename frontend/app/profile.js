import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { AuthContext } from './Contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Profile = () => {
    const { userToken } = useContext(AuthContext);
    const router = useRouter();
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userToken) {
                router.push('/login');
                return;
            }
            try {
                const response = await fetch('https://pac-app-hj5l.onrender.com/user/profile', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setProfileData(data.data);

                setEmail(data.data.email);
                setName(data.data.name);
                setOrgEmail(data.data.orgemail);
                setPhone(data.data.phone);
                setWhatsapp(data.data.whatsapp);
                setBio(data.data.bio || '');
            } catch (error) {
                Alert.alert('Error', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userToken, router]);

    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://pac-app-hj5l.onrender.com/user/edit-profile', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    orgemail: orgEmail,
                    phone,
                    whatsapp,
                    bio,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            Alert.alert('Success', 'Profile updated successfully');
            setProfileData(data.updatedData);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!profileData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Unable to load profile data</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
                <View style={styles.header}>
                    <View style={styles.profilePic}>
                        <Image
                            source={
                                profileData.profilePic
                                    ? { uri: profileData.profilePic }
                                    : require('../assets/images/2.jpeg')
                            }
                            style={styles.ProfileImage}
                        />
                    </View>
                    <View style={styles.names}>
                        <Text style={styles.name}>{profileData.name}</Text>
                        <Text style={styles.username}>@{profileData.username}</Text>
                    </View>
                </View>
                <View style={styles.contacts}>
                    <Text style={styles.text}>Email</Text>
                    <View style={styles.emails}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="mail-outline" size={40} color="#AAA" />
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={styles.top}>Personal</Text>
                                <TextInput
                                    style={styles.bottom}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder={profileData.email || 'Email'}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="mail-outline" size={40} color="#AAA" />
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={styles.top}>Organization</Text>
                                <TextInput
                                    style={styles.bottom}
                                    value={orgEmail}
                                    onChangeText={setOrgEmail}
                                    placeholder={profileData.orgemail || 'Organization Email'}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <Text style={styles.text}>Mobile</Text>
                    <View style={styles.number}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="call-outline" size={40} color="#AAA" />
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={styles.top}>Telephone</Text>
                                <TextInput
                                    style={styles.bottom}
                                    value={phone}
                                    onChangeText={setPhone}
                                    placeholder={profileData.phone || 'Telephone'}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="logo-whatsapp" size={40} color="#AAA" />
                            <View style={{ paddingLeft: 5 }}>
                                <Text style={styles.top}>WhatsApp</Text>
                                <TextInput
                                    style={styles.bottom}
                                    value={whatsapp}
                                    onChangeText={setWhatsapp}
                                    placeholder={profileData.whatsapp || 'WhatsApp'}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <TextInput
                    style={styles.bio}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Write a short story about yourself"
                    multiline
                />
            </ScrollView>
            <View style={styles.fixedButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    header: {
        backgroundColor: '#575757',
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 13,
    },
    backwards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
    },
    ProfileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    names: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    name: {
        fontSize: 18,
        color: '#D8C9AE',
    },
    username: {
        fontWeight: '400',
        fontSize: 17,
        color: '#D8C9AE',
        marginTop: 6,
    },
    contacts: {
        marginTop: 20,
        padding: 20,
    },
    text: {
        fontSize: 15,
        marginBottom: 8,
        fontWeight: '700',
    },
    top: {
        top: 8,
        fontWeight: '400',
        left: 3,
        fontSize: 18,
    },
    bottom: {
        fontSize: 18,
        width: '100%',
        fontWeight: '500',
    },
    line: {
        height: 0.6,
        backgroundColor: '#575757',
        marginVertical: 10,
    },
    bio: {
        width: '95%',
        borderColor: '#575757',
        height: 100,
        borderWidth: 0.5,
        padding: 10,
        fontSize: 20,
        margin: 10,
    },
    button: {
        backgroundColor: '#575757',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // ...other styles
});

export default Profile;
