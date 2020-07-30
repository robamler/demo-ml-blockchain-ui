// Copyright 2017-2020 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useCallback, useState } from 'react';
import { Button, Dropdown, InputAddress, TxButton } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';
import { BalanceFree } from '@polkadot/react-query';

import { useTranslation } from './translate';

function Selection (): React.ReactElement {
  const { t } = useTranslation();
  const { apiDefaultTxSudo } = useApi();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [accountId2, setAccountId2] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [itemId, setItemId] = useState<string | null>(null);
  const [itemId2, setItemId2] = useState<string | null>(null);

  const ratings = [
    { text: t<string>('likes'), value: '1' },
    { text: t<string>('dislikes'), value: '-1' },
  ];

  const itemList = [
    { text: t<string>('Veep'), value: '0' },
    { text: t<string>('Archer'), value: '1' },
    { text: t<string>('13 Reasons Why'), value: '2' },
    { text: t<string>('Space Force'), value: '3' },
    { text: t<string>('Game of Thrones'), value: '4' },
    { text: t<string>('Community'), value: '5' },
    { text: t<string>('Dark'), value: '6' },
    { text: t<string>('Snowpiercer'), value: '7' },
    { text: t<string>('Vikings'), value: '8' },
    { text: t<string>('Supernatural'), value: '9' },
    { text: t<string>('The Office'), value: '10' },
    { text: t<string>('Ozark'), value: '11' },
    { text: t<string>('Rick and Morty'), value: '12' },
    { text: t<string>('The 100'), value: '13' },
    { text: t<string>('Money Heist'), value: '14' },
    { text: t<string>('Avatar: The Last Airbender'), value: '15' }
  ];

  const header = [
    [t<string>('Submit a Rating'), 'start']];

  const _onUpdate = useCallback(
    (status) => {
      status = JSON.parse(JSON.stringify(status));
      console.log(status);
      if (typeof(status['events']) !== 'undefined') {
        for (let i=0; i<status.events.length; i+=1) {
          if (status.events[i].event.data.length === 3
            && typeof(status.events[i].event.data[0]) === 'string'
            && typeof(status.events[i].event.data[1]) === 'number'
            && typeof(status.events[i].event.data[2]) === 'string'
            && status.events[i].event.data[2].substr(0, 2) === '0x')
          {
            let hexString = status.events[i].event.data[2].substr(2);
            let word0 = parseInt(hexString.substr(0, 4), 16);
            let word1 = parseInt(hexString.substr(4, 4), 16);
            let word2 = parseInt(hexString.substr(8, 4), 16);
            let word3 = parseInt(hexString.substr(12, 4), 16);

            console.log('hexString: ' + hexString);
            console.log('word0: ' + word0);
            console.log('word1: ' + word1);
            console.log('word2: ' + word2);
            console.log('word3: ' + word3);

            if (word0 >= (1<<15)) {
              word0 -= (1<<16);
            }

            let prediction = (word0 << 24) + (word1 << 8) + (word2 / (1 << 8)) + (word3 / (1 << 24));

            // alert("prediction: " + prediction);

            if (prediction > 0.9) {
              prediction = 0.9;
            }
            if (prediction < -0.9) {
              prediction = -0.9;
            }
            document.getElementById('rb-gauge').style.left = ((323 + 68) / 2 + (323 - 68) / 2 * prediction) + 'px';
            document.getElementById('rb-container').style.display = 'block';
          }
        }
      }
    },
    []
  );

  return (
    <div>
      <h2>Submit a Rating</h2>
      <InputAddress
        label={t<string>('Select user')}
        labelExtra={
          <BalanceFree
            label={<label>{t<string>('free balance')}</label>}
            params={accountId}
          />
        }
        onChange={setAccountId}
        type='account'
      />
      <Dropdown
        defaultValue={'1'}
        label='Select rating'
        onChange={setRating}
        options={ratings}
      />
      <Dropdown
        label='Select item'
        onChange={setItemId}
        options={itemList}
      />
      <Button.Group>
        <TxButton
          accountId={accountId}
          icon='sign-in'
          isDisabled={!itemId || !accountId}
          isPrimary={true}
          label={t<string>('Submit Rating')}
          params={[itemId, rating]}
          tx='matrixFactorization.submitRating'
          withSpinner
        />
      </Button.Group>
      <h2>Get a Prediction</h2>
      <InputAddress
        label={t<string>('Select user')}
        labelExtra={
          <BalanceFree
            label={<label>{t<string>('free balance')}</label>}
            params={accountId2}
          />
        }
        onChange={setAccountId2}
        type='account'
      />
      <Dropdown
        label='Select item'
        onChange={setItemId2}
        options={itemList}
      />
      <Button.Group>
        <TxButton
          accountId={accountId2}
          icon='sign-in'
          isDisabled={!itemId2 || !accountId2}
          isPrimary={true}
          label={t<string>('Get Prediction')}
          params={[itemId2]}
          tx='matrixFactorization.getPrediction'
          onUpdate={_onUpdate}
        />
      </Button.Group>
      <div id='rb-container' style={{display: 'none', position: 'relative', width: '500px', height: '100px'}}>
        <div style={{position: 'absolute', left: '50px', top: '50px', backgroundColor: "#2b8cbe", width: "300px", height: "5px"}}></div>
        <div style={{position: 'absolute', left: '70px', top: '55px', backgroundColor: "#2b8cbe", width: "5px", height: "20px"}}></div>
        <div style={{position: 'absolute', left: '198px', top: '55px', backgroundColor: "#2b8cbe", width: "5px", height: "20px"}}></div>
        <div style={{position: 'absolute', left: '325px', top: '55px', backgroundColor: "#2b8cbe", width: "5px", height: "20px"}}></div>
        <div style={{position: 'absolute', left: '50px', top: '77px'}}>dislike</div>
        <div style={{position: 'absolute', left: '315px', top: '77px'}}>like</div>
        <div style={{position: 'absolute', left: '177px', top: '77px'}}>neutral</div>
        <div id='rb-gauge' style={{position: 'absolute', left: '120px', top: '35px', backgroundColor: "#e34a33", width: "9px", height: "35px", border: "2px solid #f5f4f3"}}></div>
      </div>
    </div>
  );
}

export default React.memo(Selection);
