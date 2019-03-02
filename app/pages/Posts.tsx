import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { createAction } from '../utils';

interface Props {
  posts: any;
  dispatch?: any;
}

interface Item {
  id: string;
  title: string;
  body: string;
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

  render() {
    const { posts } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={posts}
          keyExtractor={(item: Item, index) => `${item.id}`}
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
      </View>
    );
  }
}

export default connect(mapStateToProps)(Posts);
