import asyncio
import errno

import whisper
from pytube import YouTube


async def process_audio(youtube_url: str, user_id: int):
    try:
        yt = YouTube(youtube_url)
        audio_stream = yt.streams.filter(only_audio=True).first()
        audio_stream.download(output_path="./audio/", filename=f"{user_id}.mp3")

        transcription = await transcribe(
            model=whisper.load_model("base.en", device="cpu"),
            audio_path=f"/audio/{user_id}.mp3",
        )
        print(transcription)

        return transcription
    except Exception as e:
        return e


async def transcribe(model, audio_path):
    audio = whisper.load_audio(audio_path)
    audio = whisper.pad_or_trim(audio)

    mel = whisper.log_mel_spectrogram(audio).to(model.device)

    options = whisper.DecodingOptions(language="en", without_timestamps=True)
    result = whisper.decode(model, mel, options)

    return result.text


if __name__ == "__main__":
    video_url = "https://www.youtube.com/watch?v=ldD1m_fg-3c&pp=ygUgaG93IHRvIHVzZSB3aGlzcGVyIG9wZW5haSBvbiBtYWM%3D"
    asyncio.run(process_audio(video_url, 2))
