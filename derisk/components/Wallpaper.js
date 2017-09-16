import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    Image,
} from 'react-native';

import bgSrc from '../assets/images/wallpaper.jpg';
import PropTypes from 'prop-types';

export default class Wallpaper extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  }

    render() {
      const { src } = this.props;
      console.log(src)

        return (
            <Image style={styles.picture} source={require(src)}>
                {this.props.children}
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
});