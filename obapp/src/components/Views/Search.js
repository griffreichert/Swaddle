import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Card, Chip, HelperText, Paragraph, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import Header from '../Atoms/Header';

import { tags } from '../Atoms/TagsList';
import { posts } from '../Atoms/Posts'
import api from '../../Internals/apiClient';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            all_posts: [],
            search_tag: '',
            isLoading: false,
        };
    }
    

    componentDidMount() {
        // this.setState({ isLoading: true })
        // console.log("mounted")
        this._refresh = this.props.navigation.addListener('focus', () => this.loadPosts());
        // removes listener when component unmounts
        return this._refresh;
    }

    // componentWillUnmount() {
    //     this.props.navigation.remove
    // }

    loadPosts() {
        console.log("[Search] loading posts")
        this.setState({ isLoading: true })
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
            this.setState({ isLoading: false, all_posts: res_posts, posts: res_posts })
            console.log('loaded')
        }).catch(err => console.log('ERR: ' + err))
    }

    filterPosts(search_tag) {
        // if same tag, remove it and show all posts
        if (this.state.search_tag === search_tag) {
            console.log('[Tag]: ' + search_tag + ' exists')
            this.setState({ search_tag: '', posts: this.state.all_posts })
        }
        else {
            console.log('[Tag]: adding' + search_tag)
            // console.log('\nfiltering')
            var filtered_posts = this.state.all_posts.filter(p => {
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
                <View style={{ height: 140, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center' }}>
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
                {this.state.posts.length ? (<FlatList
                        data={this.state.posts}
                        refreshing={this.state.isLoading}
                        renderItem={this.makeCard}
                        onRefresh={() => this.loadPosts()}
                        style={{ marginBottom: 120 }}
                    />):(
                        <HelperText
                            children={'Your posts will display here!\n\nTap the button in the bottom right corner to make a post'}
                            style={style.helper} />
                    )}
                </View>

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