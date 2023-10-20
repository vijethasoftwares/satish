const GLOBAL = require('./Constant');
const endUrls = {
  // Auth
  login: `${GLOBAL.BASE_URL}v1/auth/create/`,
  otp: `${GLOBAL.BASE_URL}v1/auth/user/otp`,
  saveAddress: `${GLOBAL.BASE_URL}v1/auth/user/newaddress/`,
  saveOrder: `${GLOBAL.BASE_URL}v1/orders/new/`,
  FetchAddress: `${GLOBAL.BASE_URL}v1/auth/user/find/`,
  listOrder: `${GLOBAL.BASE_URL}v1/orders/user/`,
  
};

export default endUrls;
