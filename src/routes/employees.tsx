import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SquarePlus } from 'lucide-react';
import { useEmployeesQuery } from '@/data/employees.queries'
import { Route as editRoute } from '@/routes/employees_.$employeeId_.edit'
import { Route as employeeRoute} from '@/routes/employees_.$employeeId'

export const Route = createFileRoute('/employees')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading } = useEmployeesQuery()
  const navigate = useNavigate()


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto py-10'>
      <Table className='border'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(employee => (
            <TableRow 
              key={employee.id}
              className='hover:cursor-pointer' 
              onClick={() => navigate({to: employeeRoute.to, params: {employeeId: employee.id}})}
            >
              <TableCell className="font-medium">{employee.id}</TableCell>
              <TableCell>{employee.lastName}, {employee.firstName}</TableCell>
            </TableRow>
          ))}

          <TableRow className='hover:cursor-pointer'>
            <TableCell colSpan={2}>
              <Link
                to={editRoute.to}
                params={{ employeeId: crypto.randomUUID() }}
                className='w-full flex items-center justify-center'
              >
                <SquarePlus className='mr-2'/>
                Create New Employee
              </Link>
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </div>

  )
}
