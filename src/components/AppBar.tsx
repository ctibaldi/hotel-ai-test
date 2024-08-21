import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  Container,
  FormControl,
  ListItemIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import {t} from '@/configs/translate/translate.service';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useRouter} from 'next/router';
import {Modal} from './Modal';
import ContactForm from '@/layouts/hotel/components/ContactForm';
import Image from 'next/image';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  title?: string;
  section?: string;
  lang?: string;
}

const imageLoader = ({src, width, quality}: any) => {
  return src;
};

const drawerWidth = '100%';

export default function DrawerAppBar(props: Props) {
  const {title, section, lang} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hotel, setHotel] = React.useState<any>({});
  const router = useRouter();

  const [value, setValue] = React.useState('en');

  console.log(value);
  React.useEffect(() => {
    console.log('Estoy aca o no?');
    if (lang) setValue(lang?.toLocaleLowerCase());
    if (navigator) {
      const langExist = localStorage.getItem('lang');
      console.log('lang', lang);
      if (lang) setValue(lang?.toLocaleLowerCase());
      else if (langExist) setValue(langExist);
      else setValue(navigator?.language?.slice(0, 2) || 'en');
    }

    if (
      section !== 'home' &&
      localStorage.getItem('hotel') &&
      localStorage.getItem('hotel') !== 'undefined'
    )
      setHotel(JSON.parse(localStorage.getItem('hotel') ?? ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    localStorage.setItem('lang', event.target.value);

    router.push(`/${event.target.value}`);
  };

  // React.useEffect(() => {
  //   localStorage.setItem('lang', value);
  // }, [value]);

  const LangComponent = () => {
    const langs = [
      {lang: 'en', text: '🇬🇧 English'},
      {lang: 'es', text: '🇪🇸 Español'},
      {lang: 'fr', text: '🇫🇷 Français'},
      {lang: 'it', text: '🇮🇹 Italiano'},
      {lang: 'pt', text: '🇵🇹 Português'},
      {lang: 'de', text: '🇩🇪 Deutsch'},
    ];

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Typography sx={{mr: 2, fontSize: {xs: 16, md: 14}}}>
          {t('lang')}
        </Typography>
        <FormControl fullWidth size="small" sx={{mr: 10}}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={handleChange}>
            {langs.map((l: any, index: number) => (
              <MenuItem key={index} value={l.lang}>
                {l.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

  const navItems: any = [
    {
      icon: <TranslateIcon />,
      text: <LangComponent />,
    },
    section !== 'home' && {
      icon: <HelpOutlineOutlinedIcon />,
      text: (
        <Typography
          sx={{fontSize: {xs: 16, md: 14}}}
          onClick={() => setOpen(true)}>
          {t('customerSupport')}
        </Typography>
      ),
    },
    {
      icon: hotel?.phone ? <LocalPhoneOutlinedIcon /> : <></>,
      text: t(hotel?.phone),
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box sx={{textAlign: 'center'}}>
      <Box
        onClick={handleDrawerToggle}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          px: 2,
        }}>
        <Typography variant="h6" sx={{my: 2}}>
          {title}
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ml: 0, display: {sm: 'none'}, color: '#000'}}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </Box>

      <Divider />
      <List>
        {navItems?.map((item: any) => (
          <ListItem key={Math.random()} disablePadding>
            <ListItemButton sx={{textAlign: 'start'}}>
              <ListItemIcon sx={{mr: -2, color: 'black'}}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar component="nav" sx={{backgroundColor: 'white'}}>
          <Container sx={{}}>
            <Toolbar sx={{backgroundColor: 'white', mx: -2}}>
              <Image
                loader={imageLoader}
                src="/logo.png"
                width={40}
                height={40}
                alt="Picture of the author"
                style={{marginRight: 5}}
              />
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'block',
                    sm: 'block',
                    fontSize: {xs: 12, sm: 14},
                  },
                  color: '#000',
                }}>
                {title?.split('-')[0]?.trim()}
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ml: 0, display: {sm: 'none'}, color: '#000'}}>
                <MenuIcon />
              </IconButton>
              <Box sx={{display: {xs: 'none', sm: 'block', textAlign: 'end'}}}>
                <Button sx={{color: '#000', textAlign: 'start'}}>
                  <LangComponent />
                </Button>
                <Button sx={{color: '#000', textAlign: 'start'}}>
                  <Typography
                    sx={{fontSize: {xs: 16, md: 14}}}
                    onClick={() => setOpen(true)}>
                    {t('customerSupport')}
                  </Typography>
                </Button>
                {hotel?.phone ? (
                  <Button sx={{color: '#000', textAlign: 'start'}}>
                    <LocalPhoneOutlinedIcon />
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box component="nav">
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {xs: 'block', sm: 'none'},

              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
        </Box>
      </Box>
      {open && (
        <Modal title={t('customerSupport')} open={open} setOpen={setOpen}>
          <ContactForm hotel={hotel}></ContactForm>
        </Modal>
      )}
    </>
  );
}
