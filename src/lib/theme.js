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

  container: {
    flex: 1,
  },

  white: '#FFF',
  primaryColor: MKColor.Cyan,
  primaryTextColor: '#FFF',
  secondaryColor: MKColor.Indigo,
  secondaryTextColor: '#FFF',
  statusBarColor: 'rgba(0,0,0,0.54)',

  lightSecondaryTextColor: 'rgba(0,0,0,0.87)',
});

let theme = getTheme();

export default theme;
