import tinify from 'tinify'

tinify.key = process.env.TINIFY_API_KEY!

export async function compressImage(base64: string): Promise<string> {
  const buffer = Buffer.from(base64.split(',')[1], 'base64')
  const source = tinify.fromBuffer(buffer)
  const compressed = await source.toBuffer()
  return `data:image/webp;base64,${compressed.toString('base64')}`
}

export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteChars = atob(base64.split(',')[1])
  const byteArrays: Uint8Array[] = []
  const sliceSize = 512

  for (let offset = 0; offset < byteChars.length; offset += sliceSize) {
    const slice = byteChars.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    byteArrays.push(new Uint8Array(byteNumbers))
  }

  return new Blob(byteArrays, { type: mimeType })
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}
