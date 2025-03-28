import OpenAI from "openai";
import fs from 'fs';

export default defineEventHandler(async (event) => {
    const whisper = new OpenAI({dangerouslyAllowBrowser: true});
    const transcript = await whisper.audio.transcriptions.create({
        file: fs.createReadStream("./public/audio/test.mp3"),
        model: "whisper-1",
        response_format: "verbose_json",
        timestamp_granularities: ["word"]
    });
    console.log(transcript.words)
    return transcript;
})