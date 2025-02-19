import { connectToDatabase } from '@/lib/db'
import React from 'react'

function page() {
  connectToDatabase().then(() => console.log('Connected to databasee')).catch((err) => console.log(err))

  return (
    <div>page</div>
  )
}

export default page