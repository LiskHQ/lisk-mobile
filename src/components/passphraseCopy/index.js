import React from 'react';
import { View, Image } from 'react-native';
import { deviceHeight } from '../../utilities/device';
import { B, P } from '../toolBox/typography';
import CopyToClipboard from '../copyToClipboard';
import { themes } from '../../constants/styleGuide';
import passphraseImg from '../../assets/images/registrationProcess/passphrase3x.png';
import passphraseImgDark from '../../assets/images/registrationProcess/passphrase-dark3x.png';
import withTheme from '../withTheme';
import getStyles from './styles';

class PassphraseCopy extends React.Component {
  constructor() {
    super();
    this.deviceHeight = deviceHeight();
  }

  render() {
    const { theme, styles, passphrase } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.textContainer}>
          <View style={[styles.passphraseContainer, styles.theme.passphraseContainer]}>
            <P style={styles.theme.passphraseTitle}>
              Store your passphrase:
            </P>
            <B style={[styles.passphrase, styles.theme.passphrase]}>
              {passphrase}
            </B>
          </View>
          <View style={styles.copyContainer}>
            <CopyToClipboard
              style={styles.copyContainer}
              labelStyle={styles.theme.copy}
              iconStyle={styles.theme.copy}
              label='Copy to clipboard'
              showIcon={true}
              iconSize={14}
              value={passphrase}
              type={P}
            />
          </View>
        </View>
        {
          this.deviceHeight > 640 &&
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={theme === themes.light ? passphraseImg : passphraseImgDark}
            />
            <P style={[styles.caption, styles.theme.caption]}>
              Keep it safe!
            </P>
          </View>
        }
      </View>
    );
  }
}

export default withTheme(PassphraseCopy, getStyles());
