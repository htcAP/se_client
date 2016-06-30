import {
  getTheme,
  setTheme,
} from 'react-native-material-kit';

setTheme({
  cardStyle: {
    borderRadius: 2,
    elevation: 2,
    flex: 0,
  },

  page: {
    backgroundColor: '#eee',
  },

  container: {
    flex: 1,
  },

  conferDetailItermContainer: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.12)',
  },

  conferDenseDetailItermContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 16,
  },

  conferDetailIterm: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
  },

  conferDenseDetailIterm: {
    height: 36,
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
  },

  conferDetailContentText: {
    fontSize: 16,
  },

  conferDetailContentTextContainer: {
    height: 48,
    justifyContent: 'center',
  },

  headerPadding: {
    paddingTop: 8,
    backgroundColor: '#fff',
  },

  white: '#FFF',
  primaryColor: '#00BCD4',
  primaryTextColor: '#FFF',
  lightPrimaryTextColor: 'rgba(255,255,255,.67)',
  secondaryColor: '#FFC107',
  secondaryTextColor: '#000',
  statusBarColor: 'rgba(0,0,0,0.48)',

  lightSecondaryTextColor: 'rgba(0,0,0,0.34)',
  dividerColor: 'rgba(0,0,0,.12)',

  alertColor: '#f44336',
  pageBackgroundColor: '#eee',
});

let theme = getTheme();

export default theme;
