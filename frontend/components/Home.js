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
          <View style={styles.container1_1}></View>
          <View style={styles.container1_2}>
            <View style={styles.container1_2_1}></View>
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
    height: 716.825,
    borderRadius: 10.622,
    backgroundColor: "#191919",
    flexDirection: "row",
    gap: 60,
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
    fontWeight: "500",
    lineHeight: 34.409,
  },
  container2_1_text2: {
    color: "#919191",
    fontFamily: "Poppins", // Ensure Poppins font is loaded or available
    fontSize: 14.747,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 34.409,
  },
  container2_1_text3: {
    color: "rgba(255, 255, 255, 0.90)",
    fontFamily: "Poppins", // Ensure Poppins font is loaded or available
    fontSize: 19.662,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 39.324,
  },
  container2_1_text4: {
    color: "rgba(255, 255, 255, 0.90)",
    fontFamily: "Poppins", // Ensure Poppins font is loaded or available
    fontSize: 24.02,
    fontStyle: "normal",
    fontWeight: "500",
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
    width: 117.433,
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
    fontWeight: "Medium", // Text weight
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
    fontWeight: "500",
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
    fontWeight: "500",
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
    fontWeight: "500",
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
