export default defineEventHandler(async (event) => {
    const url = await readBody(event)
    const request = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Authorization": process.env.ASSEMBLY_API_KEY  
        },
        body: JSON.stringify({
            "audio_url": url.url
        })
    })
    if(request.ok) {
        const response = await request.json()
        while (true) {
            const transcript = await fetch(`https://api.assemblyai.com/v2/transcript/${response.id}`, {
                method: 'GET',
                headers: {
                "Content-type": "application/json",
                "Authorization": process.env.ASSEMBLY_API_KEY
                }
            })
            if(transcript.ok) {
                const transcribe = await transcript.json()
                if(transcribe.status == 'completed' || transcribe.status == 'error') return transcribe
                else await new Promise((resolve) => setTimeout(resolve, 2000))
            } else return 'GET ERROR'
        }
    }
    else return 'POST ERROR'
})