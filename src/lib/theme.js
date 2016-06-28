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

  conferDetailItermContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.12)',
  },

  conferDetailIterm: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
  },

  conferDetailIcon: {
    width: 72 - 16 - 16,
    marginLeft: 16,
  },

  conferDetailContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  conferDetailContentText: {
    fontSize: 16,
  },

  white: '#FFF',
  primaryColor: MKColor.Cyan,
  primaryTextColor: '#FFF',
  lightPrimaryTextColor: 'rgba(255,255,255,.67)',
  secondaryColor: MKColor.Indigo,
  secondaryTextColor: '#000',
  statusBarColor: 'rgba(0,0,0,0.48)',

  lightSecondaryTextColor: 'rgba(0,0,0,0.34)',
  dividerColor: 'rgba(0,0,0,.12)',

  alertColor: '#f44336',
});

let theme = getTheme();

export default theme;
