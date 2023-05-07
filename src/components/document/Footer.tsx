import React from "react";

import { View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import dayjs from "dayjs";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";

import "dayjs/locale/id"

dayjs.locale("id");

const Footer: React.FC = () => {
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
    footer_container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin: "10 0 0 0",
    },
    footer_text: {
      width: "100%",
      textAlign: "center",
      fontFamily: "opensans",
      fontSize: 7,
      fontWeight: 400,
      padding: 5,
    },
  });
  return (
    <>
      <View style={styles.footer_container}>
        <Text style={styles.footer_text}>
          Dicetak pada {dayjs().format("dddd, DD MMMM YYYY HH:mm:ss [WIB]")}
        </Text>
      </View>
    </>
  );
};

export default Footer;
