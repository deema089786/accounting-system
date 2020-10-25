export const environment = process.env.NODE_ENV || 'default';

const apiUrlMap: { [key: string]: string } = {
  default: 'http://localhost:3000',
  development: 'http://localhost:3000',
  production: 'https://accounting-system.test',
};

export const apiURL = apiUrlMap[environment];
