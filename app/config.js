module.exports.init = (config) => {
  config.cookieSecret = '{RANDOM_1}';
  config.cookieSession.keys = ['{RANDOM_2}'];
  if (config.env === 'dev') {
    config.mysql.debugsql = true;
  };
};
