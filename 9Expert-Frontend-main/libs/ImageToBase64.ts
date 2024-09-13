
export type TImageToBase64Result = {
    file: string | null
    image_url: string | null
    error?: string
}

export const imageToBase64 = (file: File | undefined, callback: Function) => {

    const reader = new FileReader()

    if (file) {
        reader.readAsDataURL(file);

        reader.onload = () => {
            const img = {
                file: reader.result,
                image_url: URL.createObjectURL(file)
            }

            return callback(img)
        };

        reader.onerror = (error: ProgressEvent<FileReader>) => {
            return callback({
                file: null,
                image_url: null,
                error: error
            })
        };

    }

}

// export const imageUrlToBase64 = async (url: string, callback: Function) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onload = () => callback(reader.result as string);
//     reader.onerror = (error) => callback(null, error);
// };

export const imageUrlToBase64 = async (imageUrl: string): Promise<string> => {
    const response = await fetch(`${imageUrl}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${imageUrl}`);
    }
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
