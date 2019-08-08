import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator
} from "react-native";
import AuthLogo from "./authLogo";
import AuthForm from "./authForm";
import { connect } from "react-redux";
import { autoSignIn } from "../../store/actions/user_actions";
import { getTokens, setTokens } from "../../utils/misc";
import { bindActionCreators } from "redux";

class AuthComponent extends Component {
  state = {
    loading: true
  };

  goNext = () => {
    this.props.navigation.navigate("App");
  };

  componentDidMount() {
    getTokens(values => {
      if (values[0][1] === null) {
        this.setState({ loading: false });
      } else {
        this.props.autoSignIn(values[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.setState({ loading: false });
          } else {
            setTokens(this.props.User.auth, () => {
              this.goNext();
            });
          }
        });
      }
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <AuthLogo />
            <AuthForm goNext={this.goNext} />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#1d428a",
    padding: 50
  }
});

function mapStateToProps(state) {
  return {
    User: state.User
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoSignIn }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);
