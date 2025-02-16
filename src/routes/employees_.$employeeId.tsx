import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useEmployeeByIdQuery, useGetDependentsQuery } from '@/data/employees.queries'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SquarePlus } from 'lucide-react'
import { Route as editRoute } from '@/routes/employees_.$employeeId_.edit'
import { Route as dependentRoute } from '@/routes/empoloyees_.$employeeId_.$dependentId'
import { useMemo } from 'react'
import { calculateBenefitCost } from '@/lib/calc'

export const Route = createFileRoute('/employees_/$employeeId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { employeeId } = Route.useParams()
  const { data: employee, isLoading } = useEmployeeByIdQuery(employeeId)
  const { data: dependents } = useGetDependentsQuery(employeeId)
  const navigate = useNavigate()


  const benefitsCost = useMemo(() => {
    if (employee && dependents) {
      return calculateBenefitCost(employee, dependents)
      
    }
  }, [employee, dependents])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!employee) {
    return <div>No data</div>
  }

  return (
  <div className='container mx-auto py-10'>
    <h1 className='text-2xl py-2'>Employee info</h1>
    <div>Id: {employee.id}</div>
    <div>Name: {employee.lastName}, {employee.firstName}</div>
    <div>Has Benefits: <Checkbox checked={employee.hasBenefits} disabled/></div>
    <Button><Link to={editRoute.to} params={{employeeId: employee.id}}>Edit</Link></Button>
    <h2 className='text-xl py-4'>Dependents</h2>
    <Table className='border'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Has Benefits?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dependents?.map(d => (
            <TableRow 
              key={d.id}
              className='hover:cursor-pointer' 
              onClick={() => navigate({to: dependentRoute.to, params: {dependentId: d.id, employeeId}})}
            >
              <TableCell className="font-medium">{d.id}</TableCell>
              <TableCell>{d.lastName}, {d.firstName}</TableCell>
              <TableCell>{d.hasBenefits ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}

          <TableRow className='hover:cursor-pointer'>
            <TableCell colSpan={2}>
              <Link
                to={dependentRoute.to}
                params={{ dependentId: crypto.randomUUID(), employeeId }}
                className='w-full flex items-center justify-center'
              >
                <SquarePlus className='mr-2'/>
                Create New Dependent
              </Link>
            </TableCell>
          </TableRow>

        </TableBody>
        </Table>

        <div>
          <h2 className='text-2xl py-4'>Benefits Package per Pay Period</h2>
          {benefitsCost && (
            <div>
              <div>Base Pay: ${benefitsCost.basePay.toFixed(2)}</div>
              <div>Employee Cost: ${benefitsCost.employeeCost.toFixed(2)}</div>
              <div>Dependents Cost: ${benefitsCost.dependentsCost.toFixed(2)}</div>
              <div>Total Cost: ${benefitsCost.totalCost.toFixed(2)}</div>
              <div>Net Pay: ${benefitsCost.netPay.toFixed(2)}</div>
            </div>
          )}
        </div>
    </div>
    )
}
