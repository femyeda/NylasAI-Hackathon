import Nylas from "nylas";
import { ParsedMail, simpleParser } from "mailparser";
import Message from "nylas/lib/models/message";
import Event from "nylas/lib/models/event";

export type ExtendedMessage = {
    raw: string;
    parsed: ParsedMail;
} & Message;

Nylas.config({
    clientId: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
});

const n = (() => {
    const nylas = Nylas.with(process.env.ACCESS_TOKEN || "");

    const getMessage = async (id: string) => {
        return await nylas.messages.find(id);
    };

    const getMessageList = async () => {
        try {
            const messageList = await nylas.messages.list({ limit: 10 });

            console.log(
                `Found ${messageList.length} messages in your inbox...`
            );

            return messageList;
        } catch (err) {
            console.error("Error:\n", err);
        }
    };

    const getRaw = async (message: Message): Promise<string> => {
        return await message.getRaw();
    };

    const parseMail = async (message: string): Promise<ParsedMail> => {
        return await simpleParser(message);
    };

    const createCalendarEvent = async ({
        title,
        startTime,
        endTime,
    }: {
        title: string;
        startTime: number;
        endTime: number;
    }) => {
        const event = new Event(nylas, {
            calendarId: process.env.CALENDAR_ID || "",
            title: title,
            when: {
                startTime: startTime,
                endTime: endTime,
            },
        });

        return await event.save();
    };

    return {
        createCalendarEvent,
        getMessage,
        getMessageList,
        getRaw,
        parseMail,
    };
})();

export default n;
