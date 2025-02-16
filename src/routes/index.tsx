import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2 container">
      <h3 className='text-xl'>Discussion</h3>
      <p></p>
    </div>
  )
}
