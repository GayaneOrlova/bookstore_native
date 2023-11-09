import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/colors";

const controllersStyles = StyleSheet.create({
  input_group: {
    marginBottom: 20,
    flex: 1
  },
  input_description: {
    fontWeight: '500',
    fontSize: 12,
    color: COLORS.dark_blue,
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontWeight: '700',
  },
});

export default controllersStyles