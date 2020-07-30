// Copyright 2017-2020 @polkadot/app-matrix-factorization authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AppProps as Props } from '@polkadot/react-components/types';

import React, { useMemo } from 'react';
import { Tabs } from '@polkadot/react-components';

import Selection from './Selection';
import { useTranslation } from './translate';

function MatrixFactorizationApp({ basePath }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const items = useMemo(() => [{
    isRoot: true,
    name: 'create',
    text: t<string>('Matrix Factorization')
  }], [t]);

  return (
    <main className='matrix-factorization--App'>
      <header>
        <Tabs
          basePath={basePath}
          items={items}
        />
      </header>
      <Selection />
    </main>
  );
}

export { MatrixFactorizationApp };

export default React.memo(MatrixFactorizationApp);
