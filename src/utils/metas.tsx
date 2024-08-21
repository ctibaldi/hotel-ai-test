import envConfig from '@/configs/environments';

const portal: any =
  envConfig.portal == 'grancanaria' ? 'Gran Canaria' : envConfig.portal;

export const metaTags = [
  {
    lang: 'es',
    meta_description: `Búsqueda de alojamientos en ${portal?.toUpperCase()}`,
    meta_keywords: `${portal?.toUpperCase()}, hoteles, alojamientos`,
    meta_robots: 'index, follow',
    meta_twitter: {
      title: `COM ${envConfig.portal} - Búsqueda de Alojamientos en ${portal}`,
      description: `Encuentra los mejores hoteles y alojamientos en ${portal}`,
      image: '/favicon.png',
    },
  },
  {
    lang: 'en',
    meta_description: `Search for accommodations in ${portal?.toUpperCase()}`,
    meta_keywords: `${portal?.toUpperCase()}, hotels, accommodations`,
    meta_robots: 'index, follow',
    meta_canonical: `https://www.com-${portal}.com/en`,
    meta_alternate: `https://www.com-${portal}.com/`,
    meta_twitter: {
      title: `COM ${portal?.toUpperCase()} - Search for Accommodations in ${portal?.toUpperCase()}`,
      description: `Find the best hotels and accommodations in ${portal?.toUpperCase()}`,
      image: '/favicon.png',
    },
  },
  {
    lang: 'fr',
    meta_description: `Recherche d'hébergements à ${portal?.toUpperCase()}`,
    meta_keywords: `${portal?.toUpperCase()}, hôtels, hébergements`,
    meta_robots: 'index, follow',
    meta_twitter: {
      title: `COM ${portal?.toUpperCase()} - Recherche d'Hébergements à ${portal?.toUpperCase()}`,
      description: `Trouvez les meilleurs hôtels et hébergements à ${portal?.toUpperCase()}`,
      image: '/favicon.png',
    },
  },
  {
    lang: 'de',
    meta_description: `Unterkunftssuche auf ${portal?.toUpperCase()}`,
    meta_keywords: `${portal?.toUpperCase()}, hotels, unterkünfte`,
    meta_robots: 'index, follow',
    meta_twitter: {
      title: `COM ${portal?.toUpperCase()} - Unterkunftssuche auf Teneriffa`,
      description: `Finden Sie die besten Hotels und Unterkünfte auf ${portal?.toUpperCase()}`,
      image: '/favicon.png',
    },
  },
  {
    lang: 'it',
    meta_description: `Ricerca di alloggi a ${portal?.toUpperCase()}`,
    meta_keywords: `${portal?.toUpperCase()}, hotel, alloggi`,
    meta_robots: 'index, follow',
    meta_twitter: {
      title: `COM ${portal?.toUpperCase()} - Ricerca di Alloggi a ${portal?.toUpperCase()}`,
      description: `Trova i migliori hotel e alloggi a ${portal?.toUpperCase()}`,
      image: '/favicon.png',
    },
  },
  {
    lang: 'pt',
    meta_description: `Pesquisa de acomodações em ${portal?.toUpperCase()}`,
    meta_keywords: `${portal?.toUpperCase()}, hotéis, acomodações`,
    meta_robots: 'index, follow',
    meta_twitter: {
      title: `COM ${portal?.toUpperCase()} - Pesquisa de Acomodações em ${portal?.toUpperCase()}`,
      description: `Encontre os melhores hotéis e acomodações em ${portal?.toUpperCase()}`,
      image: '/favicon.png',
    },
  },
];
