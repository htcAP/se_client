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
  lightPrimaryTextColor: 'rgba(255,255,255,.67)',
  secondaryColor: MKColor.Indigo,
  secondaryTextColor: '#FFF',
  statusBarColor: 'rgba(0,0,0,0.48)',

  lightSecondaryTextColor: 'rgba(0,0,0,0.87)',
  dividerColor: 'rgba(0,0,0,.12)',

  alertColor: '#f44336',
});

let theme = getTheme();

export default theme;
