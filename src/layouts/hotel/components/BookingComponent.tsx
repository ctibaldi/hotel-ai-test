import {t} from '@/configs/translate/translate.service';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import 'moment/locale/es';
import {makeStyles} from '@mui/styles';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import envConfig from '@/configs/environments';

const useStyles = makeStyles((theme: any) => ({
  input: {
    background: 'rgb(255, 255, 255)',
  },
}));

const BookingComponent = (props: any) => {
  const {hotel, lang, data} = props;

  // ** Constants
  const ages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const adults = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const tomorrow = new Date().setDate(new Date().getDate() + 1);

  const pastTomorrow = new Date().setDate(new Date().getDate() + 2);

  // ** States
  const [child, setChild] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [agesChildren, setAgesChildren] = useState<any>({});
  const [availability, setAvailability] = useState<any>(null);
  const [form, setForm] = useState<any>({
    entryDate: new Date(tomorrow).toISOString().slice(0, 10),
    departureDate: new Date(pastTomorrow).toISOString().slice(0, 10),
    adults: 2,
    children: 0,
    agesChildren: {},
  });

  // ** Rendering
  useEffect(() => {
    /** * If entry date changing, change departure date */
    let date = new Date(
      new Date(form?.entryDate || new Date()).setDate(
        new Date(form?.entryDate || new Date()).getDate() + 1,
      ),
    )
      .toISOString()
      .slice(0, 10);
    setForm({
      ...form,
      departureDate: date,
    });
  }, [form.entryDate]);

  useEffect(() => {
    let aux: any = form;
    setChild([...adults, form?.children]?.slice(0, form?.children));
    for (const r of [...adults, form?.children]?.slice(0, form?.children))
      !aux?.agesChildren[r] ? (aux.agesChildren[r] = 0) : null;
    const largeChildren: any = Object.values(aux?.agesChildren)?.slice(
      0,
      form?.children,
    );
    let auxChildren: any = {};
    for (const [i, c] of largeChildren.entries()) auxChildren[c] = c;
    setForm({...form, agesChildren});
  }, [form?.children]);

  // ** Actions/Functions
  const handleChange = (value: any) => {
    setForm({...form, [value?.target?.name]: value?.target?.value});
  };

  const handleChangeAges = (value: any, index: any) => {
    setAgesChildren({...agesChildren, [index]: value?.target?.textContent});
    setForm({
      ...form,
      agesChildren: {
        ...form?.agesChildren,
        [index]: value?.target?.textContent,
      },
    });
  };

  const validation = () => {
    if (!form?.entryDate || !form.departureDate || form.adults == 0)
      return true;
    else return false;
  };

  const booking = async () => {
    setLoading(true);
    let url = `https://bookingtravel.com-tenerife.com/online/hotels/direct_search?`;
    url = url + `language_code=${lang.toLowerCase()}`;
    url =
      url +
      `&occupancy=[{"adults":${form.adults},"children":${
        form.children
      },"ages":[${Object.values(form.agesChildren)}]}]`;
    url = url + `&checkin=${form.entryDate}`;
    url =
      url +
      `&nights=${
        (new Date(form.departureDate).getTime() -
          new Date(form.entryDate).getTime()) /
        60 /
        60 /
        24 /
        1000
      }`;
    url = url + `&hotel_code=${data?.ot}`;
    url = url + `&trackpurchase=${window.location.href}`;
    url = url + `&redirect_hotel_page=1`;
    window.open(url, '_blank');
    setLoading(false);
  };

  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        ml: {xs: -1, md: 0},
      }}>
      <Box
        sx={{
          backgroundColor: 'hsl(191.71deg 43.16% 81.37%)',
          m: {xs: 1, md: 2},
          mt: {xs: -7, md: 0},
          mr: {xs: -1, md: 0},
          borderRadius: {xs: 0, md: 2},
          p: 2,
          width: '100%',
        }}>
        <Typography component="h2" variant="h6" sx={{pt: 0, fontSize: 24}}>
          {t('onlineBooking')}
        </Typography>
        <Typography
          component="h2"
          variant="h6"
          sx={{
            pt: 0,
            fontSize: 16,
            mt: -0.5,
          }}>
          {t('bestPriceWarranty')}
        </Typography>
        <Grid container spacing={1} sx={{mt: 0}}>
          <Grid item xs={6}>
            <TextField
              label={t('entryDate')}
              type="date"
              InputLabelProps={{shrink: true}}
              InputProps={{
                inputProps: {min: new Date()?.toISOString().slice(0, 10)},
                disableUnderline: false,
                onKeyDown: e => e.preventDefault(),
                className: classes.input,
              }}
              fullWidth
              autoComplete="off"
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              margin="dense"
              variant="filled"
              name="entryDate"
              required
              value={form.entryDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            {/* <LocalizationProvider
            adapterLocale={'es'}
            dateAdapter={AdapterMoment}>
            <DatePicker
              format="ddd, DD MMM YYYY"
              label={t('departureDate')}
              views={['day', 'month', 'year']}
              // value={form.departureDate as string}
              onChange={handleChange}
            />
          </LocalizationProvider> */}
            <TextField
              label={t('departureDate')}
              type="date"
              InputLabelProps={{shrink: true}}
              InputProps={{
                inputProps: {
                  min: new Date(
                    new Date(form?.entryDate || new Date()).setDate(
                      new Date(form?.entryDate || new Date()).getDate() + 1,
                    ),
                  )
                    ?.toISOString()
                    .slice(0, 10),
                },
                disableUnderline: false,
                onKeyDown: e => e.preventDefault(),
                className: classes.input,
              }}
              fullWidth
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="departureDate"
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              required
              value={form.departureDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t('adults')}
              type="number"
              select
              fullWidth
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="adults"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
                disableUnderline: false,
                className: classes.input,
              }}
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              value={form.adults}
              onChange={handleChange}>
              {adults?.map((age: any) => (
                <MenuItem key={Math.random()} value={age}>
                  {age}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t('children')}
              select
              type="number"
              fullWidth
              autoComplete="off"
              margin="dense"
              variant="filled"
              name="children"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmojiPeopleIcon />
                  </InputAdornment>
                ),
                disableUnderline: false,
                className: classes.input,
              }}
              sx={{mb: 0, backgroundColor: '#fff', borderRadius: 1}}
              value={form.children}
              onChange={handleChange}>
              {adults.slice(0, 11)?.map((age: any) => (
                <MenuItem key={Math.random()} value={age}>
                  {age}
                </MenuItem>
              ))}
            </TextField>
            {/* </FormControl> */}
          </Grid>
          {form?.children > 0 && (
            <>
              <Grid item xs={12}>
                <Typography>{t('childrenAgeOnDepartureDate')}</Typography>
              </Grid>
              {child?.map((a: any, index: number) => (
                <Grid item xs={3} key={index}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="demo-simple-select-label">
                      {`${t('child')} ${index + 1}`}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      disableUnderline={false}
                      value={agesChildren[index]}
                      label="Categoria"
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: 1,
                        color: 'dark',
                        maxHeight: 100,
                      }}
                      onClick={(value: any) => handleChangeAges(value, index)}>
                      {ages?.map((age: any) => (
                        <MenuItem key={Math.random()} value={age}>
                          {age}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))}
            </>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              disabled={validation()}
              onClick={() => booking()}
              disableElevation
              sx={{
                width: '100%',
                mt: 1,
                border: '1.5px solid white',
                minHeight: 55,
              }}
              size="large">
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                t('searchAvailability')
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Box
              sx={{
                mt: 1,
                backgroundColor: 'rgb(255,255,255,0.6)',
                px: 2,
                py: 0.5,
                borderRadius: 1.5,
                border: '1px solid #aaa',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Box>
                <Typography sx={{fontSize: {xs: 13, md: 16}}}>
                  {t('bookOnOurSite')}
                </Typography>
                <Typography sx={{fontSize: {xs: 13, md: 14}}}>
                  {t('upToTenLess')}
                </Typography>
                <Typography sx={{fontSize: {xs: 13, md: 14}}}>
                  {t('freeCancelation')}
                </Typography>
              </Box>
              <Box sx={{p: 0, mr: -1}}>
                <EmojiEventsOutlinedIcon
                  sx={{
                    fontSize: 70,
                    p: 0,
                    m: 0,
                    backgroundColor: 'transparent',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default BookingComponent;
