import { MenuItem } from '@mui/material';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';

interface Option {
  label: string;
  value: any;
}

export interface FieldTypeDropdownProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  options: Option[];
}

const FieldTypeDropdown = ({InputLabelProps, options, ...props }: FieldTypeDropdownProps) => {

  return (
      <MuiTextField
        size="small"
        variant='outlined'
        select
        InputLabelProps={{
          shrink: true,
          // Spread props at the end to allow InputLabel prop overrides
          ...InputLabelProps,
        }}
        // Spread props at the end to allow prop overrides
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
  );
};

export default FieldTypeDropdown;
