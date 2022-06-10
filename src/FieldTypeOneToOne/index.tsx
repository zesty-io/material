import { ReactNode, useState } from 'react';
import { AutocompleteProps, Popper, styled, TextField, FormLabel, FormControl, InputAdornment } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { ListboxComponent } from '../utils/virtualization';

export interface FieldTypeOneToOneProps extends Omit<AutocompleteProps<any, false, false, false>, 'onOpen' | 'renderInput'> {
  label?: string;
  helperText?: string;
  placeholder?: string;
  error?: boolean;
  required?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  /**
   * Callback to be fired upon opening the dropdown
   */
  onOpen?: () => Promise<any>;
  /**
   * Structure for option
   */
  options: {
    /**
     * Component to be rendered in the dropdown
     */
    component: ReactNode | string;
    /**
     * Value of option
     */
    value: string;
    /**
     * Label that should display in the input when selected
     */
    inputLabel: string;
  }[]
}

const FieldTypeOneToOne = ({label, helperText, placeholder, error, onOpen, options, required, startAdornment, endAdornment, ...props }: FieldTypeOneToOneProps) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    if (!loaded && onOpen) {
      onOpen().then(() => {
        setLoading(false);
      });
      setLoading(true);
      setLoaded(true);
    }
  };

  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        onOpen={handleOpen}
        loading={loading}
        fullWidth
        disableListWrap
        disableClearable
        disablePortal
        size='small'
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={helperText}
            error={error}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: <InputAdornment position='end'>{startAdornment}</InputAdornment>,
              endAdornment: <>{params.InputProps.endAdornment}<InputAdornment sx={{ position: 'relative', right: '40px'}} position='end'>{endAdornment}</InputAdornment></>
            }}
          />
        )}
        options={loading ? [] : options}
        getOptionLabel={(option) => option.inputLabel}
        renderOption={(props, option) => [props, option.component]}
        {...props}
      />
    </FormControl>
  );
};

export default FieldTypeOneToOne;

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});