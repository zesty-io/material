import { MenuItem } from '@mui/material';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';

interface Option {
  label: string;
  value: any;
}

export interface FieldTypeDropdownProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  options: Option[];
}

const FieldTypeDropdown = ({label, options, ...props }: FieldTypeDropdownProps) => {

  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <MuiTextField
        size="small"
        variant='outlined'
        select
        SelectProps={{
          displayEmpty: true,
        }}
        {...props}
      >
        <MenuItem key={''} value={''}>
          - None -
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
      ))}
      </MuiTextField>
    </FormControl>
  );
};

export default FieldTypeDropdown;
