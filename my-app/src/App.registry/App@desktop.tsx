import { Registry, withRegistry } from '@bem-react/di';
import {cn} from '@bem-react/classname';
import { Body, cnBody } from '../Body/Body@desktop';
import { App as AppCommon} from '../App';

const cnApp = cn('App');
export const desktop = new Registry({ id: cnApp() });

desktop.set(cnBody(), Body);

export const App = withRegistry(desktop)(AppCommon);