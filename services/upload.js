
const url = 'https://api.cloudinary.com/v1_1/caringbridge/image/upload'

export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pzjsnmyn')
    formData.append('tags', 'blue')

    const requestOptions = {
        method: 'POST',
        credentials: 'same-origin', // necessary to include cookies in fetch request
        body: formData,
    };

    const response = await fetch(url, requestOptions)
    if (!response.ok) {
        console.error(response)
    }

    const json = await response.json()
    return json
}
