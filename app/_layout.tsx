import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} /> {/* Home page */}
      <Stack.Screen name="viewer" options={{ title: 'WebView' }}/> {/* WebView page */}
    </Stack>
  );
}
