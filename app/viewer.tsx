import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

export default function PannellumViewer() {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const { url, title } = useLocalSearchParams(); // Get both the URL and title from search params
  console.log("The passed url", url);

  // Function to safely get the document directory
  const getDocumentDirectory = () => {
    if (FileSystem.documentDirectory) {
      return FileSystem.documentDirectory;
    } else {
      console.error("Document directory is null!");
      return ''; // or handle the case properly
    }
  };

  // Create a unique file path using the button title
  const getFileUri = (title: string | any) => {
    const documentDirectory = getDocumentDirectory();
    return `${documentDirectory}${title.replace(/\s+/g, '_').toLowerCase()}.jpg`; // Example: load_image_1.jpg
  };
  
  async function loadImage() {
    if (!url || !title) return; // No URL provided yet
    const fileUri = getFileUri(title); // Use a unique file URI for each image
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (fileInfo.exists) {
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBase64Image(`data:image/jpeg;base64,${base64}`);
        alert("Loaded image from local storage");
      } else {
        const { uri } = await FileSystem.downloadAsync(url as string, fileUri);
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBase64Image(`data:image/jpeg;base64,${base64}`);
        alert("Downloaded and saved image");
      }
    } catch (error) {
      console.error("Error downloading or loading image: ", error);
    }
  }

  useEffect(() => {
    if (url && title) loadImage();
  }, [url, title]);

  if (!base64Image) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* WebView to load Pannellum */}
      <WebView
        originWhitelist={['*']}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Pannellum Viewer</title>
              <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css">
              <script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
            </head>
            <body>
              <div id="panorama" style="width: 100%; height: 100vh;"></div>
              <script>
                pannellum.viewer('panorama', {
                  "type": "equirectangular",
                  "panorama": "${base64Image}",
                  "autoLoad": true,
                  "autoRotate": -2,
                });
              </script>
            </body>
            </html>
          `,
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your design
    right: 10,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Ensures the button stays on top
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
