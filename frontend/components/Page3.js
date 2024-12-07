import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button, View, Text, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Install if not already added
import Svg, { Path } from 'react-native-svg';
export default function page1() {
  return (
    <>
      <View style={styles.main_container}>

        <View style={styles.container4}>
        <View style={styles.container4}>
        <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          d="M22.5 10.5H5.74501L13.065 3.17999C13.65 2.59499 13.65 1.63499 13.065 1.04999C12.9262 0.910938 12.7614 0.800617 12.5799 0.725345C12.3985 0.650073 12.204 0.611328 12.0075 0.611328C11.8111 0.611328 11.6165 0.650073 11.4351 0.725345C11.2536 0.800617 11.0888 0.910938 10.95 1.04999L1.06501 10.935C0.925954 11.0738 0.815632 11.2386 0.74036 11.4201C0.665088 11.6015 0.626343 11.796 0.626343 11.9925C0.626343 12.1889 0.665088 12.3835 0.74036 12.5649C0.815632 12.7464 0.925954 12.9112 1.06501 13.05L10.95 22.935C11.0889 23.0739 11.2537 23.184 11.4352 23.2592C11.6166 23.3343 11.8111 23.373 12.0075 23.373C12.2039 23.373 12.3984 23.3343 12.5798 23.2592C12.7613 23.184 12.9261 23.0739 13.065 22.935C13.2039 22.7961 13.314 22.6313 13.3892 22.4498C13.4644 22.2684 13.503 22.0739 13.503 21.8775C13.503 21.6811 13.4644 21.4866 13.3892 21.3052C13.314 21.1237 13.2039 20.9589 13.065 20.82L5.74501 13.5H22.5C23.325 13.5 24 12.825 24 12C24 11.175 23.325 10.5 22.5 10.5Z"
          fill="white"
        />
      </Svg>
        </View>
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
            <Text style={styles.container1_details_text1}>Upload Documents</Text>
            <Text style={styles.container1_details_text2}>Please Upload you ID proof Which are {'\n'}updated with latest details</Text>
          </View>



        </View>



        <View style={styles.container2}>

          <View>
            <View style={styles.small_box} >
              <Text style={styles.small_text}> ID Proof</Text>
              <View style={styles.container5}>
                <View style={styles.box2}></View>
                <View style={styles.box2}></View>
              </View>

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
    paddingTop: 47.44,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    gap: 28.024,
  },

  container4: {
    marginTop: 36.44,
    marginBottom: 28,
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
    width: 312,
    padding: '6.67',
    color: 'rgba(255, 255, 255, 0.90)', // Use the RGBA value directly
    fontFamily: 'Poppins', // Ensure Poppins is properly linked in your project
    fontSize: 13.345,
    fontStyle: 'normal', // Default value, can be omitted if not changing
    fontWeight: '500',
    lineHeight: 36.502, // Line height in dp
  },
  container5: {
    flexDirection: 'row',  // Align children in a row
    justifyContent: 'space-between',  // Distribute boxes evenly
    gap: 24.02,
  },
  box2: {
    width: 146.791,  // Set the width of the box
    height: 146.791,  // Set the height of the box
    backgroundColor: '#1F1F1F',  // Set the box color to white
    borderWidth: 1,  // Optional: add a border to make the boxes visible

    borderRadius: 10, // Optional:
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
