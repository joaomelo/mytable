# myairtable

this is a personal web app that complements my use of an [airtable](https://www.airtable.com) base for personal management.

i think this code could be of any use to you if you want to:

- represent some tree data structure since airtable limits the use of formulas with fields that link to records in the same table.
- create records that obey some recurring time logic (still in development)

i still update some other stuff in the base, but they are very basic cases and is my opinion that the airtable api documentation is much more useful for those situations than this code.

# stack

i use [vue](https://vuejs.org/) and [bootstrap](https://getbootstrap.com/) in the frontend because i am familiar with them but there is no real need for the tech. i store all the log data in [firebase](https://firebase.google.com/) because firebase is cheap (in this case free) and so easy to use.

to manage airtable limits of access rate i use [bottleneck](https://www.npmjs.com/package/bottleneck). and to deal with dates and recurring events i use [moment](https://momentjs.com/) and [@rschedule](https://www.npmjs.com/package/@rschedule/rschedule) respectively.

everything else in package.json is derived from that.

# basic logic

the app updates and creates data in airtable using a logic that their app does not support. the operation is called manually in an update button in this app.

after the button is pressed, airtable data is copied in a snapshot of the base and some transforming functions are registered in a batcher object. this functions will be run against every record of the base and produce create or update commands if necessary. at the end, every command will be sent to airtable asynchronously.

inside path and recurrence subfolders residing in airtable folder there is the logic for dealing with tree data structure and creating recurring records based on another template record.
