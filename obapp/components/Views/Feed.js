import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, Text, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import Header from '../Header';
import MediaButton from '../MediaButton';
import axios from 'axios'

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {
                    id: 'item1',
                    image: 'https://i.some-random-api.ml/Snzc4MEWcZ.jpg',
                    tags: ['bark', 'play', 'cuddle'],
                },
                {
                    id: 'item2',
                    image: 'https://i.some-random-api.ml/cKawj2aC4O.jpg',
                    tags: ['woof', 'ears', 'adorable'],
                },
            ],
            isLoading: false,
        };
    }

    componentDidMount() {
        console.log("mounted")
        this._refresh = this.props.navigation.addListener('focus', () => this.loadPosts());
        // removes listener when component unmounts
        return this._refresh;
    }

    componentWillUnmount() {
        this.props.navigation.remove
    }


    loadPosts() {
        console.log("load posts")
        api.get('/')
            .then((response) => {
                console.log(response.data.link)
            })
            .catch((e) => console.log(e))
        this.setState({isLoading: false})
    }

    makeChip(name) {
        return (
            <View
                key={name}
                style={{ margin: 5, flexWrap: 'wrap' }}>
                <Chip
                    icon='owl'
                    mode='outlined'
                    style={{ backgroundColor: this.props.theme.colors.accent }}
                    onPress={() => console.log(name)}>
                    {name}
                </Chip>
            </View>
        )
    }

    makeCard(post) {
        return (
            <Card style={{marginVertical: 10}}>
                <Card.Title title="Post" style={{ marginLeft: 10 }} />
                <Card.Cover source={{ uri: post.item.image }} style={{ marginVertical: 10 }} />
                <Card.Content>
                    <ScrollView horizontal={true}>
                        {post.item.tags.map((name) => {
                            return (<View
                                key={name}
                                style={{ margin: 5, flexWrap: 'wrap' }}>
                                <Chip
                                    icon='owl'
                                    mode='outlined'
                                    onPress={() => console.log(name)}>
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
                <View style={style.inner}>
                    <FlatList
                        data={this.state.posts}
                        refreshing={this.state.isLoading}
                        renderItem={this.makeCard}
                        onRefresh={() => this.loadPosts()}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Feed));