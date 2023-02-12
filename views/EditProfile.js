import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {Avatar, Button, Divider, IconButton, TextInput} from 'react-native-paper';
import AvatarImage from '../components/Avatar';
import Imagebackground from '../components/Imagebackground';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useTag, useUser } from '../hooks/ApiHooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { uploadsUrl } from '../utils/variables';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const EditProfile = () => {
  const {user, userPassword, setUserPassword} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const {getUserByToken, putUser} = useUser();

  console.log(userPassword);

  const [userAvatar, setUserAvatar] = useState('');
  const [userNewUsername, setUserNewUsername] = useState(user.username);
  const [userNewEmail, setUserNewEmail] = useState(user.email);
  const navigation = useNavigation();

  const loadAvatar = async() => {
    try {
      const tag = 'avatar_' + user.user_id;
      const files = await getFilesByTag(tag);
      setUserAvatar(files?.pop().filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    }
  }

  const modifyUserInfo = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userInfo = {
        username: userNewUsername,
        email: userNewEmail,
      }
      const result =  await putUser(token, userInfo);
      result
      ? Alert.alert('Update user information successfully')
      : Alert.alert('There is something wrong')
    } catch (error) {
     console.error('modifyUserInfo: ', error);
    }
  }

  useEffect(() => {
    loadAvatar();
  },[])

  return (
    <ScrollView style={styles.container}>
      <Imagebackground />
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={{uri: userAvatar ? uploadsUrl + userAvatar :'https://placedog.net/500'}}
          size={150}
        />
      </View>
      <View style={styles.buttonCancelContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Profile')}
          buttonColor={'#6adc99'}
        >
          Cancel
        </Button>
      </View>
      <View style={styles.buttonDoneContainer}>
        <Button
          mode="contained"
          onPress={modifyUserInfo}
          buttonColor={'#6adc99'}
        >
          Done
        </Button>
      </View>
      <View style={styles.buttonEditProfileContainer}>
        <Button
          mode="contained"
          onPress={() => console.log('pick avatar')}
          dark={true}
          buttonColor={'#6adc99'}
        >
          Pick avatar
        </Button>
        <Button
          mode="contained"
          onPress={() => console.log('pick wall paper')}
          dark={true}
          buttonColor={'#6adc99'}
        >
          Pick WallPaper
        </Button>
      </View>
      <Divider />
      <TouchableOpacity
        style={{flex: 1}}
        onPress={Keyboard.dismiss}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.inputContainer}>
            <IconButton icon={'account'} size={50} />
            <TextInput
              mode="flat"
              placeholder={'username'}
              style={{width: '100%', justifyContent:'center'}}
              numberOfLines={1}
              defaultValue={user.username}
              onChangeText={newUsername => setUserNewUsername(newUsername)}
            />
          </View>
          <Divider />
          <View style={styles.inputContainer}>
            <IconButton icon={'email'} size={50} />
            <TextInput
              mode="flat"
              placeholder={'email'}
              style={{width: '100%', justifyContent:'center'}}
              numberOfLines={1}
              defaultValue={user.email}
              onChangeText={newEmail => setUserNewEmail(newEmail)}
            />
          </View>
          <Divider />
          <View style={styles.inputContainer}>
            <IconButton icon={'information'} size={50} />
            <TextInput
              mode="flat"
              placeholder={'full name'}
              style={{width: '100%', justifyContent:'center'}}
              numberOfLines={1}
              defaultValue={user.full_name || '' }
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  avatarContainer:{
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 45,
  },
  buttonDoneContainer: {
    position: 'absolute',
    left: 0,
    right: 10,
    alignItems: 'flex-end',
    top: 30,
  },
  buttonCancelContainer: {
    position: 'absolute',
    left: 10,
    right: 0,
    alignItems: 'flex-start',
    top: 50,
  },
  buttonEditProfileContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 275,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputContainer: {
    flexDirection: 'row',
  },
});

EditProfile.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfile;
