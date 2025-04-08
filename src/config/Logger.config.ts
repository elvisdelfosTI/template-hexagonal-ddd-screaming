import { Logger } from 'tslog';

export const log = new Logger({
  type: 'json',
  prettyLogTimeZone: 'UTC',
});
