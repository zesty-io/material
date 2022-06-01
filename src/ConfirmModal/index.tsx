import { ReactNode } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export interface ConfirmDialogProps extends Omit<DialogProps, 'title'> {
  /**
   * Title of confirm dialog
   */
  title: string | ReactNode ;
  /**
   * Content of confirm dialog
   */
  content: string | ReactNode ;
  /**
   * Callback of confirm dialog
   */
   callback: (confirmed: boolean) => void ;
}

const ConfirmDialog = ({title, content, onClose, children, callback, ...props }: ConfirmDialogProps) => {
  
  return (
    <Dialog
      {...props}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      {children ? <DialogActions>{children}</DialogActions> : (
        <DialogActions>
          <Button variant="contained" onClick={() => callback(false)}>No</Button>
          <Button variant="contained" onClick={() => callback(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmDialog;
