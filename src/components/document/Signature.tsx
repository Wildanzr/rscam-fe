import React from "react";

import { View, Image, Text, StyleSheet, Font } from "@react-pdf/renderer";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

interface ISignature {
  qrCode: string | undefined | null;
  id: string;
}

const Signature: React.FC<ISignature> = ({ qrCode, id }: ISignature) => {
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
    signature_container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "space-between",
      gap: 10,
      margin: "5 0 0 0",
    },
    notes: {
      width: "45%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    identity: {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    qr: {
      width: "15%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      objectFit: "contain",
    },
    identity_header: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    notes_title: {
      fontFamily: "opensans",
      fontSize: 12,
      fontWeight: 600,
      color: "#1677FF",
      margin: "0 0 5 0",
    },
    notes_text: {
      width: "95%",
      fontFamily: "opensans",
      fontSize: 8,
      fontWeight: 400,
      color: "#000000",
    },
    identity_text: {
      fontFamily: "opensans",
      fontSize: 11,
      fontWeight: 400,
      color: "#000000",
    },
  });

  return (
    <>
      <View style={styles.signature_container}>
        <View style={styles.notes}>
          <Text style={styles.notes_title}>Catatan:</Text>
          <Text style={styles.notes_text}>
            - Hasil pemeriksaan ini tidak dapat digunakan sebagai diagnosis
            akhir.
          </Text>
          <Text style={styles.notes_text}>
            - Lampiran foto dan video pemeriksaan mungkin belum dapat diakses
            selama sinkronisasi data
          </Text>
        </View>

        <View style={styles.qr}>
          <Text style={styles.notes_title}>Scan disini:</Text>
          <Image style={styles.image} src={qrCode} />
        </View>

        <View style={styles.identity}>
          <View style={styles.identity_header}>
            <Text style={styles.identity_text}>
              Malang, {dayjs(id).format("DD MMMM YYYY")}
            </Text>
            <Text style={styles.identity_text}>Pemeriksa</Text>
          </View>
          <Text style={styles.identity_text}>
            <Text style={styles.identity_text}>
              dr. Gunazar Gesang, Sp.PK., M.Kes
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

export default Signature;
