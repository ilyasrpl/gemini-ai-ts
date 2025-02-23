import moment from 'moment-timezone';
import { FunctionDeclaration, SchemaType } from '@google/generative-ai';

const GetTimeDeclaration: FunctionDeclaration = {
  name: "getTime",
  description: `Get the current time.
  return like: {
    year : 2025,
    month: "January",
    date: 1,
    day: "Sunday",
    hour: 12,
    minute: 20,
    second: 30
  }`,
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      timeZone: {
        type: SchemaType.STRING,
        description: `The time zone to use, ${moment.tz.names().map(v => `"${v}"`).join(', ')}`,
      }
    },
    required: [],
  }
}

function getTime({timeZone = "Asia/Jakarta"}: any): object {
  const time = moment().tz(timeZone);
  const res = {
    year: time.year(),
    month: time.format('MMMM'), 
    date: time.date(),
    day: time.format('dddd'), 
    hour: time.hour(),
    minute: time.minute(),
    second: time.second()
  };

  return res;
}

export { GetTimeDeclaration, getTime }