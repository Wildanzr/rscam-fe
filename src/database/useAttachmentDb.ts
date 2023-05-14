import type { IAttachment } from '../entities/attachment'

import { useState, useEffect } from 'react'

import PouchDb from 'pouchdb-browser'

export const useAttachmentDb = () => {
    // Local states
    const REMOTE_URL = import.meta.env.VITE_REMOTE_DB_HOST || 'http://localhost:5984'
    const [attachmentDb] = useState<PouchDB.Database<IAttachment>>(
        new PouchDb('attachment')
    )
    const [attachmentRemote] = useState<PouchDB.Database<IAttachment>>(
        new PouchDb(`${REMOTE_URL}/attachment`)
    )

    // Sync local db with remote db
    useEffect(() => {
        console.log('Syncing attachment db')
        const canceller = attachmentDb.sync(attachmentRemote, {
            live: true,
            retry: true,
        })

        canceller.on('change', (info) => {
            console.log('Change', info)
        })

        canceller.on('paused', (err) => {
            console.log('Paused', err)
        })

        canceller.on('active', () => {
            console.log('Active')
        })

        canceller.on('denied', (err) => {
            console.log('Denied', err)
        })

        canceller.on('complete', (info) => {
            console.log('Complete', info)
        })

        return () => canceller.cancel()
    }
        , [attachmentDb, attachmentRemote])

    return { attachmentDb }
}