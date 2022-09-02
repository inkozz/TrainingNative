import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
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
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${data.img}`,
          }}
        />
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{data.text}</Text>
      </View>
    </SafeAreaView>
  );
};
export default ViewPostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#008542',
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 5,
    padding: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  text: {
    fontSize: 18,
    marginTop: 8,
  },
  tinyLogo: {
    marginLeft: 8,
    marginRight: 8,
    width: 75,
    height: 75,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#008542',
  },
});
