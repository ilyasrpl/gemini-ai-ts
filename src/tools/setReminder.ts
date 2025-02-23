import { Gemini } from "../gemini";
import { FunctionDeclaration, SchemaType } from "@google/generative-ai";
import moment from "moment-timezone";

const SetReminderDeclaration: FunctionDeclaration = {
  name: "setReminder",
  description: `Set a reminder for a specific time and date.`,
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      time: {
        type: SchemaType.STRING,
        description: `The time to set the reminder for, format: YYYY-MM-DD hh:mm:ss. Timezone is Asia/Jakarta. Example: 2024-01-01 10:00:00`,
      },
      message: {
        type: SchemaType.STRING,
        description: `The message to send when the reminder is triggered.`,
      }
    },
    required: ["time", "message"],
  }
}

function setReminder({time, message}: any): object {
  const timeTarget = moment(time, "YYYY-MM-DD hh:mm:ss");
  const timeNow = moment().tz("Asia/Jakarta");
  const diff = timeTarget.diff(timeNow, "seconds");

  if(timeNow.isAfter(timeTarget)) 
    return {
      message : "reminder already passed"
    }


  setTimeout(() => {
    console.log(message);
  }, diff * 1000);

  return {
    message : "done"
  };
}

export { SetReminderDeclaration, setReminder }
