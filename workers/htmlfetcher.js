// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var archiveHelpers = require('../helpers/archive-helpers');

var server = 'http://127.0.0.1:8080';

var CronJob = require('cron').CronJob;
/*var job = new CronJob('1 * * * * *', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
  /*archiveHelpers.readListOfUrls();
  }, function () {
    /* This function is executed when the job stops */
  //},
  true /* Start the job right now */
  //timeZone /* Time zone of this job. */
//);

archiveHelpers.readListOfUrls();


