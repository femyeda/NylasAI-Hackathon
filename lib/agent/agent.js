import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import createCalendarEventTool from "./tools/createCalendarEvent";

const gptModel = "gpt-3.5-turbo";

const debug = false;

const prompt = `You're an email assistant and you help me figure out if an email has follow up tasks or deadlines I should be aware of.
I only need to be made aware of the task. You don't have to complete the task.
Make sure your final answers should be a calendar event for the task I need to complete.
This is very important—the following are categories I want to see: tasks, deadlines.
If it is a task then attempt automatically to create a calendar event for the task that I will complete later on my own.
If there is no obvious day and only a time assume it's today.
Important: You don't have to ask me to create the calendar event, just do it.
The current time in the user's timezone is:  ${now("America/Chicago")}
The user's time zone is: America/Chicago.
`;

export const agent = async (input, user) => {
    const tools = [createCalendarEventTool()];

    const model = new ChatOpenAI({
        modelName: gptModel,
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0,
    });

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
        agentArgs: {
            prefix: prompt,
        },
        agentType: "openai-functions",
        returnIntermediateSteps: debug,
        verbose: debug,
    });

    const result = await executor.call({ input });
    const { output } = result;
    console.log(output);

    return output;
};

export function now(timeZone) {
    return new Date().toLocaleString("en-US", {
        timeZone,
    });
}

export default agent;
