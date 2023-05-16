import type { ICheckup } from '../entities/checkup'

import { useEffect, useState } from 'react'
import PouchDb from 'pouchdb-browser'

export const useCheckupDb = () => {
  // Local states
  const REMOTE_URL = import.meta.env.VITE_REMOTE_DB_HOST || 'http://localhost:5984'
  const [checkupDb] = useState<PouchDB.Database<ICheckup>>(
    new PouchDb('checkup')
  )
  const [checkupRemote] = useState<PouchDB.Database<ICheckup>>(
    new PouchDb(`${REMOTE_URL}/checkup`)
  )

  // Sync local db with remote db
  useEffect(() => {
    console.log('Syncing checkup db')
    const canceller = checkupDb.sync(checkupRemote, {
      live: true,
      retry: true,
    })

    // canceller.on('change', (info) => {
    //   console.log('Change', info)
    // })

    // canceller.on('paused', (err) => {
    //   console.log('Paused', err)
    // })

    // canceller.on('active', () => {
    //   console.log('Active')
    // })

    // canceller.on('denied', (err) => {
    //   console.log('Denied', err)
    // })

    // canceller.on('complete', (info) => {
    //   console.log('Complete', info)
    // })

    return () => canceller.cancel()
  }, [checkupDb, checkupRemote])

  return { checkupDb }
}