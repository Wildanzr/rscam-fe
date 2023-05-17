import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface IHeader {
  title: string;
  address: string;
  phone: string;
  cp: string;
  email: string;
}

const Header: React.FC<IHeader> = ({
  title,
  address,
  phone,
  cp,
  email,
}: IHeader) => {
  const styles = StyleSheet.create({
    h_page: {
      flexDirection: "row",
      width: "100%",
      height: "100%",
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
      fontSize: 18,
      fontWeight: 600,
      paddingBottom: 2,
    },
    h_detail: {
      fontSize: 9,
      fontWeight: 400,
    },
  });
  return (
    <View style={styles.h_page}>
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
