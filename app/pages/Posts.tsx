import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NavigationScreenProps, NavigationActions, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { createAction } from '../utils';
import { Post } from '../models/states/posts';
import { Button } from '../components';

interface Props {
  posts: Post[];
  dispatch?: any;
}

function mapStateToProps(state: any) {
  return { ...state.posts };
}

class Posts extends Component<Props & NavigationScreenProps> {
  static navigationOptions = (navigation: any) => {
    return { title: 'Posts' };
  };
  componentDidMount() {
    this.props.dispatch(createAction('posts/getPosts')());
  }

  goAddPost = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'AddPost' }));
  };

  render() {
    const { posts } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={posts}
          keyExtractor={(item: Post, index) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View style={{ padding: 8 }}>
                <Text style={{ fontSize: 17 }}>{item.title}</Text>
                <Text style={{ marginTop: 12, color: 'gray' }}>{item.body}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomColor: '#bbb',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          )}
        />
        <Button text={'add post'} onPress={this.goAddPost} />
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Posts);
