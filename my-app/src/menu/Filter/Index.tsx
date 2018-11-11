import { compose, IClassNameProps } from '@bem-react/core';

import { Filter as Base } from './Filter';
import { FilterTypeBrightness } from './_type/Filter_type_brightness';
import { FilterTypeContrast } from './_type/Filter_type_contrast';

export interface IFilterProps extends IClassNameProps {
    text: string;
    type?: string;
}
const Filter = compose(
    FilterTypeBrightness,
    FilterTypeContrast
)(Base);

export default Filter;