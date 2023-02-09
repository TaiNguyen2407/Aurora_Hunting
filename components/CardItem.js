import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import CardTag from './CardTag';
import CardIconButton from './CardIconButton';
import {uploadsUrl} from '../utils/variables';
import {useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardItem = ({data, navigation}) => {
  const [postUser, setPostUser] = useState({});
  const [postUserAvatar, setPostUserAvatar] = useState('');
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const getPostUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await getUserById(data.user_id, userToken);
      setPostUser(user);
    } catch (error) {
      console.error('getPostUserError', error);
    }
  };

  const loadAvatar = async () => {
    try {
      const tag = 'avatar_' + data.user_id;
      const files = await getFilesByTag(tag);
      setPostUserAvatar(files?.pop()?.filename);
    } catch (error) {
      console.error('loadAvatarError', error);
    }
  };

  useEffect(() => {
    getPostUser();
    loadAvatar();
  }, []);

  return (
    <Card
      style={styles.cardContainer}
      mode="contained"
      onPress={() => navigation.navigate('Single')}
    >
      <Card.Title
        title={postUser.username}
        style={{color: '#f57b42'}}
        left={(props) => (
          <Avatar.Image
            {...props}
            size={50}
            source={{
              uri: postUserAvatar
                ? uploadsUrl + postUserAvatar
                : 'http://placekitten.com/200/300',
            }}
          />
        )}
      />
      <Card.Cover
        style={styles.cardImage}
        source={{uri: uploadsUrl + data.thumbnails.w320}}
      />
      <CardIconButton dataId={data.file_id} navigation={navigation} />
      <Text variant="titleLarge">{data.title}</Text>
      <Text varient="bodyMedium">{data.description}</Text>
      <Text varient="bodySmall" style={styles.dateText}>
        {new Date(data.time_added).toLocaleString('fi-FI')}
      </Text>
      <View style={styles.cardTagContainer}>
        <CardTag dataId={data.file_id} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#212121',
    flex: 1,
    marginBottom: 35,
    marginHorizontal: 30,
  },
  cardImage: {
    objectFit: 'cover',
  },
  cardTagContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 16,
  },
  dateText: {
    marginTop: 10,
    fontSize: 11,
    color: '#949494',
  },
});

CardItem.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
};

export default CardItem;
