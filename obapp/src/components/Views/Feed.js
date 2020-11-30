import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Caption, Card, Chip, HelperText, Paragraph, Text, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import Header from '../Atoms/Header';
import MediaButton from '../Atoms/MediaButton';

import api from '../../Internals/apiClient'
import { tags } from '../Atoms/TagsList';
import { posts } from '../Atoms/Posts'


class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        // this.loadPosts()
        // console.log(this.props.session_token)
        // this.setState({ posts: posts })
        // console.log("mounted")
        this._refresh = this.props.navigation.addListener('focus', () => this.loadPosts());
        // removes listener when component unmounts
        return this._refresh;
    }

    // componentWillUnmount() {
    //     this.props.navigation.remove
    // }

    loadPosts() {
        console.log("[Feed] load posts")
        this.setState({ isLoading: true }, () => {
            api.get('/load_posts', {
                headers: {
                    'token': this.props.session_token
                }
            }).then((response) => {
                var res_posts = response.data.data
                res_posts = res_posts.map(p => {
                    p.timestamp = new Date(p.timestamp.replace(' ', 'T'))
                    return p
                })
                // console.log(res_posts)
                // res_posts.map(p => console.log(p.id))
                this.setState({ isLoading: false, posts: res_posts })
            }).catch(err => console.log('ERR: ' + err.status))
        })
    }

    makeCard(post) {
        return (
            <Card style={{ margin: 10 }}>
                <Card.Title
                    title={post.item.title}
                    titleStyle={style.postTitle} />
                {post.item.media && (<Card.Cover
                    style={{
                        marginVertical: 10,
                        width: '100%',
                        height: undefined,
                        aspectRatio: 1
                        // aspectRatio: Image.getSize(`data:image/jpeg;base64,${post.item.image}`, (width, height) => width/height)
                    }}
                    source={{ uri: `data:image/jpeg;base64,${post.item.media}` }}
                    resizeMode="cover"
                />)}
                <Card.Content>
                    <Paragraph
                        children={post.item.caption}
                        style={style.postCaption} />
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {post.item.tags.map((name) => {
                            return (<View
                                key={name}
                                style={{ margin: 5, flexWrap: 'wrap' }}>
                                <Chip
                                    icon={tags.find(t => t.text == name).icon ? tags.find(t => t.text == name).icon : ''}
                                    mode='outlined'
                                    selected={true}>
                                    {name}
                                </Chip>
                            </View>)
                        })}
                    </View>
                    {post.item.timestamp && (<Paragraph
                        children={post.item.timestamp.getMonth() + 1 + '/' + post.item.timestamp.getDate() + '/' + (post.item.timestamp.getYear() + 1900)}
                        style={style.postCaption} />)}
                </Card.Content>
            </Card>
        )
    }

    render() {
        return (
            <View style={[style.container, { backgroundColor: this.props.theme.colors.background }]}>
                <Header navigation={this.props.navigation} />
                <View>
                    {!this.state.posts.length && (
                        <HelperText
                            children={'Your posts will display here!\n\nTap the button in the bottom right corner to make a post'}
                            style={style.helper} />
                    )}
                    <FlatList
                        data={this.state.posts}
                        refreshing={this.state.isLoading}
                        extraData={this.state.isLoading}
                        renderItem={this.makeCard}
                        onRefresh={() => this.loadPosts()}
                        style={{ marginBottom: 120 }}
                    />
                </View>
                <MediaButton navigation={this.props.navigation} />
            </View>
        );
    }
}

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
    helper: {
        marginVertical: 20,
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center'
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