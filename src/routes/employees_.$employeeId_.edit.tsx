import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useDeleteEmployeeMutation, useEmployeeByIdQuery, useUpsertEmployeeMutation } from "@/data/employees.queries"
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'

import { Route as employeeRoute } from '@/routes/employees_.$employeeId'
import { Route as employeesListRoute } from '@/routes/employees'
import { PersonForm, SubmitArgs } from '@/components/person-form'


export const Route = createFileRoute('/employees_/$employeeId_/edit')({
  component: RouteComponent,
})



function RouteComponent() {
  const { employeeId } = Route.useParams()
  const { data } = useEmployeeByIdQuery(employeeId)
  const isNew = useMemo(() => !data?.id, [data])
  const { mutate: upsertEmployee } = useUpsertEmployeeMutation()
  const { mutate: deleteEmployee } = useDeleteEmployeeMutation()
  const navigate = useNavigate()



  function onSubmit(values: SubmitArgs) {
    console.log("upsert user", values)
    upsertEmployee({ ...values, id: employeeId })
    navigate({ to: employeeRoute.to, params: { employeeId } })
  }

  function onDelete() {
    if (data) {
      console.log('deleting user', data?.id)
      deleteEmployee(data)
      navigate({ to: employeesListRoute.to })
    }
  }

  return (
    <div className='container mx-auto py-10'>
      <PersonForm onSubmit={onSubmit} isEmployee={true} data={data} />
      {!isNew && <Button onClick={onDelete}>Delete</Button>}

    </div>

  )
}
