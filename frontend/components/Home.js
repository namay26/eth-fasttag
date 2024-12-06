import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button, View, Text, Alert } from 'react-native';

export default function Home() {
  return (
    <>
      <View style={styles.main_container}>

        <View style={styles.container1}>
          <View style={styles.container1_1}></View>
          <View style={styles.container1_2}>
            <View style={styles.container1_2_1}></View>
            <Text style={styles.container1_2_text}>  Search</Text>
          </View>
          <View style={styles.container1_3}></View>
        </View>









        <View style={styles.container2}>


          <View style={styles.container2_1}>
            <View style={styles.container2_1_text}>
              <Text style={styles.container2_1_text1}>ID - 8387123010</Text>
              <View style={styles.container2_1_}>
                <Text style={styles.container2_1_text2}>Volkswagen Polo :</Text>
                <Text style={styles.container2_1_text3}>MH 03 SM2536</Text>
              </View>
              <View style={styles.container2_1_}>
                <Text style={styles.container2_1_text2}>Current Balance :</Text>
                <Text style={styles.container2_1_text4}>0.05634 ETH</Text>
              </View>
            </View>
            <View style={styles.container2_1_button}>
              <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText}>Add Amount</Text>
              </TouchableOpacity>
            </View>
          </View>





          <Text style={styles.container2_2}>   Trasnactions</Text>





          <View style={styles.container2_3}>
            <View style={styles.container2_3_1}>
              <View style={styles.container2_3_circle}></View>
              <View style={styles.container2_3_text}>
                <Text style={styles.container2_3_text1}>Toll plaza  </Text>
                <Text style={styles.container2_3_text2}>National highway </Text>
                <Text style={styles.container2_3_text3}>Toll Amount: 0.0054ETH </Text>
              </View>
            </View>
            <View style={styles.container2_3_2}>
              <Text style={styles.container2_3_Text}>18 August 2020</Text>
              <Text style={styles.container2_3_Text}>4:45pm</Text>
            </View>
          </View>






        </View>


        <TouchableOpacity style={styles.button2} onPress={() => console.log('Button pressed')}>
                <Text style={styles.buttonText2}>continue</Text>
            </TouchableOpacity>
           

        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main_container: {
    paddingTop: 47.44,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 28.024,
  },
  container1: {
    display: 'flex',
    width: 356.302,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13.34, // React Native doesn't support 'gap', see note below
  },
  container1_1: {
    width: 37.37,
    height: 37.37,
    backgroundColor: '#191919',
    borderRadius: 28,

  },
  container1_2: {
    paddingLeft: 12,
    width: 256.885,
    height: 36.031,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 8.007,
  },
  container1_2_1: {
    width: 18.683,
    height: 18.683,
    backgroundColor: '#000000',
  },

  container1_2_text: {
    color: 'rgba(255, 255, 255, 0.40)',
    fontFamily: 'Poppins', // Make sure the font is loaded or available
    fontSize: 14.679,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28.024,
  },
  container1_3: {

  },
  container2: {
    gap: 13.34,
  },
  container2_1: {
    paddingLeft: 16.68,
    width: 352.966,
    height: 186.825,
    borderRadius: 10.622,
    backgroundColor: '#191919',
    flexDirection: 'row',
    gap: 60,
    alignItems: 'center',
  },
  container2_1_text: {

  },
  container2_1_: {
    gap: -7.37,
  },
  container2_1_text1: {
    color: 'rgba(255, 255, 255, 0.90)',
    fontFamily: 'Poppins', // Ensure Poppins font is loaded or available
    fontSize: 14.747,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 34.409,
  },
  container2_1_text2: {
    color: '#919191',
    fontFamily: 'Poppins', // Ensure Poppins font is loaded or available
    fontSize: 14.747,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 34.409,
  },
  container2_1_text3: {
    color: 'rgba(255, 255, 255, 0.90)',
    fontFamily: 'Poppins', // Ensure Poppins font is loaded or available
    fontSize: 19.662,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 39.324,
  },
  container2_1_text4: {
    color: 'rgba(255, 255, 255, 0.90)',
    fontFamily: 'Poppins', // Ensure Poppins font is loaded or available
    fontSize: 24.02,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 34.409,
  },
  container2_1_button:{
    height: 169.66,
    marginTop:10,
    flexDirection: 'column-reverse',
  },
  button: {
    marginTop: 26,
    marginBottom: 10,
    width: 117.433,
    height: 36.031,
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
    fontSize: 13.345,
    fontWeight: 'Medium',         // Text weight
  },

















  container2_2: {
    width: 352.966,
    lineheight: 37.365,
    fontSize: 18.683,
    fontWeight: 'bold',
    color: 'white'
  },
  container2_3: {
    paddingLeft: 9.34,
    paddingTop: 14.68,
    width: 356.302,
    height: 121.436,
    borderRadius: 10.622,
    backgroundColor: '#191919',
    gap: 7.34,
  },
  container2_3_1: {

    flexDirection: 'row',
    gap: 13,
  },
  container2_3_circle: {
    width: 45.372,
    height: 45.372,
    backgroundColor: '#757575',
    borderRadius: 400,
  },

  container2_3_text: {
    
    gap: 4.5,
  },
  container2_3_text1: {
    color: 'rgba(255, 255, 255, 0.90)',
    fontFamily: 'Poppins', // Ensure Poppins font is linked
    fontSize: 14.679,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20.422,
  },
  container2_3_text2: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontFamily: 'Poppins', // Ensure Poppins font is linked
    fontSize: 13.345,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18.851,
  },

  container2_3_text3: {
    color: '#FFF',
    fontFamily: 'Poppins', // Make sure Poppins font is loaded or available
    fontSize: 18.683,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28.277,
  },
  container2_3_2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 210.31,
  },
  container2_3_Text: {
    color: 'rgba(255, 255, 255, 0.40)',
    fontFamily: 'Poppins', // Ensure Poppins font is loaded or available
    fontSize: 10.676,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 14, // React Native doesn't support 'normal', so use a numeric value
  }

});
