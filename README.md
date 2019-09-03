# myairtable

## Recurring Jobs

Every recurring job is a template for the creating of the next ocurrence. The script will grab wall recurring jobs that are done and create the next ocurrence based on the recurring rule.

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
