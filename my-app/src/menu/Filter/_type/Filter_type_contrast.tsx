import React, { Component } from 'react';
import './Filter_type_contrast.css';
import { withBemMod } from '@bem-react/core';
import { IFilterProps } from '../Index';

export const FilterTypeContrast= withBemMod<IFilterProps>('Filter', { type: 'contrast' });
