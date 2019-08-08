import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { getNews } from "../../store/actions/news_actions";
import moment from "moment";
class NewsComponent extends Component {
  componentDidMount() {
    this.props.dispatch(getNews());
  }
  renderArticle = news =>
    news.articles ? (
      news.articles.map((item, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            this.props.navigation.navigate("Article", {
              ...item
            })
          }
        >
          <View style={styles.cardContainer}>
            <View>
              <Image
                style={{ height: 150, justifyContent: "space-around" }}
                source={{ uri: `${item.image}` }}
                resizeMode="cover"
              />
            </View>
          </View>

          <View style={styles.contentCard}>
            <Text style={styles.titleCard}>{item.title}</Text>
            <View style={styles.bottomCard}>
              <Text style={styles.bottomCardTeam}>{item.team} - </Text>
              <Text style={styles.bottomCardDate}>
                {" "}
                Posted at {moment(item.date).format("d MMM")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <Text>Wait </Text>
    );
  render() {
    return (
      <ScrollView style={{ backgroundColor: "#F0F0F0" }}>
        {this.renderArticle(this.props.News)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    margin: 10,
    shadowColor: "#dddddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2
  },
  contentCard: {
    borderWidth: 1,
    borderColor: "#dddddd"
  },
  titleCard: {
    color: "#232323",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    padding: 10
  },
  bottomCard: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    padding: 10
  },
  bottomCardTeam: {
    color: "#828282",
    fontSize: 12,
    fontFamily: "Roboto-Bold"
  },
  bottomCardDate: {
    color: "#828282",
    fontSize: 12,
    fontFamily: "Roboto-Light"
  }
});
function mapStateToProps(state) {
  return {
    News: state.News
  };
}
export default connect(mapStateToProps)(NewsComponent);
