import { StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

const InputStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  input_form: {
    height: 48,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 16,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 15,
  },
  input_icon: {
    width: 24,
    height: 24,
    marginHorizontal: 20,
  },
});

export default InputStyles