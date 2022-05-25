import React, { ChangeEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { Button, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface FieldTypeSortProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  value: string;
}

const FieldTypeSort = ({value, InputProps, InputLabelProps, inputProps, sx, ...props }: FieldTypeSortProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
      <MuiTextField
        size="small"
        variant='outlined'
        type='number'
        value={value}
        sx={{
          width: 165,
           // Spread props at the end to allow sx prop overrides
          ...sx
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  if(inputRef.current) inputRef.current.value = String(+inputRef.current.value + 1)
                }}><AddIcon fontSize='small' />
              </Button>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  if(inputRef.current) inputRef.current.value = String(+inputRef.current.value - 1)
                }}><RemoveIcon fontSize='small' />
              </Button>
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
        // Spread props at the end to allow prop overrides
        {...props}
      />
  );
};

export default FieldTypeSort;


// const FieldTypeSort = ({InputProps, InputLabelProps, ...props }: FieldTypeSortProps) => {

//   return (
//       <MuiTextField
//         variant='outlined'
//         type='number'
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Button
//                 variant="contained"
//                 onClick={() => {
//                   callback(props.value + 1)
//                 }}>+</Button>
//             </InputAdornment>
//           ),
//           endAdornment: (
//             <InputAdornment position="end">
//               <Button
//                 variant="contained"
//                 onClick={() => {
//                   callback(props.value - 1)
//                 }}>-</Button>
//             </InputAdornment>
//           ),
//           // Spread props at the end to allow Input prop overrides
//           ...InputProps,
//         }}
//         InputLabelProps={{
//           shrink: true,
//           // Spread props at the end to allow InputLabel prop overrides
//           ...InputLabelProps,
//         }}
//         // Spread props at the end to allow prop overrides
//         {...props}
//       />
//   );
// };

// export default FieldTypeSort;