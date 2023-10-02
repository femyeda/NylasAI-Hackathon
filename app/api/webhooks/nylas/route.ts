import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import agent from "@/lib/agent/agent";
import n from "@/lib/nylas";

export async function POST(req: NextRequest) {
    // if (!verify_nylas_request(req)) {
    //     return NextResponse.json({}, { status: 401 });
    // }

    const body = await req.json();

    const { deltas } = body;

    const delta = deltas[0];

    const { date, object, type, object_data } = delta;

    const { id, namespace_id, account_id, attributes, metadata } = object_data;

    if (type !== "message.created") {
        console.log({ id, type, skipped: true });
        return NextResponse.json({ message: "skipped" }, { status: 200 });
    }

    const message = await n.getMessage(id);
    const rawMessage = await n.getRaw(message);
    const parsedMessage = await n.parseMail(rawMessage);

    const { from, subject, snippet } = message;

    const messageBody = parsedMessage.text;
    const input = `${from}\n\n${subject}\n\n${messageBody}`;

    await agent(input);

    return new NextResponse("ok", { status: 200 });
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const challenge = searchParams.get("challenge");

    return new Response(challenge);
}

// function verify_nylas_request(req) {
//     console.log({ CLIENT_SECRET: process.env.CLIENT_SECRET });

//     const digest = crypto
//         .createHmac("sha256", process.env.CLIENT_SECRET)
//         .update(req.rawBody)
//         .digest("hex");

//     return digest === req.headers.get("X-Nylas-Signature");
// }
