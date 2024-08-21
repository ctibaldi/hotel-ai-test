import {t} from '@/configs/translate/translate.service';
import ContactForm from '@/layouts/hotel/components/ContactForm';
import {Box, Container, Typography, colors} from '@mui/material';
import React from 'react';
import {Modal} from './Modal';
import envConfig from '@/configs/environments';

const Footer = ({section}: any) => {
  const [open, setOpen] = React.useState(false);
  const [openTerms, setOpenTerms] = React.useState(false);
  const [openPolicy, setOpenPolicy] = React.useState(false);
  const [hotel, setHotel] = React.useState<any>({});
  const [value, setValue] = React.useState(
    typeof window !== 'undefined' ? navigator?.language?.slice(0, 2) : 'en',
  );
  const items = [
    {
      title: 'cookies',
      action: () => setOpenTerms(true),
    },
    {title: 'privacy', action: () => setOpenPolicy(true)},
    {title: 'customerSupport', action: () => setOpen(true)},
  ];

  React.useEffect(() => {
    if (typeof window != 'undefined') {
      setValue(localStorage.getItem('lang') ?? '');
      if (
        localStorage.getItem('hotel') &&
        localStorage.getItem('hotel') !== 'undefined'
      )
        setHotel(JSON.parse(localStorage.getItem('hotel') ?? ''));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  const portals = [
    {
      title: 'COM Tenerife',
      href: 'https://com-tenerife.com',
      portal: 'tenerife',
    },
    {
      title: 'COM Gran Canaria',
      href: 'https://com-grancanaria.com',
      portal: 'grancanaria',
    },
    {
      title: 'COM Lanzarote',
      href: 'https://com-lanzarote.com',
      portal: 'lanzarote',
    },
  ];

  return (
    <div>
      <Box sx={{backgroundColor: colors.grey['A700'], minHeight: 200, py: 3}}>
        <Container maxWidth="lg">
          {items?.map((item: any, index: number) => (
            <ul style={{color: 'white', paddingLeft: 20}} key={Math.random()}>
              <li>
                <span onClick={() => item.action()} style={{cursor: 'pointer'}}>
                  {t(item.title)}
                </span>
              </li>
            </ul>
          ))}

          <Box sx={{py: 3, pt: 0, fontSize: '0.9rem'}}>
            <span style={{color: 'white'}}>{t('warning')}</span>
          </Box>
          <Box sx={{fontSize: '0.9rem'}}>
            <Typography
              style={{color: 'white'}}
              dangerouslySetInnerHTML={{
                __html: t('allRightsReserved'),
              }}></Typography>
          </Box>
          <Box sx={{display: 'flex', mt: -1}}>
            {portals
              .filter((i: any) => i.portal !== envConfig.portal)
              ?.map((item: any, index: number) => (
                <ul
                  style={{color: 'white', paddingLeft: 0, marginRight: 20}}
                  key={Math.random()}>
                  <dl>
                    <a
                      href={item.href}
                      style={{cursor: 'pointer', color: 'white'}}>
                      {t(item.title)}
                    </a>
                  </dl>
                </ul>
              ))}
          </Box>
        </Container>
      </Box>
      {open && (
        <Modal title={t('customerSupport')} open={open} setOpen={setOpen}>
          <ContactForm hotel={hotel}></ContactForm>
        </Modal>
      )}
      {openTerms && (
        <Modal title={t('cookies')} open={openTerms} setOpen={setOpenTerms}>
          <Box sx={{p: 3, pt: 0}}>
            <Typography
              dangerouslySetInnerHTML={{__html: t('cookiesText')}}></Typography>
          </Box>
        </Modal>
      )}
      {openPolicy && (
        <Modal title={t('privacy')} open={openPolicy} setOpen={setOpenPolicy}>
          <Box sx={{p: 3, pt: 0}}>
            <Typography
              dangerouslySetInnerHTML={{__html: t('privacyText')}}></Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Footer;
