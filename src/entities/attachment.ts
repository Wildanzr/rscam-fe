export interface IAttachment {
    _id?: string
    _rev?: string
    name: string
    sync: boolean
    type: string
    _attachments?: {
        [key: string]: {
            content_type: string
            data: string | Blob
        }
    }
}