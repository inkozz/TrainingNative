import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const Button = ({onPress, style, icon, color}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Icon name={icon} size={24} color={color} />
  </TouchableOpacity>
);

const CardPostItem = ({title, text, img, onEdit, onDelete, getDetail}) => {
  return (
    <Card style={styles.item}>
      <View style={styles.headerView}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rowButton}>
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
          <Button
            onPress={getDetail}
            icon="eye-outline"
            color="#1e3c6b"
            style={{marginHorizontal: 4}}
          />
        </View>
      </View>
      <View style={styles.rowView}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${img}`,
          }}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Card>
  );
};
export default CardPostItem;
const styles = StyleSheet.create({
  headerView: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowView: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowButton: {
    flexDirection: 'row',
  },
  item: {
    padding: 12,
    margin: 12,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 12,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#008542',
  },
});
