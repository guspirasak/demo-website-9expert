
export const ConvertYoutubeLinkToEmbed = (link: string) => {
    if (!link) return ""
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/watch\?v=))([^#&?]*).*/;
    const match = link.match(regExp);
    const videoId = (match && match[5]) || "";

    if (videoId) return `https://www.youtube.com/embed/${videoId}`

    return ''
}