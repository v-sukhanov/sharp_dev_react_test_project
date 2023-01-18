import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import React, { memo, useState } from 'react';

export interface INewTransactionAmountInputProps {
	initialValue?: number;
	amountChange: (val: any) => void;
}

export const NewTransactionAmountInput = memo(({initialValue, amountChange}: INewTransactionAmountInputProps) => {
	return <NumericFormat value={initialValue} thousandSeparator=" "
      onValueChange={e => amountChange(e.floatValue ?? 0)}
      customInput={(props, context) => {
          return <TextField  {...props as any} label="PW amount" fullWidth variant="outlined"/>
      }}
	/>
})