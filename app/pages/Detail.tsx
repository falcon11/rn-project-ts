import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Post, PostsState } from '../models/states/posts';
import { connect } from 'react-redux';
interface Props {
  post: Post;
  dispatch?: any;
}
type IPropsDetail = NavigationScreenProps & Props;
class Detail extends Component<IPropsDetail> {
  static navigationOptions = {
    title: 'Detail',
  };

  render() {
    const { post } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Detail from {this.props.navigation.state.params.from}</Text>
        <Text style={styles.text}>{post.title}</Text>
        <Text style={[styles.text, { color: 'gray', fontSize: 17 }]}>{post.body}</Text>
        <Image source={{ uri: post.image }} style={{ width: 100, height: 100 }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

function mapStateToProps(state: any) {
  return { ...state.posts };
}

export default connect(mapStateToProps)(Detail);
