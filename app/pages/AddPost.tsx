import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { createAction } from '../utils';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

interface Props {
  dispatch: any;
}

class AddPost extends Component<Props> {
  static navigationOptions = (navigation: any) => {
    return { title: 'Add Post' };
  };
  state: { title: string; body: string; image: string };
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      body: '',
      image: '',
    };
  }
  handleTitleChange = (text: string) => {
    this.setState({ title: text });
  };
  handleBodyChange = (text: string) => {
    this.setState({ body: text });
  };
  handleUploadImage = () => {
    this.props
      .dispatch(
        createAction('posts/uploadImage')({
          path: '/Users/ashoka/Downloads/2.png',
          name: 'test.png',
        })
      )
      .then((url: string) => {
        this.setState({ image: url });
      });
  };
  handleSubmit = () => {
    this.props.dispatch(
      createAction('posts/createPost')({
        title: this.state.title,
        body: this.state.body,
        image: this.state.image,
      })
    );
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>title:</Text>
        <TextInput value={this.state.title} onChangeText={this.handleTitleChange} />
        <View
          style={{
            borderBottomColor: '#bbb',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 10,
          }}
        />
        <Text>body:</Text>
        <TextInput
          style={{ minHeight: 120, maxHeight: 300 }}
          value={this.state.body}
          onChangeText={this.handleBodyChange}
          multiline
        />
        <Image source={{ uri: this.state.image }} style={{ width: 100, height: 100 }} />
        <Button title={'upload image'} onPress={this.handleUploadImage} />
        <Button title={'submit'} onPress={this.handleSubmit} />
      </SafeAreaView>
    );
  }
}

export default connect()(AddPost);
