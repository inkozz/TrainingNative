/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {Surface, Title, TextInput} from 'react-native-paper';
import AddPostModal from '../modals/AddPostModal';
import CardPostItem from '../components/CardPostItem';
import {useNavigation} from '@react-navigation/native';
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
  const [image, setImage] = useState('');
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
        setPosts(json);
      })
      .catch(e => {
        console.log(e);
      });
    setLoading(false);
  };
  // A améliorer (à mettre dans un fichier à part)
  const addPost = (title: string, text: string, img: string) => {
    fetch('http://10.0.2.2:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        img: img,
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
  const editPost = (
    postId: number,
    title: string,
    text: string,
    img: string,
  ) => {
    fetch(`http://10.0.2.2:3000/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        img: img,
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
  const getOnePost = async (postId: number) => {
    await fetch(`http://10.0.2.2:3000/posts/${postId}`)
      .then(response => response.json())
      .then(json => {
        navigation.navigate('Details', {
          itemId: postId,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePost = (postId: number) => {
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

  const editFunction = (
    id: number,
    title: string,
    text: string,
    img: string,
  ) => {
    setVisible(true);
    setPostId(id);
    setImage(img);
    setTitle(title);
    setInputText(text);
  };

  const updateView = () => {
    getPosts();
    setVisible(false);
    setTitle('');
    setInputText('');
    setImage('');
    setPostId(0);
  };

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
        keyExtractor={(item: number, index: number) =>
          item.id + index.toString()
        }
        refreshing={loading}
        onRefresh={getPosts}
        renderItem={({item}) => (
          <CardPostItem
            img={item.img}
            title={item.title}
            text={item.text}
            onEdit={() =>
              editFunction(item.id, item.title, item.text, item.img)
            }
            onDelete={() => deletePost(item.id)}
            getDetail={() => getOnePost(item.id)}
          />
        )}
      />
      <AddPostModal
        visible={visible}
        title="Ajouter un post"
        onDismiss={() => updateView()}
        onSubmit={() => {
          if (postId && title && inputText && image) {
            editPost(postId, title, inputText, image);
          } else {
            addPost(title, inputText, image);
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
        <TextInput
          label="Image"
          value={image}
          onChangeText={text => setImage(text)}
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
