import { compose, IClassNameProps } from '@bem-react/core';

import { Filter as Base } from './Filter';
import { FilterTypeLeft} from './_position/Filter_type_left';
import { FilterTypeRight } from './_position/Filter_type_right';

export interface IFilterProps extends IClassNameProps {
    text: string;
    name: string;
    position?: string;
}
const Filter = compose(
    FilterTypeLeft,
    FilterTypeRight
)(Base);

export default Filter;