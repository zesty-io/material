import React, { ChangeEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';

export interface FieldTypeUrlProps extends Omit<OutlinedTextFieldProps, 'variant'> {
   /**
   * Max length of the field
   * @default 2000
   */
  maxLength?: number;
  value: string;
}

const FieldTypeUrl = ({maxLength = 2000, value, helperText, InputProps, InputLabelProps, inputProps, ...props }: FieldTypeUrlProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
      <MuiTextField
        size="small"
        type='url'
        variant='outlined'
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <>{value.length}/{maxLength}</>
            </InputAdornment>
          ),
          // Spread props at the end to allow Input prop overrides
          ...InputProps,
        }}
        InputLabelProps={{
          shrink: true,
          // Spread props at the end to allow InputLabel prop overrides
          ...InputLabelProps,
        }}
        inputProps={{
          ref: inputRef,
          // Spread props at the end to allow inputProps prop overrides
          ...inputProps,
        }}
        error={(value && !inputRef.current?.validity.valid) || value.length > maxLength}
        helperText={value.length > maxLength ? 'Your input is over the specified limit' : (value && !inputRef.current?.validity.valid) ? 'Your input is not a valid url' : helperText}
        // Spread props at the end to allow prop overrides
        {...props}
      />
  );
};

export default FieldTypeUrl;
