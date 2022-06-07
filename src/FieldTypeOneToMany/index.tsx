import { useState } from 'react';
import { AutocompleteProps, Popper, styled, TextField, TextFieldProps } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { ListboxComponent } from '../utils/virtualization';

export interface FieldTypeOneToManyProps extends Omit<AutocompleteProps<any, false, false, false>, 'onOpen' | 'renderInput'> {
  /**
   * Props passed to TextField component
   */
  textFieldProps?: TextFieldProps;
  /**
   * Callback to be fired upon opening the dropdown
   */
   onOpen: () => Promise<any>;
}

const FieldTypeOneToMany = ({textFieldProps, onOpen, ...props }: FieldTypeOneToManyProps) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    if (!loaded && onOpen) {
      onOpen().then(() => {
        setLoading(false);
      });

      setLoaded(true);
    }
  };

  return (
    <Autocomplete
      onOpen={handleOpen}
      loading={loading}
      fullWidth
      multiple
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      renderOption={(props, option) => [props, option]}
      {...props}
    />
  );
};

export default FieldTypeOneToMany;

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});