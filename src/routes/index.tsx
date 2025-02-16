import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2 container">
      <h1 className='text-2xl'>Submission</h1>
      <h2 className='text-xl py-4'>To use</h2>
      <p>Navigate using the navbar at the top of the screen. You can create employees and dependents. A summary of the benefits package is on each employee's details page.</p>
      <p>To reset the application, use the Reset button on the Employees screen.</p>
      <h2 className='text-xl py-4'>Discussion</h2>
      <p>I chose to use React for my view, shadcn/ui for components, tanstack-router for routing, and tanstack-query for data loading. The API is mocked using localstorage.</p>
      <p>If I were to continue this project I would look to:</p>
      <ul className="list-disc list-inside">
        <li>Handle errors from the mocked API</li>
        <li>Handle the edge cases from the benefits package costing more than the employee's paycheck</li>
        <li>Handle if dependents can have benefits while the employee does not</li>
        <li>Make UI/UX updates</li>
        <li>Put the calculator in a service with some state management</li>
        <li>Handle pagination for lists</li>
      </ul>
    </div>
  )
}
