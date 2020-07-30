// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Route } from './types';

import MatrixFactorization from '@polkadot/app-matrix-factorization';

export default function create(t: <T = string> (key: string, text: string, options: { ns: string }) => T): Route {
  return {
    Component: MatrixFactorization,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    icon: 'sync',
    name: 'matrix_factorization',
    text: t<string>('nav.matrix-factorization', 'Matrix Factorization', { ns: 'apps-routing' })
  };
}
