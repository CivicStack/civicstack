var config = require('config');

/**
 * Prefilters Schema

[ // Array
 {
   title: {
     en: 'Communications for all' // String <required>,
     es: 'Comunicación más accesible' // String <optional>,
     fr: 'Communications for all' // String <optional>
   },
   tagss: [ // Array <Tag>
     {
       type: 'tags' // String <tags | technologies | countries>,
       id: '552f40333ec2bb03001dece1' // String <MongoID>
     },
     ...
   ]
 },
 ...
]

 */

var optionalLangs = config.languages.filter(function (lang) {
  return lang !== 'en';
});

module.exports = [
  {
    title: {
      en: 'Communications for all',
      es: 'Comunicación más accesible'
    },
    filters: [
      {type: 'tags', id: '552f40333ec2bb03001dece1'}
    ]
  },
  {
    title: {
      en: 'Open budgets',
      es: 'Transparentar presupuestos'
    },
    filters: [
      {type: 'tags', id: '552ef4c2f7692f03000022a2'}
    ]
  },
  {
    title: {
      en: 'Crowdsourcing legislation',
      es: 'Difundir legislación'
    },
    filters: [
      {type: 'tags', id: '552ef3d1f7692f0300002291'},
      {type: 'tags', id: '552f28bb3ec2bb03001deccd'}
    ]
  },
  {
    title: {
      en: 'Civic engagement',
      es: 'Promover la participación ciudadana'
    },
    filters: [
      {type: 'tags', id: '552f29e23ec2bb03001deccf'},
      {type: 'tags', id: '552ef383f7692f030000228d'},
      {type: 'tags', id: '552ef3b0f7692f030000228e'},
      {type: 'tags', id: '552f2a193ec2bb03001decd0'}
    ]
  },
  {
    title: {
      en: 'Data & visualizations',
      es: 'Visualización de datos'
    },
    filters: [
      {type: 'tags', id: '552ef4f0f7692f03000022a4'},
      {type: 'tags', id: '552f29b63ec2bb03001decce'},
      {type: 'tags', id: '552ef4d0f7692f03000022a3'},
      {type: 'tags', id: '55367179719aa70300d04489'},
      {type: 'tags', id: '552ef328f7692f030000228b'}
    ]
  }
].map(function (prefilter) {
  optionalLangs.forEach(function (lang) {
    prefilter.title[lang] = prefilter.title[lang] || prefilter.title.en;
  });

  return prefilter;
});
