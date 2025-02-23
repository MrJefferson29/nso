import { Stack } from 'expo-router';
import { AuthProvider } from './Contexts/AuthContext'; // Import the AuthProvider

export default function RootLayout() {
  return (
    <AuthProvider>  {/* Wrap the stack with the AuthProvider */}
      <Stack>
        <Stack.Screen name="( tabs )" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="addItem" options={{ headerShown: false }} />
        <Stack.Screen name="addFeature" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="ItemDetail/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="DetailScreen/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="Archive" options={{ headerShown: false }} />
        <Stack.Screen name="Projects" options={{ headerShown: false }} />
        <Stack.Screen name="soon" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
        <Stack.Screen name='Quarters' options={{headerShown: false}} />
        <Stack.Screen name='Archives' options={{headerShown: false}} />
        {/* Here we apply headerShown: false directly to the Login and Register screens */}
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
