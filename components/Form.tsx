import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

interface Props {}

const Form: React.FC<Props> = (props) => {
  return (
    <ScrollView style={styles.content}>
      <View style={styles.form}>{props.children}</View>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});
