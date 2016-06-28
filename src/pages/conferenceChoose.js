import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {
  MKRadioButton,
} from 'react-native-material-kit';
import {
  Actions,
} from 'react-native-router-flux';

import StatusBar from '../components/statusbar';
import NavBar from '../components/navbar';
import IconButton from '../components/iconButton';
import texts from '../lib/texts';
import theme from '../lib/theme';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ConferenceChoosePage extends Component {

  constructor() {
    super();
    this.radioGroup = new MKRadioButton.Group();
  }

  cancelOperation = () => {
    Actions.pop();
  }

  submit = () => {
    Actions.pop();
  }


  render() {
    return (
      <View>
        <StatusBar />
        <NavBar title={texts.ChooseConference}
          leftNav={ <IconButton
            iconName="clear"
            onTouch={this.cancelOperation}
          />}
          rightNav={<IconButton
            iconName="done"
            onTouch={this.submit}
          />}
        />

        <ScrollView style={theme.container}>
          <View style={{paddingTop: 16}} />

          <View style={[theme.cardStyle, styles.card]}>
            <View style={theme.conferDenseDetailItermContainer}>
            <View style={theme.conferDenseDetailIterm}>
              <View style={[theme.conferDetailIcon, {marginLeft: 10, marginRight: 6}]}>
                <MKRadioButton
                  checked={true}
                  group={this.radioGroup}
                />
              </View>
              <Text style={[theme.conferDetailContent, theme.conferDetailContentText]} >
                {texts.Arrangement + ' 1'}
              </Text>
            </View>
            </View>

            <View style={theme.conferDenseDetailItermContainer}>
            <View style={theme.conferDenseDetailIterm}>
              <Icon style={theme.conferDetailIcon}
                name="place"
                size={24}
              />
              <Text style={[theme.conferDetailContent, theme.conferDetailContentText]} >
                609
              </Text>
            </View>
            </View>

            <View style={theme.conferDenseDetailItermContainer}>
              <View style={[theme.conferDenseDetailIterm]}>
                <Icon style={theme.conferDetailIcon}
                  name="query-builder"
                  size={24}
                />
                <View style={theme.conferDetailContent}>
                  <Text style={theme.conferDetailContentText}>
                    2016 June 1st
                  </Text>
                  <Text style={theme.conferDetailContentText}>
                    9:30 AM
                  </Text>
                </View>
              </View>

              <View style={[theme.conferDenseDetailIterm]}>
                <View style={theme.conferDetailIcon} />
                <View style={theme.conferDetailContent}>
                  <Text style={theme.conferDetailContentText}>
                    2016 June 1st
                  </Text>
                  <Text style={theme.conferDetailContentText}>
                    10:30 AM
                  </Text>
                </View>
              </View>
            </View>

        </View>

        <View style={[theme.cardStyle, styles.card]}>
          <View style={theme.conferDenseDetailItermContainer}>
          <View style={theme.conferDenseDetailIterm}>
            <View style={[theme.conferDetailIcon, {marginLeft: 10, marginRight: 6}]}>
              <MKRadioButton
                checked={true}
                group={this.radioGroup}
              />
            </View>
            <Text style={[theme.conferDetailContent, theme.conferDetailContentText]} >
              {texts.Arrangement + ' 2'}
            </Text>
          </View>
          </View>

          <View style={theme.conferDenseDetailItermContainer}>
          <View style={theme.conferDenseDetailIterm}>
            <Icon style={theme.conferDetailIcon}
              name="place"
              size={24}
            />
            <Text style={[theme.conferDetailContent, theme.conferDetailContentText]} >
              7102
            </Text>
          </View>
          </View>

          <View style={theme.conferDenseDetailItermContainer}>
            <View style={[theme.conferDenseDetailIterm]}>
              <Icon style={theme.conferDetailIcon}
                name="query-builder"
                size={24}
              />
              <View style={theme.conferDetailContent}>
                <Text style={theme.conferDetailContentText}>
                  2016 June 1st
                </Text>
                <Text style={theme.conferDetailContentText}>
                  9:30 AM
                </Text>
              </View>
            </View>

            <View style={[theme.conferDenseDetailIterm]}>
              <View style={theme.conferDetailIcon} />
              <View style={theme.conferDetailContent}>
                <Text style={theme.conferDetailContentText}>
                  2016 June 1st
                </Text>
                <Text style={theme.conferDetailContentText}>
                  10:30 AM
                </Text>
              </View>
            </View>
          </View>

        </View>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
 card: {
   marginBottom: 16,
   marginLeft: -1,
   marginRight: -1,
   borderRadius: 0,
 }
});
