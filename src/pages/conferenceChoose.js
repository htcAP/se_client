import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {
  MKRadioButton,
} from 'react-native-material-kit';
import {
  Actions,
} from 'react-native-router-flux';
import {
  connect
} from 'react-redux';

import StatusBar from '../components/statusbar';
import NavBar from '../components/navbar';
import IconButton from '../components/iconButton';
import texts from '../lib/texts';
import theme from '../lib/theme';
import {
  describeDate,
  describeTime,
} from '../lib/utils';

import Icon from 'react-native-vector-icons/MaterialIcons';

class ConferenceChoosePage extends Component {

  constructor(props) {
    super(props);
    this.radioGroup = new MKRadioButton.Group();
    this._radios = {};
    this.state = this.calcState(props);
  }

  calcState = (props) => {
    let state = {};
    props.meeting.suggestions.forEach((_, idx) => state[idx] = (idx === 0) );
    return state;
  }

  componentWillReceiveProps(props) {
    this.setState(this.calcState(props));
  }

  cancelOperation = () => {
    Actions.pop();
  }

  submit = () => {
    let idx = 0;
    Object.keys(this.state).forEach((x) => {
      if (this.state[x]) {
        idx = x;
      }
    });
    this.props.confirmNew(this.props.meeting.suggestions[idx]);
    Actions.popTo('conferenceList');
  }

  onRefresh = () => {
    this.props.requestSuggestion()
    .then(() => {
      this.setState(this.props);
    });
  }

  render() {

    const suggestionList = this.props.meeting.suggestions.map((s, idx) => {
      const startAfter = new Date(s.start_time);
      const endBefore = new Date(s.end_time);

      return (
        <TouchableNativeFeedback delayPressIn={20}
          onPress={() => this._radios[idx]._onTouch({type: 'TOUCH_UP'})}
          key={idx}
        >
        <View style={[theme.cardStyle, styles.card]}>
          <View style={theme.conferDenseDetailItermContainer}>
          <View style={theme.conferDenseDetailIterm}>
            <View style={[theme.conferDetailIcon, {marginLeft: 10, marginRight: 6}]}>
              <MKRadioButton
                ref={(c) => this._radios[idx] = c}
                checked={this.state[idx]}
                group={this.radioGroup}
                onCheckedChange={({checked}) => this.setState({...this.state, [idx]:checked})}
              />
            </View>
            <Text style={[theme.conferDetailContent, theme.conferDetailContentText]} >
              { texts.Arrangement + ' ' + (idx + 1) }
            </Text>
          </View>
          </View>

          <View style={theme.conferDenseDetailItermContainer}>
          <View style={theme.conferDenseDetailIterm}>
            <Icon style={theme.conferDetailIcon}
              name="place" size={24}
            />
            <Text style={[theme.conferDetailContent, theme.conferDetailContentText]} >
              { s.room.name }
            </Text>
          </View>
          </View>

          <View style={theme.conferDenseDetailItermContainer}>
            <View style={[theme.conferDenseDetailIterm]}>
              <Icon style={theme.conferDetailIcon}
                name="query-builder" size={24}
              />
              <View style={theme.conferDetailContent}>
                <Text style={[theme.conferDetailContentText, {flex: 1}]}>
                  { describeDate(startAfter) }
                </Text>
                <Text style={theme.conferDetailContentText}>
                  { describeTime(startAfter) }
                </Text>
              </View>
            </View>

            <View style={[theme.conferDenseDetailIterm]}>
              <View style={theme.conferDetailIcon} />
              <View style={theme.conferDetailContent}>
                <Text style={[theme.conferDetailContentText, {flex: 1}]}>
                  { describeDate(endBefore) }
                </Text>
                <Text style={theme.conferDetailContentText}>
                  { describeTime(endBefore) }
                </Text>
              </View>
            </View>
          </View>
        </View>
        </TouchableNativeFeedback>
        );
    });

    if (suggestionList.length === 0) {
      suggestionList.push(
        <View style={{flex: 1}} key={-1} />
      );
    }

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

        <View style={theme.container}>
        <ScrollView
          refreshControl={ <RefreshControl
            refreshing={this.props.meeting.suggestionFetching}
            onRefresh={this.onRefresh}
            colors={[theme.primaryColor, theme.secondaryColor]}
          />}
        >
          <View style={{paddingTop: 8}} />

          { suggestionList }

        </ScrollView>
        </View>

      </View>
    );
  }
}

export default connect(
  (({meeting}) => ({meeting}))
)(ConferenceChoosePage);

const styles = StyleSheet.create({
 card: {
   marginTop: 8,
   marginBottom: 8,
   marginLeft: -1,
   marginRight: -1,
   paddingTop: 4,
   paddingBottom: 4,
   backgroundColor: '#fff',
   borderRadius: 0,
 }
});
