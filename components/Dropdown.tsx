import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Text from './Text';
import { Colors } from '../constants/default-styles';

interface Props {
  label: string;
  entries: {
    index: number;
    label: string;
  }[];
  chosenEntry: string;
  onEntryPress: (label: string) => void;
}

const Dropdown: React.FC<Props> = props => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const entryPress = (label: string) => {
    props.onEntryPress(label);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <View>
        <Text.H3>{props.label}</Text.H3>
      </View>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={isDropdownOpen ? styles.dropdownOpen : styles.dropdown}>
          <Text.H3>{props.chosenEntry}</Text.H3>
        </View>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContent}>
          {props.entries.map(entry => (
            <TouchableOpacity
              key={entry.index}
              onPress={() => entryPress(entry.label)}
            >
              <View style={styles.dropdownEntry}>
                <Text.Body1
                  style={
                    props.chosenEntry === entry.label && {
                      color: Colors.primary1,
                    }
                  }
                >
                  {entry.label}
                </Text.Body1>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 24,
  },
  dropdown: {
    marginTop: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary1,
    borderRadius: 20,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownOpen: {
    marginTop: 24,
    width: '100%',
    borderColor: Colors.primary1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContent: {
    minHeight: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: Colors.primary1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dropdownEntry: {
    height: 50,
    width: '100%',
    borderTopColor: Colors.grey4,
    borderTopWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
