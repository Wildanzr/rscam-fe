import React from "react";

import { Text, View, Font, StyleSheet } from "@react-pdf/renderer";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";

interface IDescription {
  title: string;
  value: string;
}

const Description: React.FC<IDescription> = ({
  title,
  value,
}: IDescription) => {
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
    persona_container: {
      flexDirection: "row",
      width: "100%",
    },
    persona_title: {
      fontFamily: "opensans",
      fontSize: 11,
      fontWeight: 600,
      margin: "0 10 0 10",
      width: "30%"
    },
    persona_separator: {
      fontFamily: "opensans",
      fontSize: 11,
      fontWeight: 400,
      width: "2%"
    },
    persona_text: {
      fontFamily: "opensans",
      fontSize: 11,
      fontWeight: 400,
      margin: "0 10 0 5",
      width: "68%"
    },
  });

  return (
    <View style={styles.persona_container}>
      <Text style={styles.persona_title}>{title}</Text>
      <Text style={styles.persona_separator}>:</Text>
      <Text style={styles.persona_text}>{value}</Text>
    </View>
  );
};

export default Description;
