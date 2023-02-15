import * as t from 'io-ts';
import { createGuard } from './createGuard';

export const isString = createGuard(t.string);
export const isNumber = createGuard(t.number);