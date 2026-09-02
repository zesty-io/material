import { ReactNode } from "react";
import {
  AutocompleteProps,
  Popper,
  styled,
  TextField,
  InputAdornment,
} from "@mui/material";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import { ListboxComponent } from "../utils/virtualization";

interface VirtualizedAutocompleteOption {
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
}

// MUI's Autocomplete generics don't cleanly unify with a narrowed option
// type across getOptionLabel/renderOption; kept as `any` to match the
// actual (loosely-typed) usage below rather than reworking the
// Autocomplete generics as part of this change.
export interface VirtualizedAutocompleteProps extends Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AutocompleteProps<any, false, false, false>,
  "renderInput"
> {
  helperText?: string;
  placeholder?: string;
  error?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  /**
   * Structure for option
   */
  options: VirtualizedAutocompleteOption[];
}

const VirtualizedAutocomplete = ({
  helperText,
  placeholder,
  error,
  startAdornment,
  endAdornment,
  ...props
}: VirtualizedAutocompleteProps) => {
  return (
    <Autocomplete
      fullWidth
      disableListWrap
      size="small"
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
            startAdornment: (
              <InputAdornment position="end">{startAdornment}</InputAdornment>
            ),
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                <InputAdornment
                  sx={{ position: "relative", right: "40px" }}
                  position="end"
                >
                  {endAdornment}
                </InputAdornment>
              </>
            ),
          }}
        />
      )}
      getOptionLabel={(option) => option.inputLabel}
      renderOption={(props, option) => [props, option.component]}
      {...props}
    />
  );
};

export default VirtualizedAutocomplete;

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});
