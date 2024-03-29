/* eslint-disable max-statements */
import React, { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { AppState, SafeAreaView } from 'react-native';
import i18next from 'i18next';
import RNQRGenerator from 'rn-qr-generator';
import { launchImageLibrary } from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import Toast from 'react-native-toast-message';

import { useModal } from 'hooks/useModal';
import CameraAccessAlert from './CameraAccessAlert';
import CameraOverlay from './CameraOverlay';
import withTheme from '../withTheme';
import getStyles from './Scanner.styles';

const Scanner = forwardRef(
  (
    {
      styles,
      containerStyles: { scanner, cameraOverlay } = {},
      onQRCodeRead,
      onClose,
      onCameraVisibilityChange,
      permissionDialogTitle,
      permissionDialogMessage,
      reference,
      navigation,
    },
    ref
  ) => {
    const { toggle: toggleModalContext } = useModal();
    const [camera, setCamera] = useState({
      permission: 'undetermined',
      visible: false,
    });

    const [photo, setPhoto] = useState({
      permission: 'undetermined',
      visible: false,
    });

    const setPermissions = (permissions) => {
      setCamera((prevState) => ({ ...prevState, permissions: permissions.camera }));
      setPhoto((prevState) => ({ ...prevState, permissions: permissions.photo }));
    };

    const checkPermissions = useCallback(() => {
      Permissions.checkMultiple(['camera', 'photo']).then((response) => {
        setPermissions(response);
      });
    }, []);

    const handleSelectedImageError = () =>
      Toast.show({
        type: 'error',
        text1: i18next.t('Error'),
        text2: i18next.t('auth.setup.qrCodeError'),
      });

    const readFromPhotoGallery = (items) => {
      setCamera((prevState) => ({ ...prevState, visible: false }));
      setPhoto((prevState) => ({ ...prevState, visible: false }));

      navigation.setOptions({
        tabBar: !photo.visible,
        headerLeft: true,
      });

      if (items.length > 0) {
        RNQRGenerator.detect({
          uri: items[0].uri,
        })
          .then((response) => {
            const { values } = response;

            if (!values.length) {
              return handleSelectedImageError();
            }
            return onQRCodeRead(values[0]);
          })
          .catch(() => handleSelectedImageError());
      }
    };

    const toggleCamera = useCallback(() => {
      setCamera((prevState) => ({ ...prevState, visible: !prevState.visible }));

      if (!camera.visible && typeof onClose === 'function') {
        onClose();
      }
    }, []);

    const closeCamera = useCallback(
      () => setCamera((prevState) => ({ ...prevState, visible: false })),
      []
    );

    useEffect(() => {
      if (typeof onCameraVisibilityChange === 'function') {
        onCameraVisibilityChange(camera.visible);
      }
      toggleModalContext(camera.visible);
    }, [camera.visible]);

    useImperativeHandle(ref, () => ({ toggleCamera, closeCamera }));

    const toggleGallery = async () => {
      const result = await launchImageLibrary();
      if (!result.didCancel) {
        readFromPhotoGallery(result.assets);
      }
    };

    const readQRcode = (event) => {
      toggleCamera();
      onQRCodeRead(event.data);
    };

    useEffect(() => {
      checkPermissions();
      AppState.addEventListener('change', checkPermissions);
    }, []);

    if (!camera.visible) {
      return null;
    }

    return (
      <SafeAreaView style={styles.scannerContainer}>
        <RNCamera
          ref={reference}
          style={[styles.preview, styles.cameraPreview, scanner]}
          onBarCodeRead={readQRcode}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          notAuthorizedView={<CameraAccessAlert close={toggleCamera} type="noAuth" />}
          pendingAuthorizationView={<CameraAccessAlert close={toggleCamera} type="pendingAuth" />}
          androidCameraPermissionOptions={{
            title: permissionDialogTitle,
            message: permissionDialogMessage,
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          <CameraOverlay
            containerStyles={[styles.cameraOverlay, cameraOverlay]}
            toggleGallery={toggleGallery}
            photoPermission={photo.permission}
            close={toggleCamera}
          />
        </RNCamera>
      </SafeAreaView>
    );
  }
);

export default withTheme(Scanner, getStyles(), true);
