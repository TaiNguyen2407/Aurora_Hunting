import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, SafeAreaView} from 'react-native';
const Comment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Comment</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Comment;
