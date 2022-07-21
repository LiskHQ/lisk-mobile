import React from 'react'
import { View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useTheme } from 'hooks/useTheme'
import { P } from 'components/shared/toolBox/typography'
import { deviceType } from 'utilities/device'
import { colors, themes } from 'constants/styleGuide'
import Input from 'components/shared/toolBox/input'
import Icon from 'components/shared/toolBox/icon'
import { useSearch } from '../../../../hooks/useSearch'
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement'
import CaretSvg from '../../../../assets/svgs/CaretSvg'

import getBlockchainApplicationsListStyles from './styles'

export default function BlockchainApplicationsList() {
  const { theme, styles } = useTheme({ styles: getBlockchainApplicationsListStyles() })

  const { applications } = useBlockchainApplicationManagement()

  const { term, setTerm } = useSearch()

  const extraHeight = deviceType() === 'android' ? 170 : 0

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <KeyboardAwareScrollView
        viewIsInsideTab
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        extraHeight={extraHeight}
      >
        <View style={[styles.innerContainer, styles.theme.innerContainer]}>
          <View style={styles.searchContainer}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={18}
              color={theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray}
            />
            <Input
              placeholder="Search applications"
              autoCorrect={false}
              autoFocus
              innerStyles={{
                input: [styles.input],
                containerStyle: [styles.inputContainer],
              }}
              placeholderTextColor={theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray}
              onChange={(value) => setTerm(value)}
              value={term}
              returnKeyType="search"
            />
          </View>

          <View style={styles.body}>
            {applications.isLoading ? (
              <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>Loading apps...</P>
            ) : (
              applications.data.map((application, index) => (
                <View
                  key={application.chainID}
                  style={{
                    ...styles.applicationContainer,
                    paddingTop: index === 0 ? 0 : 16,
                  }}
                >
                  <View style={styles.applicationNameContainer}>
                    <Image source={{ uri: application.images.logo.png }} style={{ ...styles.applicationLogoImage }} />

                    <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>{application.name}</P>
                  </View>

                  <CaretSvg
                    direction="right"
                    color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
                  />
                </View>
              ))
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
