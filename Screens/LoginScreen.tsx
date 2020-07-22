import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/UI/Header';
import Button from '../components/UI/Button';
import CustomInput from '../components/UI/Input';
import * as Text from '../components/UI/Text';
import {
  emailValidityFunction,
  passwordValidityFunction,
} from '../functions/validity';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/auth';
import { RootState } from '../store/types';
import Form from '../components/UI/Form';
import { defaultStyles } from '../constants/default-styles';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
    goBack: Function;
  };
}

const SignInScreen: React.FC<Props> = props => {
  const [form, setForm] = useState({
    email: { value: '', isError: false, errorMessage: '' },
    password: { value: '', isError: false, errorMessage: '' },
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const incorrectUser = useSelector((state: RootState) => state.auth.error);

  const dispatch = useDispatch();

  const submitForm = () => {
    const emailValidity = emailValidityFunction(form.email.value);
    if (emailValidity !== 'No Error') {
      return setForm({
        ...form,
        email: {
          value: form.email.value,
          isError: true,
          errorMessage: emailValidity,
        },
      });
    }

    const passwordValidity = passwordValidityFunction(form.password.value);

    if (passwordValidity !== 'No Error') {
      return setForm(prevState => ({
        ...prevState,
        password: {
          value: prevState.password.value,
          isError: true,
          errorMessage: passwordValidity,
        },
      }));
    }
    dispatch(login(form.email.value, form.password.value));
  };

  return (
    <View style={styles.screen}>
      <Form>
        <Header
          headerLeft={{
            type: 'AntDesign',
            name: 'arrowleft',
            onPress: () => props.navigation.goBack(),
          }}
        >
          Desclr
        </Header>
        <CustomInput
          containerStyle={defaultStyles.inputContainer}
          label='Email'
          returnKeyType='next'
          placeholder='Your Email'
          autoCapitalize='none'
          keyboardType='email-address'
          isError={form.email.isError}
          errorMessage={form.email.errorMessage}
          value={form.email.value}
          onChangeText={value =>
            setForm(prevState => ({
              ...prevState,
              email: {
                value: value,
                isError: false,
                errorMessage: '',
              },
            }))
          }
        />
        <CustomInput
          containerStyle={defaultStyles.inputContainer}
          label='Password'
          placeholder='Your Password'
          autoCapitalize='none'
          keyboardType='default'
          isError={form.password.isError}
          errorMessage={form.password.errorMessage}
          secureTextEntry={isPasswordHidden}
          value={form.password.value}
          onChangeText={value =>
            setForm(prevState => ({
              ...prevState,
              password: {
                value: value,
                isError: false,
                errorMessage: '',
              },
            }))
          }
          iconButton={{
            type: 'Entypo',
            name: isPasswordHidden ? 'eye-with-line' : 'eye',
            onPress: () => setIsPasswordHidden(!isPasswordHidden),
          }}
        />
      </Form>
      <View style={styles.buttons}>
        <Button
          onPress={() => props.navigation.navigate('SignUpScreen')}
          style={styles.signUpButton}
          icon={{ type: 'AntDesign', name: 'arrowright', size: 16 }}
        >
          Sign Up
        </Button>
        <Button
          onPress={submitForm}
          style={styles.button}
          type='colorful'
          icon={{ type: 'AntDesign', name: 'arrowright', size: 16 }}
        >
          Login
        </Button>
      </View>
      {incorrectUser && (
        <View style={styles.incorrectUser}>
          <Text.Error>Incorrect User</Text.Error>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'white',
  },
  input: {
    marginTop: 24,
  },
  signUpButton: {
    marginVertical: 24,
    // marginBottom: 24,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginBottom: 40,
  },
  incorrectUser: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});

export default SignInScreen;
