import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { getFormData } from "@/state/globalSlice";
import {
  useNavigation,
  NavigationProp as BaseNavigationProp,
} from "@react-navigation/native";
import { RootStackParamList } from "@/navigation";

import Input from "../components/ui/globalUi/forms/Input";

interface FormData {
  firstName: string;
}
type NavigationProp = BaseNavigationProp<RootStackParamList, "AddChildren">;

const AddChildrenScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm<FormData>();
  const [children, setChildren] = useState<string[]>([]);

  const onAddChild = (data: FormData) => {
    setChildren([...children, data.firstName]);
    console.log({ firstName: data.firstName });
    reset({
      firstName: "",
    });
  };

  const onSubmit = () => {
    console.log({ children });
    dispatch(getFormData({ children }));
    navigation.navigate("EmailPassword");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Step 3: Add Your Children</Text>
      </View>
      <View style={styles.formWrapper}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Child's First Name"
              style={styles.input}
            />
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(onAddChild)}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>Add Child</Text>
        </TouchableOpacity>
        {children.map((child, index) => (
          <View key={index}>
            <Text>{child}</Text>
          </View>
        ))}
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

export default AddChildrenScreen;

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
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
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
