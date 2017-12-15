/**
 * @providesModule BEMCheckBox
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import { StyleSheet, requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';

const RNBEMCheckBox = requireNativeComponent('RNBEMCheckBox', null);

const BOX_TYPES = ['circle', 'square'];
const ANIMATION_TYPES = ['stroke', 'fill', 'bounce', 'flat', 'one-stroke', 'fade'];

export default class BEMCheckBox extends Component {

  static propTypes = {
    value: PropTypes.bool,
    lineWidth: PropTypes.number,
    hideBox: PropTypes.bool,
    boxType: PropTypes.oneOf(BOX_TYPES),
    tintColor: PropTypes.string,
    onCheckColor: PropTypes.string,
    onFillColor: PropTypes.string,
    onTintColor: PropTypes.string,
    animationDuration: PropTypes.number,
    onAnimationType: PropTypes.oneOf(ANIMATION_TYPES),
    offAnimationType: PropTypes.oneOf(ANIMATION_TYPES),
    onValueChange: PropTypes.func,
    onAnimationEnd: PropTypes.func,
  };

  static defaultProps = {
  };

  render () {
    const { style, ...rest} = this.props;
    return (
      <RNBEMCheckBox
        style={[styles.checkbox, style]}
        onChange={this._onChange}
        {...rest}
      />
    );
  }

  _onChange = (event: Object): void => {
    const { name, value } = event.nativeEvent;
    const { onValueChange, onAnimationEnd } = this.props;
    switch (name) {
      case 'tap':
        onValueChange && onValueChange(value);
        break;
      case 'animation':
        onAnimationEnd && onAnimationEnd(value);
        break;
    }
  };

}

const styles = StyleSheet.create({
  checkbox: {
    height: 50,
    width: 50,
    backgroundColor: 'transparent',
  },
});
