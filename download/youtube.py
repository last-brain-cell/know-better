import asyncio

from pytube import YouTube


async def download_audio(youtube_url):
    try:
        yt = YouTube(youtube_url)
        audio_stream = yt.streams.filter(only_audio=True).first()
        audio_stream.download(output_path="../audio/")
        print("Audio downloaded successfully!")
    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    video_url = "https://www.youtube.com/watch?v=Cqbleas1mmo"
    asyncio.run(download_audio(video_url))
