import React from "react";

import { View, Text, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id"

dayjs.locale("id");

const Footer: React.FC = () => {
  const styles = StyleSheet.create({
    footer_container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    footer_text: {
      width: "100%",
      textAlign: "center",
      fontSize: 7,
      fontWeight: 400,
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
