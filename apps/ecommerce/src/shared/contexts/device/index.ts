import contextFactory from 'shared/contexts';

import useDeviceContext from './use-device-context';

const {
    Provider: DeviceProvider,
    useContext: useDevice,
} = contextFactory(useDeviceContext);

export { DeviceProvider, useDevice };
