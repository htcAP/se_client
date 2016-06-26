import {
  getTheme,
  setTheme,
  MKColor,
} from 'react-native-material-kit';

setTheme({
  cardStyle: {
    borderRadius: 2,
    elevation: 2,
    flex: 0,
  },

  primaryColor: MKColor.Cyan
});

let theme = getTheme();


export default theme;
