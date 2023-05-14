export interface IAttachment {
    _id?: string
    _rev?: string
    name: string
    sync: boolean
    _attachments?: {
        [key: string]: {
            content_type: string
            data: string
        }
    }
}