import React, { Component } from 'react';
import './Filter_type_right.css';
import { withBemMod } from '@bem-react/core';
import { IFilterProps } from '../Index';

export const FilterTypeRight= withBemMod<IFilterProps>('Filter', { position: 'right' });
