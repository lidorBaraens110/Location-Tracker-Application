import { useState, useEffect } from 'react';
import { AppState } from 'react-native';

export const useDeviceLockState = (): boolean => {
  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      setIsLocked(nextAppState === 'background');
    };

   const subs =AppState.addEventListener('change', handleAppStateChange);

    return () => {
     subs.remove()
    };
  }, []);

  return isLocked;
};
export default useDeviceLockState;