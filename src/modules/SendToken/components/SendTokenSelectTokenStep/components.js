import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useController } from 'react-hook-form';

import Input from 'components/shared/toolBox/input';
import Picker from 'components/shared/Picker';
import { LabelButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import { fromRawLsk } from 'utilities/conversions';
import TokenSvg from 'assets/svgs/TokenSvg';

import getSendTokenSelectTokenStepStyles from './styles';
import { useAccountInfo } from '../../../Accounts/hooks/useAccounts/useAccountInfo';
import { useTokenAmountInCurrency } from './hooks';

export function TokenSelectField({
  form,
  tokens
}) {
  const currentAccountInfo = useAccountInfo();

  const { field } = useController({
    name: 'tokenID',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const normalizedBalance = fromRawLsk(currentAccountInfo.summary.balance);

  const selectedToken = tokens.data?.find(token => token.tokenID === field.value);

  return (
    <Picker value={field.value} onChange={field.onChange}>
      <View style={{ ...styles.row, justifyContent: 'space-between' }}>
        <Picker.Label>
          Token
        </Picker.Label>

        <Picker.Label>
          Bal: {' '}
          {/* TODO: Read token symbol from account info when backend send the data */}
          <Text style={[styles.balanceText]}>
            {normalizedBalance} {selectedToken?.symbol}
          </Text>
        </Picker.Label>
      </View>

      <Picker.Toggle
        disabled={tokens.isLoading || tokens.error}
        style={{ container: { marginBottom: 16 } }}
      >
        <View style={[styles.row]}>
          {tokens.isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <Text>{selectedToken?.symbol}</Text>
              <TokenSvg symbol={selectedToken?.symbol} style={styles.tokenSvg} />
            </>
          )}
        </View>
      </Picker.Toggle>

      <Picker.Menu>
        {tokens.data?.map(token => (
          <Picker.Item
            key={token.tokenID}
            value={token.tokenID}
          >
            <Text>{token.symbol}</Text>
            <TokenSvg symbol={token.symbol} style={styles.tokenSvg} />
          </Picker.Item>
        ))}
      </Picker.Menu>
    </Picker>
  );
}

export function TokenAmountField({
  form,
  tokens
}) {
  const { field } = useController({
    name: 'amount',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  const { tokenAmountInCurrency, currency } = useTokenAmountInCurrency(field.value);

  const selectedToken = tokens.data?.find(
    token => token.tokenID === form.watch('tokenID')
  );

  return (
    <Input
      label={`Amount (${selectedToken?.symbol})`}
      value={field.value}
      placeholder={`Add your amount of ${selectedToken?.symbol}`}
      keyboardType="numeric"
      onChange={field.onChange}
      adornments={{
        right: (
          <Text style={[styles.tokenAmountInCurrencyText]}>
            ~ {`${tokenAmountInCurrency} ${currency}`}
          </Text>
        )
      }}
      innerStyles={{
        containerStyle: {
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
          marginBottom: 16
        },
        inputLabel: {
          marginBottom: 8
        },
        input: {
          padding: 16
        }
      }}
    />
  );
}

export function SendTokenDescriptionField({ form }) {
  const [showInput, setShowInput] = useState(false);

  const { field } = useController({
    name: 'message',
    control: form.control,
  });

  if (!showInput) {
    return (
      <LabelButton
        onClick={() => setShowInput(true)}
        style={{ width: 178 }}
        textStyle={{ fontSize: 14, lineHeight: 0 }}
      >
        + Add message (Optional)
      </LabelButton>
    );
  }

  return (
    <Input
      label="Message (optional)"
      value={field.value}
      placeholder="Add an optional message"
      onChange={field.onChange}
      multiline
      innerStyles={{
        containerStyle: {
          paddingTop: 0,
          paddingRight: 0,
          paddingLeft: 0,
        },
        inputLabel: {
          marginBottom: 8
        },
        input: {
          padding: 16,
          minHeight: 80
        }
      }}
    />
  );
}
