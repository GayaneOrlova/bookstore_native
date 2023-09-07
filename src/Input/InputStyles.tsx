import { StyleSheet } from "react-native";

const InputStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  input_form: {
    // flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 16,
    backgroundColor: '#F0F4EF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_icon: {
    width: 24,
    height: 24,
    marginHorizontal: 20,
  },
});

export default InputStyles