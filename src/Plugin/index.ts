/**
 * TODO : More research required for apollo server logging
 * 
 * 
 * https://www.apollographql.com/docs/apollo-server/monitoring/metrics/#logging
 * 
 * https://www.apollographql.com/docs/apollo-server/integrations/plugins/
 * 
 */

import logger from '../logger'

export const loggingPlugin = {
  //Recieve Request
  async requestDidStart(requestContext: any) {
    return {
      // GraphQL Schema Parsing Started
      async parsingDidStart(requestContext: any) {
        logger.info('Parsing started!');
      },
      // Validation Started
      async validationDidStart(requestContext: any) {
        logger.info('Validation started!');
      },
    };
  },
};