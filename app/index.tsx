import { View, Button, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Pannellum Viewer</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Load Image 1"
          onPress={() => router.push({ pathname: './viewer', params: { url: 'https://images.unsplash.com/photo-1557971370-e7298ee473fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8MzYwfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80', title: 'Load Image 1' } })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Load Image 2"
          onPress={() => router.push({ pathname: './viewer', params: { url: 'https://images.unsplash.com/photo-1590874181851-a2b16c7e1786?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8MzYwJTIwZGVncmVlfGVufDB8fDB8fHww', title: 'Load Image 2' } })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Load Image 3"
          onPress={() => router.push({ pathname: './viewer', params: { url: 'https://images.unsplash.com/photo-1645895581819-224a62ee03c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fDM2MCUyMGRlZ3JlZXxlbnwwfHwwfHx8MA%3D%3D',title: 'Load Image 3' } })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
