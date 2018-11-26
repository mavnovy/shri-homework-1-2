import React, { Component } from 'react';
import './Filter_type_left.css';
import { withBemMod } from '@bem-react/core';
import { IFilterProps } from '../Index';

export const FilterTypeLeft = withBemMod<IFilterProps>('Filter', { position: 'left' });
