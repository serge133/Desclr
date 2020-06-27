import { StyleSheet } from 'react-native';

export const Colors = {
  primary1: '#4135F3',
  primary2: '#7168F6',
  primary3: '#A09AF9',
  primary4: '#CFCCFC',
  accent1: '#BE52F2',
  accent2: '#CE7DF5',
  accent3: '#DFA9F9',
  accent4: '#EED3FB',
  semanticYellow1: '#FFCF5C',
  semanticYellow2: '#FFDB85',
  semanticYellow3: '#FFE7AE',
  semanticBlue1: '#0084F4',
  semanticBlue2: '#40A3F7',
  semanticBlue3: '#80C2FA',
  grey1: '#28374B',
  grey2: '#5E6978',
  grey3: '#949BA5',
  grey4: '#C9CDD2',
  error: '#FF1B1B',
  text: '#3A3A3A',
};

export const Shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const defaultStyles = StyleSheet.create({
  inputContainer: {
    marginTop: 24,
  },
  textAreaContainer: {
    marginTop: 24,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
});
