import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Caption, Card, Chip, Paragraph, Text, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import Header from '../Atoms/Header';
import MediaButton from '../Atoms/MediaButton';
import axios from 'axios'

import {img1, img2} from '../Atoms/ExamplePics'
import { tags } from '../Atoms/TagsList';


class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
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
            ],
            isLoading: false,
        };
    }

    componentDidMount() {
        // console.log("mounted")
        this._refresh = this.props.navigation.addListener('focus', () => this.loadPosts());
        // removes listener when component unmounts
        return this._refresh;
    }

    // componentWillUnmount() {
    //     this.props.navigation.remove
    // }

    handleAspectRatio() {

    }

    loadPosts() {
        console.log("load posts")
        api.get('/')
            .then((response) => {
                // console.log(response.data.link)
            })
            .catch((e) => console.log(e))
        this.setState({isLoading: false})
    }

    getChipIcon(name) {
        var x = tags.map(t => {
            if (t.text === name) {
                return t.icon
            }
        })
        if (x[0]) {
            return x[0]
        }
        else {
            return ''
        }
    }

    makeCard(post) {
        return (
            <Card style={{margin: 10}}>
                <Card.Title 
                    title={post.item.title} 
                    titleStyle={style.postTitle} />
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
                    <ScrollView horizontal={true}>
                        {post.item.tags.map((name) => {
                            // console.log(this)
                            return (<View
                                key={name}
                                style={{ margin: 5, flexWrap: 'wrap' }}>
                                <Chip
                                    icon={ tags.find(t => t.text == name).icon ? tags.find(t => t.text == name).icon : '' }
                                    mode='outlined'
                                    selected={true}>
                                    {name}
                                </Chip>
                            </View>)
                        })}
                    </ScrollView>
                    <Paragraph 
                        children={post.item.caption} 
                        style={style.postCaption} />
                </Card.Content>
            </Card>
        )
    }

    render() {
        return (
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <Header navigation={this.props.navigation} />
                <View>
                    <FlatList
                        data={this.state.posts}
                        refreshing={this.state.isLoading}
                        renderItem={this.makeCard}
                        onRefresh={() => this.loadPosts()}
                        style={{marginBottom: 120}}
                    />
                </View>
                <MediaButton navigation={this.props.navigation} />
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
        alignContent: 'flex-end'
    },
    inner: {
        flex: 1,
        margin: 20,
    },

    button: {
        marginVertical: 10,
        padding: 10
    },
    postTitle: { 
        marginTop: 20, 
        textAlign: 'center'
    },
    postCaption: {
        padding: 10,
        textAlign: 'center', 
        fontSize: 18,
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Feed));