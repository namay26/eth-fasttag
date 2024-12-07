import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Button, View, Text, Alert } from 'react-native';

export default function page1() {
    return (
        <>
            <View style={styles.main_container}>

                <View style={styles.container4}>
                    <View style={styles.whiteBox}></View>
                </View>
                <View style={styles.profile_thing}>
                <View style={styles.circle} />
                <Text style={styles.circle_text}>Samay raina</Text>
                </View>
               
                <View style={styles.small_} >
                    <View style={styles.small_box} >
                        <Text style={styles.small_text}> Mobile Number</Text>
                        <Text
                            style={styles.small_text_box}
                        >Samay raina</Text>
                    </View>
                    <View style={styles.small_box} >
                        <Text style={styles.small_text}> Address</Text>
                        <Text
                            style={styles.small_text_box}
                        ></Text>
                    </View> 
                    <View style={styles.small_box_}>
                        <View style={styles.small_box_1} >
                            <Text style={styles.small_text_1}> Pin Code</Text>
                            <Text
                                style={styles.small_text_box_1}
                            ></Text>
                        </View>
                        <View style={styles.small_box_1} >
                            <Text style={styles.small_text_1}> City</Text>
                            <Text
                                style={styles.small_text_box_1}
                            ></Text>
                        </View>
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
        gap: 20,
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

    profile_thing:{
        alignItems: 'center',
gap: -6,
    },
    circle: {
        width: 106.757, // Diameter of the circle
        height: 106.757, // Same as width to make it a circle
        borderRadius: 100, // Half of width/height
        backgroundColor: '#191919', // White color for the circle
        borderWidth: 1, // Optional: border for better visibility
        borderColor: 'black', // Optional: color of the border
    },

    circle_text: {
        color: '#FFF', // White text color
        textAlign: 'center', // Center alignment
        fontFamily: 'Lexend', // Font family
        fontSize: 24.02, // Font size
        fontStyle: 'normal', // Font style
        fontWeight: '400', // Font weight
        lineHeight: 61.921, // Line height
      
    },










    //css for text boxs
    container2: {

        gap: 8,
    },
    small_box: {
        flexDirection: 'column', // Aligns children vertically
        width: 325.609, // Width in dp
        alignItems: 'center', // Aligns children to the start of the container
       

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

        width: 328,
        padding: '6.67',
        color: 'rgba(255, 255, 255, 0.90)', // Use the RGBA value directly
        fontFamily: 'Poppins', // Ensure Poppins is properly linked in your project
        fontSize: 14.679,
        fontStyle: 'normal', // Default value, can be omitted if not changing
        fontWeight: '500',
        lineHeight: 36.502, // Line height in dp
    },
    small_text_box_1: {

    },


    small_box_: {
        width: 331.615,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    small_text_box_1: {

        paddingLeft: 12, //
        width: 155.136,
        height: 36.031,
        borderRadius: 8.007,
        backgroundColor: '#191919',
        color: '#919191',
    },
    small_text_1: {

        width: 155.136,
        padding: '6.67',
        color: 'rgba(255, 255, 255, 0.90)', // Use the RGBA value directly
        fontFamily: 'Poppins', // Ensure Poppins is properly linked in your project
        fontSize: 14.679,
        fontStyle: 'normal', // Default value, can be omitted if not changing
        fontWeight: '500',
        lineHeight: 36.502, // Line height in dp
    },
    small_text_box_1: {
        paddingLeft: 12, //
        width: 155.136,
        height: 36.031,
        borderRadius: 8.007,
        backgroundColor: '#191919',
        color: '#919191',
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
