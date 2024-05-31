import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default Input;
