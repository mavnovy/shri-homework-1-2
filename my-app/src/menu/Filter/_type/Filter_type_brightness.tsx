import React, { Component } from 'react';
import './Filter_type_brightness.css';
import { withBemMod } from '@bem-react/core';
import { IFilterProps } from '../Index';

export const FilterTypeBrightness = withBemMod<IFilterProps>('Filter', { type: 'brightness' });
