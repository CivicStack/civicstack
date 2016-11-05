const { style, merge, $ } = require('glamor')

module.exports.footer = merge({
    paddingTop: '60px',
    paddingBottom: '30px',
    textAlign: 'center'
  },
  $(' a', {
    fontWeight: 'bold'
  }))

module.exports.container = style({
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  '@media (min-width: 768px)': {
    width: '750px'
  }
})
