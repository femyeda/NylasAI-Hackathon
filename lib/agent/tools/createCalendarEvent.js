import { DynamicStructuredTool } from "langchain/tools";
import { z } from "zod";
import n from "@/lib/nylas";
import dayjs from "dayjs";

const createCalendarEvent = async ({
    title,
    description,
    startTime,
    endTime,
}) => {
    const stU = dayjs(startTime).unix();
    const etU = dayjs(endTime).unix();

    return await n.createCalendarEvent({
        title,
        startTime: stU,
        endTime: etU,
    });
};

export const createCalendarEventTool = () => {
    return new DynamicStructuredTool({
        name: "createCalendarEvent",
        description:
            "Tries to create a calendar event for the given task or deadline.",
        func: async ({ title, description, startTime, endTime }) => {
            return JSON.stringify(
                await createCalendarEvent({
                    title,
                    description,
                    startTime,
                    endTime,
                })
            );
        },
        schema: z.object({
            title: z.string().describe("The task to be completed."),
            description: z
                .string()
                .optional()
                .describe("Any additional information for the task."),
            startTime: z
                .string()
                .describe("The day and time the task should be completed."),
            endTime: z
                .string()
                .describe(
                    "This should be an estimated value of the length of the task plus the startTime."
                ),
        }),
    });
};

export default createCalendarEventTool;
