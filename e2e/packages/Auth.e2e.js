/* eslint-disable max-statements */
import { device, element, by, waitFor } from 'detox';
import { defaultDerivationPath } from 'modules/Auth/constants/recoveryPhrase.constants';
import testConstants from '../utils/testConstants';

describe('Auth module', () => {
  beforeAll(async () => {
    await device.launchApp();
    await waitFor(element(by.text('Manage accounts')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('intro-screen')).swipe('left');
    await element(by.id('continueToAddAccountButton')).tap();
  });

  it('should add an account by recovery phrase', async () => {
    await element(by.id('secret-phrase')).tap();
    await element(by.id('signInRecoveryPhaseInput')).tap();
    await element(by.id('signInRecoveryPhaseInput')).typeText(
      `${testConstants.secretRecoveryPhrase}`
    );
    await element(by.id('secret-recovery-screen')).tap();
    await waitFor(element(by.id('continue-button')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('continue-button')).tap();
    await element(by.id('enter-password')).tap();
    await element(by.id('enter-password')).typeText(`Pass\n`);
    // Password validation works as expected
    await expect(element(by.id('enter-password-error'))).toBeVisible();
    await element(by.id('enter-password')).tap();
    await element(by.id('enter-password')).replaceText(`${testConstants.password}`);
    await element(by.id('confirm-password')).tap();
    await element(by.id('confirm-password')).typeText(`${testConstants.password}x\n`);
    // Password validation works as expected
    await expect(element(by.id('confirm-password-error'))).toBeVisible();
    await element(by.id('confirm-password')).tap();
    await element(by.id('confirm-password')).replaceText(`${testConstants.password}`);
    await element(by.id('account-name')).tap();
    await element(by.id('account-name')).typeText(`${testConstants.accountName}`);
    // Dismiss keyboard
    await element(by.id('password-setup-form')).tap();
    await element(by.id('agree-switch')).tap();
    await element(by.id('save-account')).tap();
    await waitFor(element(by.id('download-file-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('download-file-button')).atIndex(0).tap();
    await element(by.id('result-screen-continue')).atIndex(0).tap();
    await expect(element(by.id('accounts-home-container'))).toBeVisible();
  });

  it('should display all account information', async () => {
    await expect(element(by.id('username-label'))).toBeVisible();
    await expect(element(by.id('address-copy-to-clipboard'))).toBeVisible();
    // TODO: Test tokens are displayed
    // (details on https://github.com/LiskHQ/lisk-mobile/issues/1826).
  });

  it('should edit account name', async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('account-list-item')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('account-list-item')).tap();
    await element(by.id('switch-account')).tap();
    await element(by.id('account-list-item')).swipe('left');
    await element(by.id('edit-account')).tap();
    await waitFor(element(by.id('account-name')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('account-name')).replaceText('tester');
    // Dismiss keyboard
    await element(by.id('edit-account')).tap();
    await element(by.id('edit-name-done-button')).tap();
    await waitFor(element(by.id('edit-account-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('edit-account-button')).tap();
    await waitFor(element(by.id('switch-account')))
      .toBeVisible()
      .withTimeout(10000);
    await expect(element(by.text('tester'))).toBeVisible();
  });

  it('should remove account successfully', async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('account-list-item')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('account-list-item')).tap();
    await element(by.id('switch-account')).tap();
    await element(by.id('account-list-item')).swipe('left');
    await element(by.id('delete-account')).tap();
    await element(by.id('download-file-button')).tap();
    await element(by.id('delete-account-button')).tap();
    // Deleted current account (navigate back to auth method)
    await expect(element(by.id('secret-phrase'))).toBeVisible();
  });

  it('should add account by file upload', async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('restore-from-file')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('restore-from-file')).tap();
    await element(by.id('decrypt-password-input')).tap();
    await element(by.id('decrypt-password-input')).typeText('Password1!\n');
    await element(by.id('decrypt-button-continue')).tap();
    await expect(element(by.id('account-list-item'))).toBeVisible();
  });

  it('should register new account', async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id('add-account')))
      .toBeVisible()
      .withTimeout(10000);
    const recoveryPhraseArray = testConstants.secretRecoveryPhrase.split(' ');
    await element(by.id('add-account')).tap();
    await element(by.id('createAccountButton')).tap();
    await element(by.id('12-word-srp')).tap();
    await element(by.id('continue-to-srp')).tap();
    await element(by.id('understandResponsibilitySwitch')).tap();
    await element(by.id('safeKeepingButton')).tap();
    await element(by.id(`recoveryPhrasePlaceholderFor-${recoveryPhraseArray[0]}`)).tap();
    await element(by.id(`recoveryPhraseOptionFor-${recoveryPhraseArray[0]}`)).tap();
    await element(by.id(`recoveryPhrasePlaceholderFor-${recoveryPhraseArray[1]}`)).tap();
    await element(by.id(`recoveryPhraseOptionFor-${recoveryPhraseArray[1]}`)).tap();
    await element(by.id('registerConfirmButton')).atIndex(0).tap();
    await element(by.id('enter-password')).tap();
    await element(by.id('enter-password')).typeText(`${testConstants.password}`);
    await element(by.id('confirm-password')).tap();
    await element(by.id('confirm-password')).typeText(`${testConstants.password}`);
    await element(by.id('account-name')).tap();
    await element(by.id('account-name')).typeText(`${testConstants.accountName}`);
    // Dismiss keyboard
    await element(by.id('password-setup-form')).tap();
    await element(by.id('agree-switch')).tap();
    await element(by.id('save-account')).tap();
    await waitFor(element(by.id('download-file-button')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('download-file-button')).atIndex(0).tap();
    await element(by.id('result-screen-continue')).atIndex(0).tap();
    await expect(element(by.id('accounts-home-container'))).toBeVisible();
  });

  describe('Derivation path', () => {
    it('should add an account with enable access to legacy account disabled', async () => {
      device.reloadReactNative();
      await waitFor(element(by.id('add-account')))
        .toBeVisible()
        .withTimeout(10000);
      await element(by.id('add-account')).tap();
      await element(by.id('secret-phrase')).tap();
      await element(by.id('secret-recovery-screen')).tap();
      await element(by.id('derivation-checkbox')).tap();
      await element(by.id('signInRecoveryPhaseInput')).tap();
      await element(by.id('signInRecoveryPhaseInput')).typeText(testConstants.secretRecoveryPhrase);
      await element(by.id('secret-recovery-screen')).tap();
      await element(by.id('continue-button')).tap();
      await element(by.id('enter-password')).tap();
      await element(by.id('enter-password')).typeText(testConstants.password);
      await element(by.id('confirm-password')).tap();
      await element(by.id('confirm-password')).typeText(testConstants.password);
      await element(by.id('account-name')).tap();
      await element(by.id('account-name')).typeText(testConstants.accountName);
      await element(by.id('password-setup-form')).tap();
      await element(by.id('agree-switch')).tap();
      await element(by.id('save-account')).tap();
      await waitFor(element(by.id('download-file-button')))
        .toBeVisible()
        .withTimeout(10000);
      await element(by.id('download-file-button')).atIndex(0).tap();
      await element(by.id('result-screen-continue')).atIndex(0).tap();
      await expect(element(by.id('accounts-home-container'))).toBeVisible();
    });

    it('should add an account with updated derivation path enabled', async () => {
      await element(by.id('Settings-tab')).atIndex(0).tap();
      await element(by.id('show-derivation-path')).tap();
      await element(by.id('AccountHome-tab')).atIndex(0).tap();
      await element(by.id('switch-account')).tap();

      await element(by.id('add-account')).tap();
      await element(by.id('secret-phrase')).tap();
      await element(by.id('secret-recovery-screen')).tap();
      await expect(element(by.id('derivation-path-input'))).toBeVisible();
      await element(by.id('derivation-path-input')).typeText('invalid-path');
      await expect(element(by.id('derivation-path-input-error'))).toBeVisible();
      await element(by.id('derivation-path-input')).replaceText(defaultDerivationPath);
      await element(by.id('signInRecoveryPhaseInput')).tap();
      await element(by.id('signInRecoveryPhaseInput')).typeText(
        `${testConstants.secretRecoveryPhrase}\n`
      );
      await element(by.id('continue-button')).tap();
      await element(by.id('enter-password')).tap();
      await element(by.id('enter-password')).typeText(`${testConstants.password}\n`);
      await element(by.id('confirm-password')).tap();
      await element(by.id('confirm-password')).typeText(`${testConstants.password}\n`);
      await element(by.id('account-name')).tap();
      await element(by.id('account-name')).typeText(`${testConstants.accountName}\n`);
      await element(by.id('agree-switch')).tap();
      await element(by.id('save-account')).tap();
      await waitFor(element(by.id('download-file-button')))
        .toBeVisible()
        .withTimeout(10000);
      await element(by.id('download-file-button')).atIndex(0).tap();
      await element(by.id('result-screen-continue')).atIndex(0).tap();
      await expect(element(by.id('accounts-home-container'))).toBeVisible();
    });
  });
});
