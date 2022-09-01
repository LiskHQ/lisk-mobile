import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { colors } from 'constants/styleGuide';
import Register from 'modules/Auth/Register';
import AddBookmark from 'modules/Bookmark/AddBookmark';
import TransactionDetails from 'modules/Transactions/components/TransactionDetails';
import Wallet from 'modules/Wallet';
import About from 'components/screens/about';
import CurrencySelection from 'components/screens/currencySelection';
import Terms from 'components/screens/terms';
import PrivacyPolicy from 'components/screens/PrivacyPolicy';
import EnableBioAuth from 'components/screens/enableBioAuth';
import DisableBioAuth from 'components/screens/disableBioAuth';
import Intro from 'components/screens/intro';

import PassphraseBackup from 'modules/Settings/BackupPassphrase';
import AuthMethod from 'modules/Auth/AuthMethod';
import SecretRecoveryPhrase from 'modules/Auth/SecretRecoveryPhrase';
import PasswordSetupForm from 'modules/Auth/PasswordSetupForm';
import AccountsManagerScreen from 'modules/Auth/AccountsManagerScreen';
import DecryptPhrase from 'modules/Auth/DecryptPhrase';
import AddApplication from 'modules/BlockchainApplication/components/AddApplication';
import AddApplicationSuccess from 'modules/BlockchainApplication/components/AddApplicationSuccess';
import ApplicationDetail from 'modules/BlockchainApplication/components/ApplicationDetail';
import SendToken from 'modules/SendToken';
import Request from 'modules/Request';
import TokensScreen from 'modules/Accounts/components/TokensScreen';
import TransactionsHistory from 'modules/Transactions/components/TransactionsHistory';
import navigationOptions from './navigationOptions';
import AppNavigator from './components/AppNavigator';

const MainStack = createStackNavigator();

const darkTabs = {
  ...DarkTheme,
  primary: colors.dark.ultramarineBlue,
  background: colors.light.white,
  card: colors.light.white,
  text: colors.light.tabBarText,
  border: 'transparent',
};

const lightTabs = {
  ...DefaultTheme,
  primary: colors.light.ultramarineBlue,
  background: colors.dark.white,
  card: colors.dark.black,
  text: colors.dark.tabBarText,
  border: 'transparent',
};

const MainNavigator = () => {
  const { theme } = useSelector((state) => state.settings);
  const themeColors = {
    dark: theme === 'light',
    colors: theme === 'light' ? darkTabs : lightTabs,
  };

  return (
    <SafeAreaProvider >
      <NavigationContainer theme={themeColors}>
        <MainStack.Navigator initialRouteName="AuthMethod">
          <MainStack.Screen
            name="Register"
            component={Register}
            options={navigationOptions.Register}
          />
          <MainStack.Screen
            name="AuthMethod"
            component={AuthMethod}
            options={navigationOptions.SignIn}
          />
          <MainStack.Screen
            name="DecryptPhrase"
            component={DecryptPhrase}
            options={navigationOptions.SignIn}
          />
          <MainStack.Screen
            name="AccountsManagerScreen"
            component={AccountsManagerScreen}
            options={navigationOptions.SignIn}
          />
          <MainStack.Screen
            name="SecretRecoveryPhrase"
            component={SecretRecoveryPhrase}
            options={navigationOptions.SignIn}
          />
          <MainStack.Screen
            name="PasswordSetupForm"
            component={PasswordSetupForm}
            options={navigationOptions.SignIn}
          />
          <MainStack.Screen name="Intro" component={Intro} options={navigationOptions.Intro} />
          <MainStack.Screen
            name="Main"
            component={AppNavigator}
            options={navigationOptions.NoHeader}
          />
          <MainStack.Screen
            name="AddBookmark"
            component={AddBookmark}
            options={navigationOptions.AddBookmark}
          />
          <MainStack.Screen
            name="AddApplication"
            component={AddApplication}
            options={navigationOptions.SignIn}
          />
          <MainStack.Screen
            name="ApplicationDetail"
            component={ApplicationDetail}
            options={navigationOptions.SignIn}
          />
          <MainStack.Screen
            name="AddApplicationSuccess"
            component={AddApplicationSuccess}
            options={navigationOptions.SignIn}
          />
          <MainStack.Screen name="About" component={About} options={navigationOptions.About} />
          <MainStack.Screen
            name="CurrencySelection"
            component={CurrencySelection}
            options={navigationOptions.CurrencySelection}
          />
          <MainStack.Screen name="Terms" component={Terms} options={navigationOptions.Terms} />
          <MainStack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={navigationOptions.PrivacyPolicy}
          />
          <MainStack.Screen
            name="TransactionsHistory"
            component={TransactionsHistory}
            options={navigationOptions.TransactionsHistory}
          />
          <MainStack.Screen
            name="TransactionDetails"
            component={TransactionDetails}
            options={navigationOptions.TransactionDetails}
          />
          <MainStack.Screen name="Wallet" component={Wallet} options={navigationOptions.Wallet} />
          <MainStack.Screen
            name="EnableBioAuth"
            component={EnableBioAuth}
            options={navigationOptions.EnableBioAuth}
          />
          <MainStack.Screen
            name="DisableBioAuth"
            component={DisableBioAuth}
            options={navigationOptions.DisableBioAuth}
          />
          <MainStack.Screen
            name="PassphraseBackup"
            component={PassphraseBackup}
            options={navigationOptions.NoHeader}
          />
          <MainStack.Screen
            name="Send"
            component={SendToken}
            options={navigationOptions.NoHeader}
          />
          <MainStack.Screen
            name="Request"
            component={Request}
            options={navigationOptions.NoHeader}
          />
          <MainStack.Screen
            name="Tokens"
            component={TokensScreen}
            options={navigationOptions.NoHeader}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigator;
