import React from "react";

import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface IDescription {
  title: string;
  value: string;
}

const Description: React.FC<IDescription> = ({
  title,
  value,
}: IDescription) => {
  const styles = StyleSheet.create({
    persona_container: {
      flexDirection: "row",
      width: "100%",
    },
    persona_title: {
      fontSize: 11,
      fontWeight: 600,
      margin: "0 10 0 10",
      width: "30%"
    },
    persona_separator: {
      fontSize: 11,
      fontWeight: 400,
      width: "2%"
    },
    persona_text: {
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
