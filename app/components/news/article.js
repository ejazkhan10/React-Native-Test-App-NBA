import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import moment from "moment";
class ArticleComponent extends Component {
  formatText(content) {
    const text = content.replace(/<p>/g, "").replace(/<\/p>/g, "");
    return text;
  }
  render() {
    const params = this.props.navigation.state.params;
    return (
      <ScrollView style={{ backgroundColor: "#F8F8F8" }}>
        <Image
          style={{ height: 250 }}
          source={{ uri: params.image }}
          resizeMode="cover"
        />

        <View style={styles.articleContainer}>
          <View>
            <Text style={styles.articleTitle}>{params.title}</Text>
            <Text style={styles.articleDate}>
              {params.team} - Posted at {moment(params.date).format("d MMM")}{" "}
            </Text>
          </View>
          <View style={styles.articleContent}>
            <Text style={styles.articleText}>
              {this.formatText(params.content)}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10
  },
  articleTitle: {
    fontSize: 23,
    color: "#323232",
    fontFamily: "Roboto-Bold"
  },
  articleDate: {
    fontSize: 12,
    color: "#828282",
    fontFamily: "Roboto-Light"
  },
  articleContent: {
    marginTop: 30
  },
  articleText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Roboto-Light"
  }
});

export default ArticleComponent;
