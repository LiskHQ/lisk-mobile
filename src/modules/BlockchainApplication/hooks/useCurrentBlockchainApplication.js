import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentApplication } from '../store/selectors';
import { setCurrentApplication } from '../store/actions';

export function useCurrentBlockchainApplication() {
  const dispatch = useDispatch();

  const currentApplication = useSelector(selectCurrentApplication);

  const setApplication = useCallback(
    (application) => dispatch(setCurrentApplication(application)),
    [],
  );

  return [currentApplication, setApplication];
}
