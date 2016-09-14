
// TODO: Perhaps this should be on server side (db?), since IDs lives in database
var prefilters = {
  'tags': {
    'transparency': ['552ef377f7692f030000228c'],
    'data': ['552f46e03ec2bb03001dece7']
  },
  'countries': {
    'argie': ['552ef29bf7692f0300002284']
  },
  'technologies': {
    'web': [
      '552ef093f7692f030000225b',
      '552ef091f7692f030000225a',
      '552ef084f7692f0300002259',
      '552ef0b4f7692f030000225e',
      '552ef063f7692f0300002257'
    ]
  }
};

module.exports = {
  getTagsFor: function (type) {
    return prefilters['tags'][type] || [];
  },
  getCountriesFor: function (type) {
    return prefilters['countries'][type] || [];
  },
  getTechnologiesFor: function (type) {
    return prefilters['technologies'][type] || [];
  }
};
