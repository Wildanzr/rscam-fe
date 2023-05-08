import React from "react";

import { Result } from ".";
import { View, StyleSheet, Font } from "@react-pdf/renderer";
import OpenSans_Regular from "./assets/OpenSans-Regular.ttf";
import OpenSans_SemiBold from "./assets/OpenSans-SemiBold.ttf";

interface ICheckup {
  complaint: string;
  result: string;
  conclusion: string;
  advice: string;
}

const Checkup: React.FC<ICheckup> = ({ complaint, result, conclusion, advice}: ICheckup) => {
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
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "5 0 0 0",
    }
  });
  return (
    <>
      <View style={styles.checkup_container}>
        <Result
          color="#00B96B"
          title="Keluhan Pasien"
          text={complaint}
        />
        <Result
          color="#00B96B"
          title="Hasil Pemeriksaan"
          text={result}
        />
          <Result
            color="#1677FF"
            title="Kesimpulan Dokter"
            text={conclusion}
          />
          <Result
            color="#1677FF"
            title="Saran Dokter"
            text={advice}
          />
      </View>
    </>
  );
};

export default Checkup;
