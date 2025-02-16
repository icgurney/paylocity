import { PersonForm, SubmitArgs } from '@/components/person-form'
import { useGetDependentsQuery, useUpdateDependentsMutation } from '@/data/employees.queries'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { Route as employeeRoute } from '@/routes/employees_.$employeeId'

export const Route = createFileRoute('/empoloyees_/$employeeId_/$dependentId')({
  component: RouteComponent,
})

function RouteComponent() {
    const { dependentId, employeeId} = Route.useParams()
  const { data: dependents } = useGetDependentsQuery(employeeId)
  const dependent = useMemo(() => dependents?.find(d => d.id === dependentId), [dependentId])
  const { mutate: updateDependents } = useUpdateDependentsMutation()
  const navigate = useNavigate()



  const onSubmit = useCallback((values: SubmitArgs) => {
    console.log("upsert user", values)
    const updatedDependents = dependents ? dependents.map(d => 
      d.id === dependentId ? { ...d, ...values } : d
    ) : [];
    
    if (!updatedDependents.some(d => d.id === dependentId)) {
      updatedDependents.push({ ...values, id: dependentId, employeeId });
    }

    updateDependents({ dependents: updatedDependents, employeeId });
    navigate({ to: employeeRoute.to, params: { employeeId } });
  }, [dependents, dependentId, employeeId, updateDependents, navigate]);

  return (
    <div className='container mx-auto py-10'>
      <PersonForm onSubmit={onSubmit} isEmployee={true} data={dependent} />

    </div>

  )
}
