import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';

const Button = ({onPress, style, icon, color}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Icon name={icon} size={24} color={color} />
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
          <Button
            onPress={onEdit}
            icon="create-outline"
            color="#008542"
            style={{marginHorizontal: 4}}
          />
          <Button
            onPress={onDelete}
            color="#f44"
            icon="trash"
            style={{marginHorizontal: 4}}
          />
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
