import contextFactory from 'shared/contexts';

import useNavigationContext from './use-navigation-contex';

const {
    Provider: NavigationProvider,
    useContext: useNavigation,
} = contextFactory(useNavigationContext);

export { NavigationProvider, useNavigation };
