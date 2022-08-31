/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Surface, Title, TextInput} from 'react-native-paper';
import AddPostModal from '../modals/AddPostModal';
import CardPostItem from './CardPostItem';
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [postId, setPostId] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // A améliorer (à mettre dans un fichier à part)
  const getPosts = async () => {
    setLoading(true);
    await fetch('http://10.0.2.2:3000/posts')
      .then(response => response.json())
      .then(json => {
        console.log('data', json);
        setPosts(json);
      })
      .catch(e => {
        console.log(e);
      });
    setLoading(false);
  };
  // A améliorer (à mettre dans un fichier à part)
  const addPost = (title, text) => {
    fetch('http://10.0.2.2:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log('data', json);
        updateView();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const editPost = (postId: number, title: string, text: string) => {
    fetch(`http://10.0.2.2:3000/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    })
      .then(response => response.json())
      .then(json => {
        console.log('data', json);
        updateView();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePost = (postId: any) => {
    fetch(`http://10.0.2.2:3000/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log('delete', json);
        getPosts();
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const editFunction = (id, title, text) => {
    setVisible(true);
    setPostId(id);
    setTitle(title);
    setInputText(text);
  };

  const updateView = () => {
    getPosts();
    setVisible(false);
    setTitle('');
    setInputText('');
    setPostId(0);
  };

  // Ce que je pourrais faire ici ? Passer lors du onPress, la function AddPost et l'utiliser dans le component
  // Ce que j'ai fait : une modal à la place

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.header}>
        <Title>Liste des posts</Title>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={styles.textButton}>Ajouter un post</Text>
        </TouchableOpacity>
      </Surface>
      {/* A améliorer : */}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        onRefresh={getPosts}
        renderItem={({item}) => (
          <CardPostItem
            img={item.img}
            title={item.title}
            text={item.text}
            onEdit={() => editFunction(item.id, item.title, item.text)}
            onDelete={() => deletePost(item.id)}
          />
        )}
      />
      <AddPostModal
        visible={visible}
        title="Ajouter un post"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if (postId && title && inputText) {
            editPost(postId, title, inputText);
          } else {
            addPost(title, inputText);
          }
        }}
        cancelable>
        <TextInput
          label="Title"
          value={title}
          onChangeText={text => setTitle(text)}
          mode="outlined"
        />
        <TextInput
          label="Text"
          value={inputText}
          onChangeText={text => setInputText(text)}
          mode="outlined"
        />
      </AddPostModal>
    </SafeAreaView>
  );
};
export default PostsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#008542',
  },
  textButton: {
    color: 'white',
  },
  postContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 350,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
  },
});

// return (
//   <View style={styles.postContainer}>
//     <Image
//       style={styles.tinyLogo}
//       source={{
//         uri: `${item.img}`,
//       }}
//     />
//     <Text>{item.title}</Text>
//     <Text>{item.text}</Text>
//     <TouchableOpacity
//       onPress={() => editFunction(item.id, item.title, item.text)}>
//       <Text>Edit</Text>
//     </TouchableOpacity>
//     <TouchableOpacity
//       key={item.id}
//       onPress={() => {
//         deletePost(item.id);
//       }}>
//       <AntDesign name="delete" size={24} />
//     </TouchableOpacity>
//   </View>
// );
