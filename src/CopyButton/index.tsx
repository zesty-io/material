import { useCallback, useState, useEffect } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

export interface CopyButtonProps extends ButtonProps {
  /**
   * Value to be copied to clipboard
   */
  value: string;
}

const CopyButton = ({ value, sx, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyValue = useCallback(() => {
    navigator?.clipboard.writeText(value);
    setCopied(true);
  }, [value]);

  useEffect(() => {
    const iconTimer = setTimeout(() => {
      setCopied(false);
    }, 500);

    return () => {
      clearTimeout(iconTimer);
    };
  }, [copied]);

  return (
    <Button
      variant='outlined'
      onClick={copyValue}
      size='small'
      title={props.children ? `Copy ${props.children}` : `Copy ${value}`}
      sx={{
        textTransform: 'unset',
        // Spread sx prop at the end to allow sx prop overrides
        ...sx,
      }}
      // Spread props at the end to allow prop overrides
      {...props}
    >
      {copied ? (
        <CheckIcon color='success' fontSize='small' sx={{ mr: 1 }} />
      ) : (
        <ContentCopyIcon fontSize='small' sx={{ mr: 1 }} />
      )}
      {props.children ? props.children : value}
    </Button>
  );
};

export default CopyButton;
