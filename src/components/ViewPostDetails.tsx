import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ViewPostDetails = ({route}) => {
  const [data, setData] = useState([]);
  const {itemId} = route.params;

  const getData = useCallback(async () => {
    const response = await fetch(`http://10.0.2.2:3000/posts/${itemId}`);
    const result = await response.json();
    setData(result);
  }, [itemId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{data.title}</Text>
      <Text>{data.text}</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: `${data.img}`,
        }}
      />
    </SafeAreaView>
  );
};
export default ViewPostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
