'use strict';

const chai = require('chai');
const rewire = require('rewire');

const file = rewire('../index');

const { expect } = chai;

/* eslint no-unused-expressions: 0 */
describe('file index.js', () => {
  it.skip('should execute egg-price-persistor using daily trigger and specific date', async () => {
    //file.__set__('pollAndSyncRequestStatus', () => 'user1');
    await file.handler({ source: 'daily.processor', day: 25, month: 12, year: 2021  }, { awsRequestId: 'awsUUID' }, (err, resp) => {
      //expect(resp).to.deep.equal('user1');
    });
  });

  it('should execute egg-price-persistor using default todays date', async () => {
    //file.__set__('pollAndSyncRequestStatus', () => 'user1');
    await file.handler({ }, { awsRequestId: 'awsUUID' }, (err, resp) => {
      done();
      //expect(resp).to.deep.equal('user1');
    });
  });

  it.skip('to fetch entire month data starting from the specified day', async () => {
    //file.__set__('pollAndSyncRequestStatus', () => 'user1');
    await file.handler({ source: 'entiremonth.processor', day: 1, month: 10, year: 2021  }, { awsRequestId: 'awsUUID' }, (err, resp) => {
      //expect(resp).to.deep.equal('user1');
    });
  });

  it.skip('should execute egg-price-persistor using monthly average trigger', async () => {
    //file.__set__('pollAndSyncRequestStatus', () => 'user1');
    await file.handler({ source: 'monthly.processor', day: 1, month: 5, year: 2022  }, { awsRequestId: 'awsUUID' }, (err, resp) => {
      //expect(resp).to.deep.equal('user1');
    });
  });
});
