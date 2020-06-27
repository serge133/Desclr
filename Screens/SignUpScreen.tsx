import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions/auth';
import {
  emailValidityFunction,
  passwordValidityFunction,
  confirmPasswordValidityFunction,
} from '../functions/validity';
import Form from '../components/Form';
import { defaultStyles } from '../constants/default-styles';

interface Props {
  navigation: {
    goBack: () => void;
  };
}

const SignUpScreen: React.FC<Props> = (props) => {
  const [form, setForm] = useState({
    email: { value: '', isError: false, errorMessage: '' },
    password: { value: '', isError: false, errorMessage: '' },
    confirmPassword: { value: '', isError: false, errorMessage: '' },
  });

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
      return setForm((prevState) => ({
        ...prevState,
        password: {
          value: prevState.password.value,
          isError: true,
          errorMessage: passwordValidity,
        },
      }));
    }

    const confirmPasswordValidity = confirmPasswordValidityFunction(
      form.password.value,
      form.confirmPassword.value
    );

    if (confirmPasswordValidity !== 'No Error') {
      return setForm({
        ...form,
        confirmPassword: {
          value: form.confirmPassword.value,
          isError: true,
          errorMessage: confirmPasswordValidity,
        },
      });
    }
    dispatch(signup(form.email.value, form.password.value));
  };

  return (
    <View style={styles.screen}>
      <Form>
        <Header
          headerLeft={{
            type: 'AntDesign',
            name: 'arrowleft',
            onPress: props.navigation.goBack,
          }}
        >
          Desclr
        </Header>
        <Input
          containerStyle={defaultStyles.inputContainer}
          label='Email'
          returnKeyType='next'
          placeholder='Your Email'
          keyboardType='email-address'
          isError={form.email.isError}
          errorMessage={form.email.errorMessage}
          autoCapitalize='none'
          value={form.email.value}
          onChangeText={(value) =>
            setForm((prevState) => ({
              ...prevState,
              email: {
                value: value,
                isError: false,
                errorMessage: '',
              },
            }))
          }
        />
        <Input
          containerStyle={defaultStyles.inputContainer}
          label='Password'
          placeholder='Your Password'
          keyboardType='default'
          autoCapitalize='none'
          isError={form.password.isError}
          errorMessage={form.password.errorMessage}
          secureTextEntry
          value={form.password.value}
          onChangeText={(value) =>
            setForm((prevState) => ({
              ...prevState,
              password: {
                value: value,
                isError: false,
                errorMessage: '',
              },
            }))
          }
        />
        <Input
          containerStyle={defaultStyles.inputContainer}
          label='Confirm Password'
          placeholder='Retype Your Password'
          keyboardType='default'
          autoCapitalize='none'
          isError={form.confirmPassword.isError}
          errorMessage={form.confirmPassword.errorMessage}
          secureTextEntry
          value={form.confirmPassword.value}
          onChangeText={(value) =>
            setForm((prevState) => ({
              ...prevState,
              confirmPassword: {
                value: value,
                isError: false,
                errorMessage: '',
              },
            }))
          }
        />
      </Form>
      <View style={styles.buttonContainer}>
        <Button
          onPress={submitForm}
          style={styles.button}
          icon={{ type: 'AntDesign', name: 'arrowright', size: 16 }}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'white',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
    flex: 1,
  },
  input: {
    marginTop: 24,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginBottom: 40,
  },
});

export default SignUpScreen;
