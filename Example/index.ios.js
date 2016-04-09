/* @flow */
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  SliderIOS,
  ActionSheetIOS,
  TouchableOpacity,
  SegmentedControlIOS,
} from 'react-native';

import BEMCheckBox from 'react-native-bem-check-box';

const COLORS = {
  AZURE: '#007aff',
  LIGHT_GRAY: '#aaa', // 0.667 white
  WHITE: '#fff',
  CLEAR: 'transparent',
};
const ANIMATION_TYPES = {
  'stroke': 'Stroke',
  'fill': 'Fill',
  'bounce': 'Bounce',
  'flat': 'Flat',
  'one-stroke': 'One stroke',
  'fade': 'Fade',
};

class CheckBox extends Component {

  state: Object = {
    drawTypeIndex: 1,
    boxTypeIndex: 0,
    drawTypeSegmentEnabled: true,
    animationDuration: 0.5,
    lineWidth: 5,
    animationIndex: 2,
  };

  render () {
    const {
      drawTypeIndex, boxTypeIndex,
      animationDuration, lineWidth, animationIndex,
      drawTypeSegmentEnabled,
    } = this.state;

    let tintColor, onTintColor, onFillColor, onCheckColor;
    if (drawTypeIndex === 0) {
      tintColor = COLORS.LIGHT_GRAY;
      onTintColor = COLORS.AZURE;
      onFillColor = COLORS.CLEAR;
      onCheckColor = COLORS.AZURE;
    }
    else {
      tintColor = COLORS.LIGHT_GRAY;
      onTintColor = COLORS.AZURE;
      onFillColor = COLORS.AZURE;
      onCheckColor = COLORS.WHITE;
    }

    return (
      <View style={styles.container}>
        <View style={styles.previewContainer}>
          <BEMCheckBox
            style={styles.checkbox}
            lineWidth={lineWidth}
            boxType={['circle', 'square'][boxTypeIndex]}
            tintColor={tintColor}
            onTintColor={onTintColor}
            onFillColor={onFillColor}
            onCheckColor={onCheckColor}
            onAnimationType={Object.keys(ANIMATION_TYPES)[animationIndex]}
            offAnimationType={Object.keys(ANIMATION_TYPES)[animationIndex]}
            animationDuration={animationDuration}
          />
        </View>
        <View style={styles.controlsContainer}>
          <View style={styles.segmentContainer}>
            <SegmentedControlIOS
              style={styles.segment}
              values={['Stroke', 'Fill']}
              tintColor={COLORS.WHITE}
              selectedIndex={drawTypeIndex}
              onChange={this._onDrawTypeChange}
              enabled={drawTypeSegmentEnabled}
            />
            <SegmentedControlIOS
              style={styles.segment}
              values={['Circle', 'Square']}
              tintColor={COLORS.WHITE}
              selectedIndex={boxTypeIndex}
              onChange={(event) => {
                this.setState({
                  boxTypeIndex: event.nativeEvent.selectedSegmentIndex
                });
              }}
            />
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Animation duration</Text>
            <SliderIOS
              style={styles.slider}
              value={animationDuration}
              minimumValue={0.2}
              maximumValue={2}
              minimumTrackTintColor={COLORS.WHITE}
              maximumTrackTintColor={COLORS.WHITE}
              onValueChange={(value) => this.setState({animationDuration: value})}
            />
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Line width</Text>
            <SliderIOS
              style={styles.slider}
              value={lineWidth}
              minimumValue={3}
              maximumValue={10}
              minimumTrackTintColor={COLORS.WHITE}
              maximumTrackTintColor={COLORS.WHITE}
              onValueChange={(value) => this.setState({lineWidth: value})}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this._onPressAnimation}
            >
              <Text style={styles.buttonLabel}>Animations</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _onDrawTypeChange: (event: Object) => void = (event) => {
    const drawTypeIndex = event.nativeEvent.selectedSegmentIndex;
    this.setState({ drawTypeIndex });
  };

  _onPressAnimation: (event: Object) => void = (event) => {
    const { animationIndex } = this.state;
    ActionSheetIOS.showActionSheetWithOptions({
      options: Object.values(ANIMATION_TYPES),
      title: 'Animations',
      cancelButtonIndex: animationIndex,
    },
    (animationIndex) => {
      const animationType = Object.keys(ANIMATION_TYPES)[animationIndex];
      if (animationType === 'stroke' || animationType === 'one-stroke') {
        this.setState({
          drawTypeIndex: 0,
          drawTypeSegmentEnabled: false,
          animationIndex,
        });
      }
      else if (animationType === 'fill') {
        this.setState({
          drawTypeIndex: 1,
          drawTypeSegmentEnabled: false,
          animationIndex,
        });
      }
      else {
        this.setState({
          drawTypeSegmentEnabled: true,
          animationIndex,
        });
      }
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: 1,
    backgroundColor: COLORS.AZURE,
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  sliderLabel: {
    color: COLORS.WHITE,
  },
  buttonLabel: {
    color: COLORS.WHITE,
  },
  checkbox: {
    width: 100,
    height: 100,
  },
  segment: {
    width: 123,
    height: 28,
    margin: 20,
  },
  slider: {
    width: 100,
    height: 30,
  },
  button: {
    width: 100,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('CheckBox', () => CheckBox);
