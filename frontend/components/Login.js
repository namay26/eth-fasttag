import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  View,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import { useState } from "react";

const IPAddress = "10.100.17.206";

export default function Logic() {
  const [showWebView, setShowWebView] = useState(false);
  const [anonAadhaar, setAnonAadhaar] = useState({});

  console.log(anonAadhaar);

  const handleProofGeneration = (event) => {
    // const data = JSON.parse(event.nativeEvent);
    console.log(event.nativeEvent.data);
    // setAnonAadhaar(data.data);
    // setShowWebView(false);
  };

  return (
    <ScrollView>
      <View style={styles.main_container}>
     
         
            
            {!showWebView ? (
              <View style={styles.container2_1_button}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setShowWebView(true);
                  }}
                >
                  <Text style={styles.buttonText}>Add Amount</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.webViewContainer}>
                <WebView
                  source={{ uri: `http://${IPAddress}:3000` }}
                  style={styles.webView}
                  onNavigationStateChange={(navState) => {
                    if (navState.url === `http://${IPAddress}:3000/close`) {
                      setShowWebView(false); // Close WebView on specific URL
                    }
                  }}
                  onMessage={handleProofGeneration}
                />
              </View>
            )}
         

          

        

        <TouchableOpacity
          style={styles.button2}
          onPress={() => console.log("Button pressed")}
        >
          <Text style={styles.buttonText2}>continue</Text>
        </TouchableOpacity>
      </View>
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    paddingTop: 47.44,
    width: 393,
    height: 850.49,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "black",
    gap: 28.024,
  },

  container2_1: {
    paddingLeft: 16.68,
    width: 393,
    height: 850.49,
    borderRadius: 10.622,
    backgroundColor: "#191919",
    

    
  },
  


  button: {
    marginTop: 26,
    marginBottom: 10,
    width: 326.277,
    height: 44.037,
    backgroundColor: '#191919', // Button color
    backgroundColor: '#ffffff', // Button color
    paddingVertical: 10,         // Vertical padding
    paddingHorizontal: 20,       // Horizontal padding
    borderRadius: 8,            // Rounded corners
    alignItems: 'center',       // Center the text inside the button
    justifyContent: 'center',   // Center vertically
  },
  buttonText: {
    color: '#000000',
    fontFamily: 'Poppins',             // Text color
    fontSize: 16,
    fontWeight: 'Medium',         // Text weight
  },
  
  webViewContainer: {
    position: "absolute",
    zIndex: 1000000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
