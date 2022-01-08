import {ScullyConfig} from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'muzigen',
  outDir: './dist/static',
  extraRoutes: [
    '/blog/J2Bgx5bOroSQrdoD7qZN',
    '/blog/K9bh6vhYLgCAXziTe4Q9',
    '/blog/VrY8imKbUmGyI0Ug3Z19',
    '/blog/fFy2L42KFF8H7VWGqRED',
    '/blog/mHhmsF4nE7L7Bv2jIpm2'],
  routes: {
    /*'/user/:userId': {
      type: 'json',
      // Add the following to your route
      manualIdleCheck: true
      userId: {
        url: 'http://localhost:8200/users',
        property: 'id'
      }
    }*/
  }
};