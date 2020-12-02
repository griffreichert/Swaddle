import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ActivityIndicator, StatusBar} from 'react-native';

class AuthLoading extends Component {
  componentDidMount() {
    this.props.navigation.navigate(this.props.login_status === 1 ? 'App' : 'Auth');
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    login_status: state.authReducer.login_status,
  };
};

export default connect(mapStateToProps)(AuthLoading);