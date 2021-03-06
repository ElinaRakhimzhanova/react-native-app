import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as postActions from '../actions/postActions';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Card, SearchBar} from "react-native-elements";

class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  handleCreatePost() {
    let data = {};
    this.props.createPost(data);
  }

  filterUpdate = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    let filteredPosts = this.props.posts.filter(
      (post) => {
        return post.title.indexOf(this.state.search) !== -1;
      }
    );
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.filterUpdate}
          value={search}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            { filteredPosts.map(post =>
                <TouchableHighlight key={post.id} id={post.id} onPress={() => this.props.navigation.navigate('Post', {id: post.id})} underlayColor='#F5FCFF'>
                  <Card stele={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>
                      { post.title }
                    </Text>
                    <Image
                      source={{uri: post.image}}
                      style={styles.welcomeImage}
                    />
                    </Card>
                </TouchableHighlight>
            )}
          </View>
        </ScrollView>
        <Button title={"Add new event"} onPress={this.handleCreatePost}/>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    //resizeMode: 'contain',
  },
  getStartedContainer: {
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

const mapDispatchToProps = {
  getPosts: postActions.getPosts,
  createPost: postActions.createPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
