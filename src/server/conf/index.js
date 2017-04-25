import defaultConf from '../../../conf/app.json'
const isDev = process.env.NODE_ENV !== 'development'
const localConf = isDev ? {} : require('../../../conf/app.local.json')

const conf = {
  ...defaultConf,
  ...localConf
}

export default conf
