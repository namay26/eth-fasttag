import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button, View, Text, Alert } from 'react-native';
export default function page1() {
  return (
    <>
      <View style={styles.main_container}>
      <View style={styles.container4}>
      <View style={styles.whiteBox}></View>
    </View>
    <View style={styles.container}>
      <Text style={styles.text}>Centered Text</Text>
    </View>
        <View style={styles.container1}>
          <Text style={styles.container1_headtext}>New FASTag</Text>
          <View style={styles.container}>
            <View style={styles.box}>
              <Text>Box 1</Text>
            </View>
            <View style={styles.box}>
              <Text>Box 2</Text>
            </View>
            <View style={styles.box}>
              <Text>Box 3</Text>
            </View>
          </View>
          <View style={styles.container1_details}>
            <Text style={styles.container1_details_text1}>Add Personal Details</Text>
            <Text style={styles.container1_details_text2}>Enter the below details for New FASTag{'\n'}card</Text>
          </View>
        </View>
        <View style={styles.container2}>
          <View>
            <View style={styles.small_box} >
              <Text style={styles.small_text}> Application Name</Text>
              <TextInput
                style={styles.small_text_box}
                placeholder="Samay Raina"
              ></TextInput>
            </View>
            <View style={styles.small_box} >
              <Text style={styles.small_text}> Mobile Number</Text>
              <TextInput
                style={styles.small_text_box}
                placeholder="Samay Raina"
              ></TextInput>
            </View>
            <View style={styles.small_box} >
              <Text style={styles.small_text}> Email Id</Text>
              <TextInput
                style={styles.small_text_box}
                placeholder="lasan34@gmail.com"
              ></TextInput>
            </View>
            <View style={styles.small_box} >
              <Text style={styles.small_text}> Date of Birth</Text>
              <TextInput
                style={styles.small_text_box}
                placeholder="DDMMYYYY"
              ></TextInput>
            </View>
          </View >
          <View>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
            <Text style={styles.buttonText}>continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => console.log('Button pressed')}>
            <Text style={styles.buttonText2}>back</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  main_container: {
    marginTop: 47.44,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    gap: 28.024,
  },
  container4: {
    marginTop: 36.44,
    marginBottom:28,
   width: 332,
    marginRight: '0',
  },
  whiteBox: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderWidth: 1, // Optional: To make the box's border visible
    borderColor: '#ddd', // Optional: Light border color
  },
  container1: {
    gap: 33,
  },
  container1_headtext: {
    color: '#FFF', // Hex color
    fontFamily: 'Poppins', // Ensure the Poppins font is installed and linked
    fontSize: 24.02, // Font size in dp
    fontStyle: 'normal', // Default value, can be omitted
    fontWeight: '600', // Medium font weight
    lineHeight: 24.02, // Line height in dp
  },
  container: {
    flexDirection: 'row', // Aligns items horizontally
    justifyContent: 'space-between', // Spaces the boxes evenly
    gap: 10,
  },
  box: {
    backgroundColor: 'white', // White background for each box
    borderWidth: 1, // Border to define the box
    borderColor: 'gray', // Border color
    width: 104, // Width of each box
    height: 4, // Height of each box
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    borderRadius: 5,
  },
  container1_details: {
  },
  container1_details_text1: {
    marginTop: 4,
    marginBottom: 4,
    color: '#FFF', // White color in hex
    fontFamily: 'Poppins', // Ensure Poppins is linked properly
    fontSize: 16.014, // Font size in dp
    fontStyle: 'normal', // Default value, can be omitted
    fontWeight: '500', // Medium weight
    lineHeight: 28.024, // Line height in dp
  },
  container1_details_text2: {
    width: 317.6,
    marginTop: 6.67,
    marginBottom: 6.67,
    color: 'rgba(255, 255, 255, 0.68)', // RGBA color for transparency
    fontFamily: 'Poppins', // Ensure the Poppins font is properly installed and linked
    fontSize: 16.014, // Font size in dp
    fontStyle: 'normal', // Default value, can be omitted
    fontWeight: '400', // Regular font weight
    lineHeight: 22.686, // Line height in dp
  },
  //css for text boxs
  container2: {
    gap: 8,
  },
  small_box: {
    flexDirection: 'column', // Aligns children vertically
    width: 325.609, // Width in dp
    alignItems: 'center' // Aligns children to the start of the container
  },
  small_text_box: {
    paddingLeft: 12, //
    width: 326.277,
    height: 36.031,
    borderRadius: 8.007,
    backgroundColor: '#191919',
    color: '#919191',
  },
  small_text: {
    width:328,
    padding: '6.67',
    color: 'rgba(255, 255, 255, 0.90)', // Use the RGBA value directly
    fontFamily: 'Poppins', // Ensure Poppins is properly linked in your project
    fontSize: 13.345,
    fontStyle: 'normal', // Default value, can be omitted if not changing
    fontWeight: '500',
    lineHeight: 36.502, // Line height in dp
  },
  button: {
    marginTop: 26,
    marginBottom: 10,
     width: 326.277,
    height: 44.037,
    backgroundColor: '#191919', // Button color
    backgroundColor: '#FFFFFF', // Button color
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
  button2: {
    width: 326.277,
    height: 44.037,
    backgroundColor: '#1F1F1F', // Button color
    paddingVertical: 12,         // Vertical padding
    paddingHorizontal: 20,       // Horizontal padding
    borderRadius: 8,            // Rounded corners
    alignItems: 'center',       // Center the text inside the button
    justifyContent: 'center',   // Center vertically
  },
  buttonText2: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',             // Text color
    fontSize: 16,
    fontWeight: 'Medium',         // Text weight
  }
});