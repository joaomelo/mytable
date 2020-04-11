import Bottleneck from 'bottleneck';

// The API is limited to 5 requests per second per base.
// If you exceed this rate, you will receive a 429 status code and
// will need to wait 30 seconds before subsequent requests will succeed.
const MAX_REQUESTS_PER_SECOND = 5;
const SECOND = 1000;
const limiter = new Bottleneck({
  minTime: SECOND / MAX_REQUESTS_PER_SECOND
});

function requestUnderLimit (request, ...args) {
  const wrapped = limiter.wrap(request);
  return wrapped(...args);
}

export { requestUnderLimit };
