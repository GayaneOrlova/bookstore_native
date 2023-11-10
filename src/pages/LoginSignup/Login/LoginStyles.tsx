import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/colors";

const loginStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 30,
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
  input_icon: {
    width: 24,
    height: 24,
    marginHorizontal: 20,
  },
  button: {
    width: 151,
    height: 44,
    marginTop: 20,
    backgroundColor: COLORS.dark_blue,
  },
  image: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 290,
    height: 247,
    marginVertical: 50,
    alignSelf: 'center',
  },
});

export default loginStyles