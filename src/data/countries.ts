export interface Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  sources: NewsSource[];
  timezone: string;
  language: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  category: 'general' | 'tech' | 'business' | 'politics' | 'science';
  language: string;
  region: string;
}

export const COUNTRIES: Country[] = [
  // North America
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    region: 'North America',
    timezone: 'America/New_York',
    language: 'en',
    sources: [
      { id: 'cnn', name: 'CNN', url: 'https://www.cnn.com', category: 'general', language: 'en', region: 'us' },
      { id: 'nyt', name: 'The New York Times', url: 'https://www.nytimes.com', category: 'general', language: 'en', region: 'us' },
      { id: 'wapo', name: 'Washington Post', url: 'https://www.washingtonpost.com', category: 'general', language: 'en', region: 'us' },
      { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com', category: 'tech', language: 'en', region: 'us' },
      { id: 'reuters-us', name: 'Reuters US', url: 'https://www.reuters.com', category: 'general', language: 'en', region: 'us' },
      { id: 'ap', name: 'Associated Press', url: 'https://apnews.com', category: 'general', language: 'en', region: 'us' }
    ]
  },
  {
    id: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America',
    timezone: 'America/Toronto',
    language: 'en',
    sources: [
      { id: 'cbc', name: 'CBC News', url: 'https://www.cbc.ca/news', category: 'general', language: 'en', region: 'ca' },
      { id: 'globe-mail', name: 'The Globe and Mail', url: 'https://www.theglobeandmail.com', category: 'general', language: 'en', region: 'ca' },
      { id: 'national-post', name: 'National Post', url: 'https://nationalpost.com', category: 'general', language: 'en', region: 'ca' },
      { id: 'ctv', name: 'CTV News', url: 'https://www.ctvnews.ca', category: 'general', language: 'en', region: 'ca' }
    ]
  },
  {
    id: 'mx',
    name: 'Mexico',
    flag: '🇲🇽',
    region: 'North America',
    timezone: 'America/Mexico_City',
    language: 'es',
    sources: [
      { id: 'el-universal', name: 'El Universal', url: 'https://www.eluniversal.com.mx', category: 'general', language: 'es', region: 'mx' },
      { id: 'reforma', name: 'Reforma', url: 'https://www.reforma.com', category: 'general', language: 'es', region: 'mx' },
      { id: 'milenio', name: 'Milenio', url: 'https://www.milenio.com', category: 'general', language: 'es', region: 'mx' },
      { id: 'excelsior', name: 'Excélsior', url: 'https://www.excelsior.com.mx', category: 'general', language: 'es', region: 'mx' }
    ]
  },

  // Europe
  {
    id: 'gb',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    timezone: 'Europe/London',
    language: 'en',
    sources: [
      { id: 'bbc', name: 'BBC News', url: 'https://www.bbc.com/news', category: 'general', language: 'en', region: 'gb' },
      { id: 'guardian', name: 'The Guardian', url: 'https://www.theguardian.com', category: 'general', language: 'en', region: 'gb' },
      { id: 'reuters-uk', name: 'Reuters UK', url: 'https://uk.reuters.com', category: 'general', language: 'en', region: 'gb' },
      { id: 'sky-news', name: 'Sky News', url: 'https://news.sky.com', category: 'general', language: 'en', region: 'gb' },
      { id: 'independent', name: 'The Independent', url: 'https://www.independent.co.uk', category: 'general', language: 'en', region: 'gb' }
    ]
  },
  {
    id: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    timezone: 'Europe/Berlin',
    language: 'de',
    sources: [
      { id: 'dw', name: 'Deutsche Welle', url: 'https://www.dw.com', category: 'general', language: 'de', region: 'de' },
      { id: 'spiegel', name: 'Der Spiegel', url: 'https://www.spiegel.de', category: 'general', language: 'de', region: 'de' },
      { id: 'faz', name: 'Frankfurter Allgemeine', url: 'https://www.faz.net', category: 'general', language: 'de', region: 'de' },
      { id: 'sueddeutsche', name: 'Süddeutsche Zeitung', url: 'https://www.sueddeutsche.de', category: 'general', language: 'de', region: 'de' }
    ]
  },
  {
    id: 'fr',
    name: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    timezone: 'Europe/Paris',
    language: 'fr',
    sources: [
      { id: 'le-monde', name: 'Le Monde', url: 'https://www.lemonde.fr', category: 'general', language: 'fr', region: 'fr' },
      { id: 'france24', name: 'France 24', url: 'https://www.france24.com', category: 'general', language: 'fr', region: 'fr' },
      { id: 'le-figaro', name: 'Le Figaro', url: 'https://www.lefigaro.fr', category: 'general', language: 'fr', region: 'fr' },
      { id: 'liberation', name: 'Libération', url: 'https://www.liberation.fr', category: 'general', language: 'fr', region: 'fr' }
    ]
  },
  {
    id: 'es',
    name: 'Spain',
    flag: '🇪🇸',
    region: 'Europe',
    timezone: 'Europe/Madrid',
    language: 'es',
    sources: [
      { id: 'el-pais', name: 'El País', url: 'https://elpais.com', category: 'general', language: 'es', region: 'es' },
      { id: 'el-mundo', name: 'El Mundo', url: 'https://www.elmundo.es', category: 'general', language: 'es', region: 'es' },
      { id: 'abc', name: 'ABC', url: 'https://www.abc.es', category: 'general', language: 'es', region: 'es' },
      { id: 'la-vanguardia', name: 'La Vanguardia', url: 'https://www.lavanguardia.com', category: 'general', language: 'es', region: 'es' }
    ]
  },
  {
    id: 'it',
    name: 'Italy',
    flag: '🇮🇹',
    region: 'Europe',
    timezone: 'Europe/Rome',
    language: 'it',
    sources: [
      { id: 'la-repubblica', name: 'La Repubblica', url: 'https://www.repubblica.it', category: 'general', language: 'it', region: 'it' },
      { id: 'corriere', name: 'Corriere della Sera', url: 'https://www.corriere.it', category: 'general', language: 'it', region: 'it' },
      { id: 'ansa', name: 'ANSA', url: 'https://www.ansa.it', category: 'general', language: 'it', region: 'it' },
      { id: 'il-sole-24-ore', name: 'Il Sole 24 Ore', url: 'https://www.ilsole24ore.com', category: 'business', language: 'it', region: 'it' }
    ]
  },
  {
    id: 'nl',
    name: 'Netherlands',
    flag: '🇳🇱',
    region: 'Europe',
    timezone: 'Europe/Amsterdam',
    language: 'nl',
    sources: [
      { id: 'nos', name: 'NOS', url: 'https://nos.nl', category: 'general', language: 'nl', region: 'nl' },
      { id: 'nrc', name: 'NRC', url: 'https://www.nrc.nl', category: 'general', language: 'nl', region: 'nl' },
      { id: 'volkskrant', name: 'De Volkskrant', url: 'https://www.volkskrant.nl', category: 'general', language: 'nl', region: 'nl' },
      { id: 'telegraaf', name: 'De Telegraaf', url: 'https://www.telegraaf.nl', category: 'general', language: 'nl', region: 'nl' }
    ]
  },
  {
    id: 'se',
    name: 'Sweden',
    flag: '🇸🇪',
    region: 'Europe',
    timezone: 'Europe/Stockholm',
    language: 'sv',
    sources: [
      { id: 'svt', name: 'SVT Nyheter', url: 'https://www.svt.se/nyheter', category: 'general', language: 'sv', region: 'se' },
      { id: 'aftonbladet', name: 'Aftonbladet', url: 'https://www.aftonbladet.se', category: 'general', language: 'sv', region: 'se' },
      { id: 'dn', name: 'Dagens Nyheter', url: 'https://www.dn.se', category: 'general', language: 'sv', region: 'se' },
      { id: 'sydsvenskan', name: 'Sydsvenskan', url: 'https://www.sydsvenskan.se', category: 'general', language: 'sv', region: 'se' }
    ]
  },
  {
    id: 'no',
    name: 'Norway',
    flag: '🇳🇴',
    region: 'Europe',
    timezone: 'Europe/Oslo',
    language: 'no',
    sources: [
      { id: 'nrk', name: 'NRK', url: 'https://www.nrk.no', category: 'general', language: 'no', region: 'no' },
      { id: 'aftenposten', name: 'Aftenposten', url: 'https://www.aftenposten.no', category: 'general', language: 'no', region: 'no' },
      { id: 'vg', name: 'VG', url: 'https://www.vg.no', category: 'general', language: 'no', region: 'no' },
      { id: 'dagbladet', name: 'Dagbladet', url: 'https://www.dagbladet.no', category: 'general', language: 'no', region: 'no' }
    ]
  },
  {
    id: 'fi',
    name: 'Finland',
    flag: '🇫🇮',
    region: 'Europe',
    timezone: 'Europe/Helsinki',
    language: 'fi',
    sources: [
      { id: 'hs', name: 'Helsingin Sanomat', url: 'https://www.hs.fi', category: 'general', language: 'fi', region: 'fi' },
      { id: 'yle', name: 'Yle', url: 'https://yle.fi', category: 'general', language: 'fi', region: 'fi' },
      { id: 'iltalehti', name: 'Iltalehti', url: 'https://www.iltalehti.fi', category: 'general', language: 'fi', region: 'fi' },
      { id: 'mtv', name: 'MTV Uutiset', url: 'https://www.mtvuutiset.fi', category: 'general', language: 'fi', region: 'fi' }
    ]
  },
  {
    id: 'ch',
    name: 'Switzerland',
    flag: '🇨🇭',
    region: 'Europe',
    timezone: 'Europe/Zurich',
    language: 'de',
    sources: [
      { id: 'swissinfo', name: 'SwissInfo', url: 'https://www.swissinfo.ch', category: 'general', language: 'de', region: 'ch' },
      { id: 'tages-anzeiger', name: 'Tages-Anzeiger', url: 'https://www.tagesanzeiger.ch', category: 'general', language: 'de', region: 'ch' },
      { id: 'nzz', name: 'Neue Zürcher Zeitung', url: 'https://www.nzz.ch', category: 'general', language: 'de', region: 'ch' },
      { id: 'le-temps', name: 'Le Temps', url: 'https://www.letemps.ch', category: 'general', language: 'fr', region: 'ch' }
    ]
  },
  {
    id: 'ie',
    name: 'Ireland',
    flag: '🇮🇪',
    region: 'Europe',
    timezone: 'Europe/Dublin',
    language: 'en',
    sources: [
      { id: 'irish-times', name: 'The Irish Times', url: 'https://www.irishtimes.com', category: 'general', language: 'en', region: 'ie' },
      { id: 'rte', name: 'RTÉ News', url: 'https://www.rte.ie/news', category: 'general', language: 'en', region: 'ie' },
      { id: 'independent-ie', name: 'Irish Independent', url: 'https://www.independent.ie', category: 'general', language: 'en', region: 'ie' },
      { id: 'examiner', name: 'Irish Examiner', url: 'https://www.irishexaminer.com', category: 'general', language: 'en', region: 'ie' }
    ]
  },
  {
    id: 'pl',
    name: 'Poland',
    flag: '🇵🇱',
    region: 'Europe',
    timezone: 'Europe/Warsaw',
    language: 'pl',
    sources: [
      { id: 'gazeta', name: 'Gazeta Wyborcza', url: 'https://wyborcza.pl', category: 'general', language: 'pl', region: 'pl' },
      { id: 'tvn24', name: 'TVN24', url: 'https://tvn24.pl', category: 'general', language: 'pl', region: 'pl' },
      { id: 'rp', name: 'Rzeczpospolita', url: 'https://www.rp.pl', category: 'general', language: 'pl', region: 'pl' },
      { id: 'onet', name: 'Onet', url: 'https://www.onet.pl', category: 'general', language: 'pl', region: 'pl' }
    ]
  },

  // Asia
  {
    id: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    region: 'Asia',
    timezone: 'Asia/Tokyo',
    language: 'ja',
    sources: [
      { id: 'nhk', name: 'NHK News', url: 'https://www3.nhk.or.jp/news', category: 'general', language: 'ja', region: 'jp' },
      { id: 'asahi', name: 'Asahi Shimbun', url: 'https://www.asahi.com', category: 'general', language: 'ja', region: 'jp' },
      { id: 'nikkei', name: 'Nikkei', url: 'https://www.nikkei.com', category: 'business', language: 'ja', region: 'jp' },
      { id: 'mainichi', name: 'Mainichi Shimbun', url: 'https://mainichi.jp', category: 'general', language: 'ja', region: 'jp' }
    ]
  },
  {
    id: 'kr',
    name: 'South Korea',
    flag: '🇰🇷',
    region: 'Asia',
    timezone: 'Asia/Seoul',
    language: 'ko',
    sources: [
      { id: 'korea-herald', name: 'The Korea Herald', url: 'http://www.koreaherald.com', category: 'general', language: 'en', region: 'kr' },
      { id: 'yonhap', name: 'Yonhap News', url: 'https://en.yna.co.kr', category: 'general', language: 'en', region: 'kr' },
      { id: 'chosun', name: 'Chosun Ilbo', url: 'http://english.chosun.com', category: 'general', language: 'en', region: 'kr' },
      { id: 'korea-times', name: 'The Korea Times', url: 'http://www.koreatimes.co.kr', category: 'general', language: 'en', region: 'kr' }
    ]
  },
  {
    id: 'in',
    name: 'India',
    flag: '🇮🇳',
    region: 'Asia',
    timezone: 'Asia/Kolkata',
    language: 'en',
    sources: [
      { id: 'times-india', name: 'The Times of India', url: 'https://timesofindia.indiatimes.com', category: 'general', language: 'en', region: 'in' },
      { id: 'hindu', name: 'The Hindu', url: 'https://www.thehindu.com', category: 'general', language: 'en', region: 'in' },
      { id: 'hindustan-times', name: 'Hindustan Times', url: 'https://www.hindustantimes.com', category: 'general', language: 'en', region: 'in' },
      { id: 'indian-express', name: 'The Indian Express', url: 'https://indianexpress.com', category: 'general', language: 'en', region: 'in' }
    ]
  },
  {
    id: 'ph',
    name: 'Philippines',
    flag: '🇵🇭',
    region: 'Asia',
    timezone: 'Asia/Manila',
    language: 'en',
    sources: [
      { id: 'inquirer', name: 'Philippine Daily Inquirer', url: 'https://newsinfo.inquirer.net', category: 'general', language: 'en', region: 'ph' },
      { id: 'philstar', name: 'The Philippine Star', url: 'https://www.philstar.com', category: 'general', language: 'en', region: 'ph' },
      { id: 'abs-cbn', name: 'ABS-CBN News', url: 'https://news.abs-cbn.com', category: 'general', language: 'en', region: 'ph' },
      { id: 'rappler', name: 'Rappler', url: 'https://www.rappler.com', category: 'general', language: 'en', region: 'ph' }
    ]
  },
  {
    id: 'sg',
    name: 'Singapore',
    flag: '🇸🇬',
    region: 'Asia',
    timezone: 'Asia/Singapore',
    language: 'en',
    sources: [
      { id: 'straits-times', name: 'The Straits Times', url: 'https://www.straitstimes.com', category: 'general', language: 'en', region: 'sg' },
      { id: 'cna', name: 'CNA', url: 'https://www.channelnewsasia.com', category: 'general', language: 'en', region: 'sg' },
      { id: 'today-online', name: 'Today Online', url: 'https://www.todayonline.com', category: 'general', language: 'en', region: 'sg' },
      { id: 'business-times', name: 'The Business Times', url: 'https://www.businesstimes.com.sg', category: 'business', language: 'en', region: 'sg' }
    ]
  },
  {
    id: 'id',
    name: 'Indonesia',
    flag: '🇮🇩',
    region: 'Asia',
    timezone: 'Asia/Jakarta',
    language: 'en',
    sources: [
      { id: 'jakarta-post', name: 'The Jakarta Post', url: 'https://www.thejakartapost.com', category: 'general', language: 'en', region: 'id' },
      { id: 'kompas', name: 'Kompas', url: 'https://www.kompas.com', category: 'general', language: 'id', region: 'id' },
      { id: 'detik', name: 'Detik', url: 'https://www.detik.com', category: 'general', language: 'id', region: 'id' },
      { id: 'tempo', name: 'Tempo', url: 'https://www.tempo.co', category: 'general', language: 'id', region: 'id' }
    ]
  },
  {
    id: 'my',
    name: 'Malaysia',
    flag: '🇲🇾',
    region: 'Asia',
    timezone: 'Asia/Kuala_Lumpur',
    language: 'en',
    sources: [
      { id: 'malay-mail', name: 'Malay Mail', url: 'https://www.malaymail.com', category: 'general', language: 'en', region: 'my' },
      { id: 'the-star', name: 'The Star', url: 'https://www.thestar.com.my', category: 'general', language: 'en', region: 'my' },
      { id: 'new-straits-times', name: 'New Straits Times', url: 'https://www.nst.com.my', category: 'general', language: 'en', region: 'my' },
      { id: 'bernama', name: 'Bernama', url: 'https://www.bernama.com', category: 'general', language: 'en', region: 'my' }
    ]
  },

  // Oceania
  {
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    timezone: 'Australia/Sydney',
    language: 'en',
    sources: [
      { id: 'abc-news', name: 'ABC News', url: 'https://www.abc.net.au/news', category: 'general', language: 'en', region: 'au' },
      { id: 'smh', name: 'Sydney Morning Herald', url: 'https://www.smh.com.au', category: 'general', language: 'en', region: 'au' },
      { id: 'australian', name: 'The Australian', url: 'https://www.theaustralian.com.au', category: 'general', language: 'en', region: 'au' },
      { id: 'news-com-au', name: 'News.com.au', url: 'https://www.news.com.au', category: 'general', language: 'en', region: 'au' }
    ]
  },
  {
    id: 'nz',
    name: 'New Zealand',
    flag: '🇳🇿',
    region: 'Oceania',
    timezone: 'Pacific/Auckland',
    language: 'en',
    sources: [
      { id: 'nz-herald', name: 'NZ Herald', url: 'https://www.nzherald.co.nz', category: 'general', language: 'en', region: 'nz' },
      { id: 'stuff', name: 'Stuff', url: 'https://www.stuff.co.nz', category: 'general', language: 'en', region: 'nz' },
      { id: 'rnz', name: 'RNZ', url: 'https://www.rnz.co.nz', category: 'general', language: 'en', region: 'nz' },
      { id: 'newshub', name: 'Newshub', url: 'https://www.newshub.co.nz', category: 'general', language: 'en', region: 'nz' }
    ]
  },

  // South America
  {
    id: 'br',
    name: 'Brazil',
    flag: '🇧🇷',
    region: 'South America',
    timezone: 'America/Sao_Paulo',
    language: 'pt',
    sources: [
      { id: 'folha', name: 'Folha de São Paulo', url: 'https://www.folha.uol.com.br', category: 'general', language: 'pt', region: 'br' },
      { id: 'o-globo', name: 'O Globo', url: 'https://oglobo.globo.com', category: 'general', language: 'pt', region: 'br' },
      { id: 'estadao', name: 'Estadão', url: 'https://www.estadao.com.br', category: 'general', language: 'pt', region: 'br' },
      { id: 'valor', name: 'Valor Econômico', url: 'https://valor.globo.com', category: 'business', language: 'pt', region: 'br' }
    ]
  },
  {
    id: 'ar',
    name: 'Argentina',
    flag: '🇦🇷',
    region: 'South America',
    timezone: 'America/Argentina/Buenos_Aires',
    language: 'es',
    sources: [
      { id: 'clarin', name: 'Clarín', url: 'https://www.clarin.com', category: 'general', language: 'es', region: 'ar' },
      { id: 'la-nacion', name: 'La Nación', url: 'https://www.lanacion.com.ar', category: 'general', language: 'es', region: 'ar' },
      { id: 'infobae', name: 'Infobae', url: 'https://www.infobae.com', category: 'general', language: 'es', region: 'ar' },
      { id: 'perfil', name: 'Perfil', url: 'https://www.perfil.com', category: 'general', language: 'es', region: 'ar' }
    ]
  },
  {
    id: 'cl',
    name: 'Chile',
    flag: '🇨🇱',
    region: 'South America',
    timezone: 'America/Santiago',
    language: 'es',
    sources: [
      { id: 'el-mercurio', name: 'El Mercurio', url: 'https://www.emol.com', category: 'general', language: 'es', region: 'cl' },
      { id: 'la-tercera', name: 'La Tercera', url: 'https://www.latercera.com', category: 'general', language: 'es', region: 'cl' },
      { id: 'cooperativa', name: 'Cooperativa', url: 'https://cooperativa.cl', category: 'general', language: 'es', region: 'cl' },
      { id: 'biobio', name: 'BioBío Chile', url: 'https://www.biobiochile.cl', category: 'general', language: 'es', region: 'cl' }
    ]
  },
  {
    id: 'co',
    name: 'Colombia',
    flag: '🇨🇴',
    region: 'South America',
    timezone: 'America/Bogota',
    language: 'es',
    sources: [
      { id: 'el-tiempo', name: 'El Tiempo', url: 'https://www.eltiempo.com', category: 'general', language: 'es', region: 'co' },
      { id: 'semana', name: 'Semana', url: 'https://www.semana.com', category: 'general', language: 'es', region: 'co' },
      { id: 'eltiempo', name: 'El Tiempo', url: 'https://www.eltiempo.com', category: 'general', language: 'es', region: 'co' },
      { id: 'rcn', name: 'RCN Radio', url: 'https://www.rcnradio.com', category: 'general', language: 'es', region: 'co' }
    ]
  },

  // Africa
  {
    id: 'za',
    name: 'South Africa',
    flag: '🇿🇦',
    region: 'Africa',
    timezone: 'Africa/Johannesburg',
    language: 'en',
    sources: [
      { id: 'news24', name: 'News24', url: 'https://www.news24.com', category: 'general', language: 'en', region: 'za' },
      { id: 'mail-guardian', name: 'Mail & Guardian', url: 'https://mg.co.za', category: 'general', language: 'en', region: 'za' },
      { id: 'daily-maverick', name: 'Daily Maverick', url: 'https://www.dailymaverick.co.za', category: 'general', language: 'en', region: 'za' },
      { id: 'times-live', name: 'Times Live', url: 'https://www.timeslive.co.za', category: 'general', language: 'en', region: 'za' }
    ]
  },
  {
    id: 'ke',
    name: 'Kenya',
    flag: '🇰🇪',
    region: 'Africa',
    timezone: 'Africa/Nairobi',
    language: 'en',
    sources: [
      { id: 'daily-nation', name: 'Daily Nation', url: 'https://nation.africa', category: 'general', language: 'en', region: 'ke' },
      { id: 'standard', name: 'The Standard', url: 'https://www.standardmedia.co.ke', category: 'general', language: 'en', region: 'ke' },
      { id: 'star', name: 'The Star', url: 'https://www.the-star.co.ke', category: 'general', language: 'en', region: 'ke' },
      { id: 'kenya-times', name: 'Kenya Times', url: 'https://kenyatimes.co.ke', category: 'general', language: 'en', region: 'ke' }
    ]
  },
  {
    id: 'ng',
    name: 'Nigeria',
    flag: '🇳🇬',
    region: 'Africa',
    timezone: 'Africa/Lagos',
    language: 'en',
    sources: [
      { id: 'punch', name: 'Punch', url: 'https://punchng.com', category: 'general', language: 'en', region: 'ng' },
      { id: 'vanguard', name: 'Vanguard', url: 'https://www.vanguardngr.com', category: 'general', language: 'en', region: 'ng' },
      { id: 'premium-times', name: 'Premium Times', url: 'https://www.premiumtimesng.com', category: 'general', language: 'en', region: 'ng' },
      { id: 'thisday', name: 'This Day', url: 'https://www.thisdaylive.com', category: 'general', language: 'en', region: 'ng' }
    ]
  },
  {
    id: 'eg',
    name: 'Egypt',
    flag: '🇪🇬',
    region: 'Africa',
    timezone: 'Africa/Cairo',
    language: 'ar',
    sources: [
      { id: 'al-ahram', name: 'Al-Ahram', url: 'https://english.ahram.org.eg', category: 'general', language: 'en', region: 'eg' },
      { id: 'egypt-independent', name: 'Egypt Independent', url: 'https://egyptindependent.com', category: 'general', language: 'en', region: 'eg' },
      { id: 'daily-news-egypt', name: 'Daily News Egypt', url: 'https://dailynewsegypt.com', category: 'general', language: 'en', region: 'eg' },
      { id: 'cairo-scene', name: 'Cairo Scene', url: 'https://cairoscene.com', category: 'general', language: 'en', region: 'eg' }
    ]
  }
];

// Helper functions
export const getCountriesByRegion = (region: string): Country[] => {
  return COUNTRIES.filter(country => country.region === region);
};

export const getCountryById = (id: string): Country | undefined => {
  return COUNTRIES.find(country => country.id === id);
};

export const getRegions = (): string[] => {
  return [...new Set(COUNTRIES.map(country => country.region))];
};

export const getSourcesByCountry = (countryId: string): NewsSource[] => {
  const country = getCountryById(countryId);
  return country ? country.sources : [];
};