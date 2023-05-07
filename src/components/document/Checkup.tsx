import React from "react";

import { Result } from ".";
import { View, StyleSheet, Font } from "@react-pdf/renderer";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";

const Checkup: React.FC = () => {
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
    checkup_container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "5 0 0 0",
    },
    conclusion_container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
  });
  return (
    <>
      <View style={styles.checkup_container}>
        <Result
          color="#00B96B"
          title="Keluhan Pasien"
          text="Pasien mengalami sakit kepala selama beberapa hari terakhir, disertai dengan mual, muntah, penurunan nafsu makan, dan rasa lelah. Keluhan tersebut mengganggu aktivitas sehari-hari dan tidak mereda meski sudah istirahat."
        />
        <Result
          color="#00B96B"
          title="Hasil Pemeriksaan"
          text="Pasien didiagnosis menderita migrain vestibular dengan peningkatan tekanan darah. Diberikan resep obat untuk mengatasi sakit kepala dan menurunkan tekanan darah, serta instruksi untuk menjaga pola makan dan tidur yang teratur."
        />
        <View style={styles.conclusion_container}>
          <Result
            color="#1677FF"
            title="Kesimpulan Dokter"
            text="Pasien mengalami sakit kepala selama beberapa hari terakhir, disertai dengan mual, muntah, penurunan nafsu makan, dan rasa lelah. Keluhan tersebut mengganggu aktivitas sehari-hari dan tidak mereda meski sudah istirahat."
          />
          <Result
            color="#1677FF"
            title="Saran Dokter"
            text="Pasien didiagnosis menderita migrain vestibular dengan peningkatan tekanan darah. Diberikan resep obat untuk mengatasi sakit kepala dan menurunkan tekanan darah, serta instruksi untuk menjaga pola makan dan tidur yang teratur."
          />
        </View>
      </View>
    </>
  );
};

export default Checkup;
