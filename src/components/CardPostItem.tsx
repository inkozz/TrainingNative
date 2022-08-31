import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';

const Button = ({onPress, style}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text />
  </TouchableOpacity>
);

const CardPostItem = ({title, text, img, onEdit, onDelete}) => {
  console.log(title, 'title');

  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${img}`,
          }}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>{text}</Text>
        </View>
        <View style={styles.rowView}>
          <Button onPress={onEdit} icon="edit" style={{marginHorizontal: 16}} />
          <Button onPress={onDelete} style={{marginHorizontal: 16}} />
        </View>
      </View>
    </Card>
  );
};
export default CardPostItem;
const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
