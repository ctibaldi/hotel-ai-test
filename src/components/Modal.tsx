import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {Box, DialogTitle, useMediaQuery} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {makeStyles} from '@mui/styles';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const useStyles = makeStyles((theme: any) => {
  const appbarHeight = 64;
  return {
    root: {top: `${appbarHeight}px !important`},
  };
});

function SimpleDialog(props: any) {
  const {title, onClose, children, open, size} = props;

  const classes = useStyles();

  const matches = useMediaQuery('(min-width:600px)');

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      // className={classes.root}
      onClose={handleClose}
      open={open}
      maxWidth={size ? size : 'lg'}
      sx={{minHeight: {xs: '100vh', md: '70vh'}}}
      fullScreen={matches ? false : true}
      fullWidth>
      <CloseIcon
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          borderRadius: 10,
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#e2e2e2',
            transition: '300ms',
          },
        }}
        onClick={() => onClose(false)}
      />
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}

interface IProps {
  title: string;
  children: any;
  open: boolean;
  setOpen: (value: boolean) => void;
  size?: string;
}

export const Modal = (props: IProps) => {
  const {title, children, open, setOpen, size} = props;

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <Box sx={{p: 2, height: 0, mt: {xs: 0, md: -4}}}>
      <Typography variant="subtitle1" component="div">
        {title}
      </Typography>
      <br />
      <SimpleDialog size={size} title={title} open={open} onClose={handleClose}>
        {children}
      </SimpleDialog>
    </Box>
  );
};
