import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
  state: { title: string; body: string };
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }
  handleTitleChange = (text: string) => {
    this.setState({ title: text });
  };
  handleBodyChange = (text: string) => {
    this.setState({ body: text });
  };
  handleSubmit = () => {
    this.props.dispatch(
      createAction('posts/createPost')({ title: this.state.title, body: this.state.body })
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
        <Button title={'submit'} onPress={this.handleSubmit} />
      </SafeAreaView>
    );
  }
}

export default connect()(AddPost);
