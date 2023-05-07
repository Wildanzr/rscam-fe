import React from "react";

import { Text, View, Font, StyleSheet } from "@react-pdf/renderer";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";

interface IResult {
  title: string;
  text: string;
  color: string;
}

const Result: React.FC<IResult> = ({ title, text, color }: IResult) => {
  // Register font
  Font.register({
    family: "opensans",
    fonts: [
      {
        src: OpenSans_Regular,
        fontWeight: 400,
      },
      {
        src: OpenSans_SemiBold,
        fontWeight: 600,
      },
    ],
  });

  const styles = StyleSheet.create({
    result_container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "10 0 0 0",
      border: "2px solid black",
    },
    result_title: {
      backgroundColor: color,
      color: "white",
      width: "100%",
      textAlign: "center",
      fontFamily: "opensans",
      fontSize: 12,
      fontWeight: 600,
    },
    result_text: {
      width: "100%",
      textAlign: "justify",
      fontFamily: "opensans",
      fontSize: 9,
      fontWeight: 400,
      padding: 5,
    },
  });
  return (
    <View style={styles.result_container}>
      <Text style={styles.result_title}>{title}</Text>
      <Text style={styles.result_text}>{text}</Text>
    </View>
  );
};

export default Result;
