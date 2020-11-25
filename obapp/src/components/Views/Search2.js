import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, Text, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import Header from '../Atoms/Header';
import MediaButton from '../Atoms/MediaButton';
import axios from 'axios'

import { img1, img2 } from '../Atoms/ExamplePics'
import { tags } from '../Atoms/TagsList';

const all_posts = [
    {
        id: 'item1',
        title: 'We\'re having a baby',
        caption: 'Blake and I are so excited to announce that we are expecting our first child!!',
        image: img1,
        tags: ['excited', 'update', 'heartbeat'],
        aspect: 0.664
    },
    {
        id: 'item2',
        image: img2,
        title: 'Our first ultrasound',
        tags: ['ultrasound', 'update'],
        aspect: 1.46
    },
];

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            search_tag: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ posts: all_posts })
        // console.log("mounted")
        this._refresh = this.props.navigation.addListener('focus', () => this.loadPosts());
        // removes listener when component unmounts
        return this._refresh;
    }

    // componentWillUnmount() {
    //     this.props.navigation.remove
    // }

    loadPosts() {
        console.log('---')
        console.log("load posts")
        api.get('/')
            .then((response) => {
                // console.log(response.data.link)
            })
            .catch((e) => console.log(e))
        this.setState({ isLoading: false })
    }

    filterPosts(search_tag) {
        // if same tag, remove it and show all posts
        if (this.state.search_tag === search_tag) {
            this.setState({ search_tag: '', posts: all_posts })
        }
        else {
            // console.log('\nfiltering')
            var filtered_posts = all_posts.filter(p => {
                // console.log('P: ' + p.tags)
                if (p.tags.find(t => t == search_tag)) {
                    // console.log('found (' + t.text + '): ' + p.id)
                    return p
                }
            })
            this.setState({ search_tag: search_tag, posts: filtered_posts })
        }
    }

    makeCard(post) {
        return (
            <Card style={{ margin: 10 }}>
                <Card.Title title="Post" style={{ marginLeft: 10 }} />
                <Card.Cover
                    style={{
                        marginVertical: 10,
                        width: '100%',
                        height: undefined,
                        aspectRatio: post.item.aspect
                        // aspectRatio: Image.getSize(`data:image/jpeg;base64,${post.item.image}`, (width, height) => width/height)
                    }}
                    source={{ uri: `data:image/jpeg;base64,${post.item.image}` }}
                    resizeMode="cover"
                />
                <Card.Content>
                </Card.Content>
                <Card.Content>
                    <ScrollView horizontal={true}>
                        {post.item.tags.map((name) => {
                            // console.log(this)
                            return (<View
                                key={name}
                                style={{ margin: 5, flexWrap: 'wrap' }}>
                                <Chip
                                    mode='outlined'
                                    selected={true}
                                    icon={tags.find(t => t.text == name).icon ? tags.find(t => t.text == name).icon : ''}>
                                    {name}
                                </Chip>
                            </View>)
                        })}
                    </ScrollView>
                </Card.Content>
            </Card>
        )
    }

    render() {
        return (
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <Header navigation={this.props.navigation} />
                <View style={{ height: 100, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center' }}>
                    {tags.map((tag) => {
                        return (<View
                            key={tag.text}
                            style={{ margin: 5, flexWrap: 'wrap' }}>
                            <Chip
                                icon={tag.icon}
                                mode='outlined'
                                selected={this.state.search_tag === tag.text}
                                onPress={() => this.filterPosts(tag.text)}>
                                {tag.text}
                            </Chip>
                        </View>)
                    })}
                </View>
                <View style={{ marginBottom: 100 }}>
                    <FlatList
                        data={this.state.posts}
                        refreshing={this.state.isLoading}
                        renderItem={this.makeCard}
                        onRefresh={() => this.loadPosts()}
                        style={{ marginBottom: 120 }}
                    />
                </View>

            </View>
        );
    }
}

const api = axios.create({
    baseURL: 'https://some-random-api.ml/img/dog',
});

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'flex-start'
    },
    inner: {
        flex: 1,
        margin: 20,
    },

    button: {
        marginVertical: 10,
        padding: 10
    },
});

// maps state
const mapStateToProps = (state) => {
    return {
        login_status: state.authReducer.login_status,
        username: state.authReducer.username,
        session_token: state.authReducer.session_token,
    }
}

// maps actions
const mapDispatchToProps = (dispatch) => {
    return {
        rlogin: (username, session_token) => dispatch(login(username, session_token)),
        rlogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Search));