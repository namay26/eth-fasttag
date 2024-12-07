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

import Svg, { Path } from 'react-native-svg';
import { WebView } from "react-native-webview";
import { useState } from "react";
import "@walletconnect/react-native-compat";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import { AppKitButton } from "@reown/appkit-wagmi-react-native";
import { walletManager } from "../constants";

import { stringToBytes, stringToHex, toBytes } from "viem";

const IPAddress = "10.100.17.206";

export default function Home() {
  const [showWebView, setShowWebView] = useState(false);
  const [anonAadhaar, setAnonAadhaar] = useState({});

  const { address } = useAccount();

  const { data } = useReadContract({
    abi: walletManager.abi,
    address: walletManager.address,
    functionName: "getWalletForCar",
    args: ["MJ03SM2536"],
  });

  const { data: userCars } = useReadContract({
    abi: walletManager.abi,
    address: walletManager.address,
    functionName: "getUserCars",
    args: [
      stringToHex(
        "14517253733069349235333669871336408150595731506407507345889184041886486997053"
      ),
    ],
  });

  // fetch balance of contract "0x15E41209168cC2cfac67983DF6a480dCC9343113"

  const { data: balance } = useReadContract({
    address: "0x15E41209168cC2cfac67983DF6a480dCC9343113",
    abi: [
      {
        inputs: [],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: ["0x15E41209168cC2cfac67983DF6a480dCC9343113"],
  });

  console.log("balance", balance);

  const { writeContractAsync, isSuccess } = useWriteContract();
  // read WalletCreated event after wallet creation

  console.log("anon nullifier", data);

  const handleProofGeneration = (event) => {
    // const data = JSON.parse(event.nativeEvent);
    console.log(event.nativeEvent.data);
    // setAnonAadhaar(data.data);
    // setShowWebView(false);
  };

  console.log("connected Wallet address", address);
  const createUserWallet = async () => {
    try {
      if (!address) return;

      const data = await writeContractAsync({
        address: walletManager.address,
        abi: walletManager.abi,
        functionName: "createWalletForCar",
        args: [
          stringToHex(
            "14517253733069349235333669871336408150595731506407507345889184041886486997053"
          ),
          "MJ03SM2536",
        ],
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const transferEth = async () => {
    try {
      if (!address) return;

      const tx = await writeContractAsync({
        address: "0x74C855b83cB6fCc5fDf29aFbDfBfB2f5cAeDaD8",
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_to", type: "address" },
              { internalType: "uint256", name: "_value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        functionName: "transfer",
        args: ["0x15E41209168cC2cfac67983DF6a480dCC9343113", "0.1"],
      });
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <AppKitButton />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          createUserWallet();
        }}
      >
        <Text style={styles.buttonText}>Create User Wallet</Text>
      </TouchableOpacity>
      <View style={styles.main_container}>
        <View style={styles.container1}>
          <View style={styles.container1_1}>


          </View>
          <View style={styles.container1_2}>
            <View>
              <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 28 28" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.2498 2.3335C10.6685 2.33363 9.11015 2.71192 7.70477 3.43681C6.2994 4.16169 5.08775 5.21215 4.17092 6.50054C3.25408 7.78893 2.65865 9.2779 2.4343 10.8432C2.20995 12.4085 2.36318 14.0048 2.88122 15.4988C3.39925 16.9929 4.26706 18.3414 5.41225 19.4318C6.55744 20.5223 7.9468 21.3231 9.46441 21.7674C10.982 22.2117 12.5839 22.2866 14.1363 21.9859C15.6888 21.6852 17.1468 21.0176 18.3888 20.0388L22.6495 24.2995C22.8695 24.512 23.1642 24.6296 23.4701 24.6269C23.776 24.6243 24.0686 24.5016 24.2849 24.2853C24.5012 24.069 24.6239 23.7764 24.6266 23.4705C24.6292 23.1646 24.5117 22.8699 24.2991 22.6498L20.0385 18.3892C21.1911 16.9269 21.9088 15.1696 22.1094 13.3185C22.31 11.4674 21.9854 9.59719 21.1727 7.92194C20.3601 6.24669 19.0922 4.83408 17.5142 3.84577C15.9361 2.85745 14.1118 2.33337 12.2498 2.3335ZM4.66647 12.2502C4.66647 10.2389 5.46543 8.31009 6.88758 6.88794C8.30973 5.46579 10.2386 4.66683 12.2498 4.66683C14.261 4.66683 16.1899 5.46579 17.612 6.88794C19.0342 8.31009 19.8331 10.2389 19.8331 12.2502C19.8331 14.2614 19.0342 16.1902 17.612 17.6124C16.1899 19.0345 14.261 19.8335 12.2498 19.8335C10.2386 19.8335 8.30973 19.0345 6.88758 17.6124C5.46543 16.1902 4.66647 14.2614 4.66647 12.2502Z"
                  fill="white"
                  fillOpacity={0.4}
                />
              </Svg>
            </View>
            <Text style={styles.container1_2_text}> Search</Text>
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
          </View>

          <Text style={styles.container2_2}> Trasnactions</Text>

          <View style={styles.container2_3}>
            <View style={styles.container2_3_1}>
              <View style={styles.container2_3_circle}></View>
              <View style={styles.container2_3_text}>
                <Text style={styles.container2_3_text1}>Toll plaza </Text>
                <Text style={styles.container2_3_text2}>National highway </Text>
                <Text style={styles.container2_3_text3}>
                  Toll Amount: 0.0054ETH{" "}
                </Text>
              </View>
            </View>
            <View style={styles.container2_3_2}>
              <Text style={styles.container2_3_Text}>18 August 2020</Text>
              <Text style={styles.container2_3_Text}>4:45pm</Text>
            </View>
          </View><View style={styles.container2_3}>
            <View style={styles.container2_3_1}>
              <View style={styles.container2_3_circle}></View>
              <View style={styles.container2_3_text}>
                <Text style={styles.container2_3_text1}>Toll plaza </Text>
                <Text style={styles.container2_3_text2}>National highway </Text>
                <Text style={styles.container2_3_text3}>
                  Toll Amount: 0.0054ETH{" "}
                </Text>
              </View>
            </View>
            <View style={styles.container2_3_2}>
              <Text style={styles.container2_3_Text}>18 August 2020</Text>
              <Text style={styles.container2_3_Text}>4:45pm</Text>
            </View>
          </View><View style={styles.container2_3}>
            <View style={styles.container2_3_1}>
              <View style={styles.container2_3_circle}></View>
              <View style={styles.container2_3_text}>
                <Text style={styles.container2_3_text1}>Toll plaza </Text>
                <Text style={styles.container2_3_text2}>National highway </Text>
                <Text style={styles.container2_3_text3}>
                  Toll Amount: 0.0054ETH{" "}
                </Text>
              </View>
            </View>
            <View style={styles.container2_3_2}>
              <Text style={styles.container2_3_Text}>18 August 2020</Text>
              <Text style={styles.container2_3_Text}>4:45pm</Text>
            </View>
          </View>
          <View style={styles.container2_3}>
            <View style={styles.container2_3_1}>
              <View style={styles.container2_3_circle}></View>
              <View style={styles.container2_3_text}>
                <Text style={styles.container2_3_text1}>Toll plaza </Text>
                <Text style={styles.container2_3_text2}>National highway </Text>
                <Text style={styles.container2_3_text3}>
                  Toll Amount: 0.0054ETH{" "}
                </Text>
              </View>
            </View>
            <View style={styles.container2_3_2}>
              <Text style={styles.container2_3_Text}>18 August 2020</Text>
              <Text style={styles.container2_3_Text}>4:45pm</Text>
            </View>
          </View>
        </View>

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
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    gap: 28.024,
  },
  container1: {
    display: "flex",
    width: 356.302,
    flexDirection: "row",
    alignItems: "center",
    gap: 13.34, // React Native doesn't support 'gap', see note below
  },
  container1_1: {
    width: 37.37,
    height: 37.37,
    backgroundColor: "#191919",
    borderRadius: 28,
  },
  container1_2: {
    paddingLeft: 12,
    width: 256.885,
    height: 36.031,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#191919",
    borderRadius: 8.007,
  },
  container1_2_1: {
    width: 18.683,
    height: 18.683,
    backgroundColor: "#000000",
  },

  container1_2_text: {
    color: "rgba(255, 255, 255, 0.40)",
    fontFamily: "Poppins", // Make sure the font is loaded or available
    fontSize: 14.679,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 28.024,
  },
  container1_3: {},
  container2: {
    gap: 13.34,
  },
  container2_1: {
    paddingLeft: 16.68,
    width: 352.966,
    height: 190.825,
    borderRadius: 10.622,
    backgroundColor: "#191919",
    flexDirection: "row",
    gap: 55,
    alignItems: "center",
  },
  container2_1_text: {},
  container2_1_: {
    gap: -7.37,
  },
  container2_1_text1: {
    color: "rgba(255, 255, 255, 0.90)",
    fontFamily: "Poppins", // Ensure Poppins font is loaded or available
    fontSize: 14.747,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 34.409,
  },
  container2_1_text2: {
    color: "#919191",
    fontFamily: "Poppins", // Ensure Poppins font is loaded or available
    fontSize: 14.747,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 34.409,
  },
  container2_1_text3: {
    color: "rgba(255, 255, 255, 0.90)",
    fontFamily: "Poppins", // Ensure Poppins font is loaded or available
    fontSize: 19.662,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 39.324,
  },
  container2_1_text4: {
    color: "rgba(255, 255, 255, 0.90)",
    fontFamily: "Poppins", // Ensure Poppins font is loaded or available
    fontSize: 24.02,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 34.409,
  },
  container2_1_button: {
    height: 169.66,
    marginTop: 10,
    flexDirection: "column-reverse",
  },
  button: {
    marginTop: 26,
    marginBottom: 10,
    width: 120.433,
    height: 36.031,
    backgroundColor: "#191919", // Button color
    backgroundColor: "#FFFFFF", // Button color
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center vertically
  },
  buttonText: {
    color: "#000000",
    fontFamily: "Poppins", // Text color
    fontSize: 13.345,
    fontWeight: "500", // Text weight
  },

  container2_2: {
    width: 352.966,
    lineheight: 37.365,
    fontSize: 18.683,
    fontWeight: "bold",
    color: "white",
  },
  container2_3: {
    paddingLeft: 9.34,
    paddingTop: 14.68,
    width: 356.302,
    height: 121.436,
    borderRadius: 10.622,
    backgroundColor: "#191919",
    gap: 7.34,
  },
  container2_3_1: {
    flexDirection: "row",
    gap: 13,
  },
  container2_3_circle: {
    width: 45.372,
    height: 45.372,
    backgroundColor: "#757575",
    borderRadius: 400,
  },

  container2_3_text: {
    gap: 4.5,
  },
  container2_3_text1: {
    color: "rgba(255, 255, 255, 0.90)",
    fontFamily: "Poppins", // Ensure Poppins font is linked
    fontSize: 14.679,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 20.422,
  },
  container2_3_text2: {
    color: "rgba(255, 255, 255, 0.70)",
    fontFamily: "Poppins", // Ensure Poppins font is linked
    fontSize: 13.345,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 18.851,
  },

  container2_3_text3: {
    color: "#FFF",
    fontFamily: "Poppins", // Make sure Poppins font is loaded or available
    fontSize: 18.683,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 28.277,
  },
  container2_3_2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 210.31,
  },
  container2_3_Text: {
    color: "rgba(255, 255, 255, 0.40)",
    fontFamily: "Poppins", // Ensure Poppins font is loaded or available
    fontSize: 10.676,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 14, // React Native doesn't support 'normal', so use a numeric value
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
