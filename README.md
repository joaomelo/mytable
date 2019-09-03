# myairtable

## Recurring Jobs

Recurring jobs are generators for repeting ocrrunces of themselves or their subtree of jobs. The generator is a god place to allocate financial transaction and references while the instances ocrruences are short live jobs to alocate in daily routines.

That could be two types of recurring genertors jobs. The flat ones wich just copy instances of themselves and process generators wich have a complex subtree of jobs describind a multi step repeating process.

Jobs still active, bloqued and so one are assumed to be still waiting to be dealt with. Cancelled jobs are signaling to be a recurring stream ended.

Jobs that have children connected to it will be copied only without the subtree, at least from now. If you have a complex recurring job tree you should: (1) have no more than one nested level, (2) make the parent job not recurring, and (3) make all the child jobs recurring based on your process date and recurring parameters.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
