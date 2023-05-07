import React from "react";
import { Text, Image, View, Font, StyleSheet } from "@react-pdf/renderer";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";

interface IHeader {
  title: string;
  address: string;
  phone: string;
  cp: string;
  email: string;
  logo: string;
}

const Header: React.FC<IHeader> = ({
  title,
  address,
  phone,
  cp,
  email,
  logo,
}: IHeader) => {
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
    h_page: {
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      width: "100%",
      height: "10%",
    },
    header: {
      width: "100%",
      height: "100%",
      margin: "10 10 10 0",
      textAlign: "center",
    },
    h_img_container: {
      width: "20%",
      height: "100%",
      margin: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    h_rs: {
      fontFamily: "opensans",
      fontSize: 18,
      fontWeight: 600,
    },
    h_detail: {
      fontFamily: "opensans",
      fontSize: 12,
      fontWeight: 400,
    },
  });
  return (
    <View style={styles.h_page}>
      <View style={styles.h_img_container}>
        <Image src={logo} />
      </View>
      <View style={styles.header}>
        <Text style={styles.h_rs}>{title}</Text>
        <Text style={styles.h_detail}>{address}</Text>
        <Text style={styles.h_detail}>
          Telp: {phone} | CP: {cp}
        </Text>
        <Text style={styles.h_detail}>Email: {email}</Text>
      </View>
    </View>
  );
};

export default Header;
