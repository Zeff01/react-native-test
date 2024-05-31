import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { getFormData } from "@/state/globalSlice";
import {
  useNavigation,
  NavigationProp as BaseNavigationProp,
} from "@react-navigation/native";
import { RootStackParamList } from "@/navigation";

interface FormData {
  gender: string;
}
type NavigationProp = BaseNavigationProp<RootStackParamList, "Gender">;

const GenderScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
    dispatch(getFormData(data));
    navigation.navigate("AddChildren");
  };

  const placeholder = {
    label: "Select an option...",
    value: null,
  };

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Step 2: Select Your Gender</Text>
      </View>
      <View style={styles.formWrapper}>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              placeholder={placeholder}
              items={options}
              onValueChange={(value) => {
                onChange(value);
              }}
              value={value}
            />
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next &gt;&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>&lt;&lt; Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  formWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  backButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
