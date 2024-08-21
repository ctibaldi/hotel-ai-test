import {t} from '@/configs/translate/translate.service';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import envConfig from '@/configs/environments';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useSearch from '@/hooks/useSearch';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const useStyles = makeStyles((theme: any) => ({
  input: {
    background: 'rgb(255, 255, 255)',
    border: '1px solid #ccc',
    borderRadius: 5,
  },
}));

const ContactForm = (props: any) => {
  const {hotel} = props;
  const [status, setStatus] = useState(0);
  const [form, setForm] = useState<any>({
    hotelId: hotel?._id,
    hotelCode: hotel?.code,
    name: '',
    lastName: '',
    issue: '',
    phone: '',
    email: '',
    message: '',
  });

  const issues: any = useSearch({endpoint: `issue/${hotel?.lang}`});
  // ** Actions/Functions
  const handleChange = (value: any) => {
    setForm({...form, [value?.target?.name]: value?.target?.value});
  };

  const classes = useStyles();

  const validation = () => {
    if (
      !form?.name ||
      !form?.email ||
      !form?.message
      // ||      form?.message?.length < 10
    )
      return true;
    else return false;
  };

  const sendMessage = async () => {
    setStatus(1);
    const res = await fetch(
      `${envConfig.api}message/${hotel?.code}/${localStorage.getItem('lang')}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      },
    );
    if (!res.ok) setStatus(3); // rejected
    else {
      const result = await res.json();
      setStatus(2);
      setForm({
        hotelId: hotel?._id,
        hotelCode: hotel?.code,
        name: '',
        lastName: '',
        issue: '',
        phone: '',
        email: '',
        message: '',
      });
    }
    setTimeout(() => {
      setStatus(0);
    }, 3000);
  };

  return (
    <>
      {hotel?.phone && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            px: 2,
            pb: 3,
            mt: -1,
          }}>
          <LocalPhoneOutlinedIcon sx={{fontSize: 22, mr: 0.5}} />
          <Typography sx={{fontSize: 14}}>
            {t('propertyPhone')}: {hotel?.phone}
          </Typography>
        </Box>
      )}
      <Grid item xs={12} sx={{backgroundColor: '#ccc'}}>
        <Grid container spacing={1} sx={{pb: {xs: 5, md: 13}, px: 2}}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: 2,
              }}>
              <CheckCircleIcon
                sx={{fontSize: 18, mr: 0.5, mt: {xs: 0.1, md: 0}}}
              />
              <Typography sx={{fontSize: 13}}>
                {t('weDoNotMakeReservations')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: 0.5,
              }}>
              <CheckCircleIcon
                sx={{fontSize: 18, mr: 0.5, mt: {xs: 0.1, md: 0}}}
              />
              <Typography sx={{fontSize: 13}}>
                {t('discountCouponsAreNotRedeemable')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: 0.5,
              }}>
              <CheckCircleIcon
                sx={{fontSize: 18, mr: 0.5, mt: {xs: 0.1, md: 0}}}
              />
              <Typography sx={{fontSize: 13}}>
                {t('thisWebsiteIsNotOfficialWebsite')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label={t('issue')}
              type="text"
              required
              select
              fullWidth
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="issue"
              InputProps={{
                disableUnderline: true,
                className: classes.input,
              }}
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              value={form.issue}
              onChange={handleChange}>
              <MenuItem value={''} disabled>
                {t('selectAnOption')}
              </MenuItem>
              {issues?.values?.map((i: any) => (
                <MenuItem key={i._id} value={i._id}>
                  {i.text}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label={t('name')}
              type="text"
              required
              fullWidth
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="name"
              InputProps={{
                disableUnderline: true,
                className: classes.input,
              }}
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              value={form.name}
              onChange={handleChange}></TextField>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label={t('lastName')}
              type="text"
              required
              fullWidth
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="lastName"
              InputProps={{
                disableUnderline: true,
                className: classes.input,
              }}
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              value={form.lastName}
              onChange={handleChange}></TextField>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label={t('email')}
              type="email"
              fullWidth
              required
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="email"
              InputProps={{
                disableUnderline: true,
                className: classes.input,
              }}
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              value={form.email}
              onChange={handleChange}></TextField>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label={t('phone')}
              type="phone"
              fullWidth
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="phone"
              InputProps={{
                disableUnderline: true,
                className: classes.input,
              }}
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              value={form.phone}
              onChange={handleChange}></TextField>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              multiline
              rows={5}
              label={t('message')}
              type="text"
              fullWidth
              required
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="message"
              InputProps={{
                disableUnderline: true,
                className: classes.input,
              }}
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              value={form.message}
              onChange={handleChange}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={validation()}
              disableElevation
              onClick={() => sendMessage()}
              variant="contained"
              color={status !== 3 ? 'primary' : 'warning'}
              sx={{
                width: '100%',
                mt: 1,
                border: '1.5px solid white',
                minHeight: 55,
              }}
              size="large">
              {status == 0 ? (
                t('send')
              ) : status == 1 ? (
                <CircularProgress size={20} color="inherit" />
              ) : status == 2 ? (
                t('sent')
              ) : status == 3 ? (
                t('error')
              ) : (
                ''
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactForm;
