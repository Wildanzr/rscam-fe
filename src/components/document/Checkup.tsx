import React from "react";

import { Result } from ".";
import { View, StyleSheet } from "@react-pdf/renderer";

interface ICheckup {
  complaint: string;
  result: string;
  conclusion: string;
  advice: string;
}

const Checkup: React.FC<ICheckup> = ({ complaint, result, conclusion, advice}: ICheckup) => {
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
