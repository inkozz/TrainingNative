import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ViewPostDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ViewPost</Text>
    </View>
  );
};
export default ViewPostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8df542',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
  },
});
