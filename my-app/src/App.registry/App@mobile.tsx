import { Registry, withRegistry } from '@bem-react/di';
import {cn} from '@bem-react/classname';
import { Body, cnBody } from '../Body/Body@mobile';
import { App as AppCommon } from '../App';

const cnApp = cn('App');
export const mobile = new Registry({ id: cnApp() });

mobile.set(cnBody(), Body);

export const App = withRegistry(mobile)(AppCommon);