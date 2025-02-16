import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dependent, Employee } from "../types";

export const useEmployeesQuery = () =>
    useQuery<Employee[]>({
        queryKey: ['employees', 'list'],
        queryFn: () => {
            const employeeKeys = Object.keys(localStorage).filter(key => 
                key.startsWith('employees:')
            );
            
            const employees = employeeKeys.map(key => {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            }).filter(e => !!e);
            
            return employees;
        }
    })


export const useEmployeeByIdQuery = (employeeId: string) =>
    useQuery<Employee>({
      queryKey: ['employees', employeeId],
      queryFn: () => {
        const data = localStorage.getItem(`employees:${employeeId}`)
        if (!data) throw new Error('Employee not found')
        return JSON.parse(data)
      }
    })

export const useUpsertEmployeeMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (employee: Employee) => {
            localStorage.setItem(`employees:${employee.id}`, JSON.stringify(employee));
            return Promise.resolve();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']})
        }
    })
}

export const useDeleteEmployeeMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (employee: Employee) => {
            localStorage.removeItem(`employees:${employee.id}`)
            return Promise.resolve()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [`employees`]})
        }
    })
}

export const useGetDependentsQuery = (employeeId: string) => {
    return useQuery<Dependent[]>({
        queryKey: ['dependents', employeeId],
        queryFn: () => {
          const data = localStorage.getItem(`dependents:${employeeId}`)
          if (!data) return []
          return JSON.parse(data)
        }
    })
}

export const useUpdateDependentsMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({dependents, employeeId}:{dependents: Dependent[], employeeId: string}) => {
            localStorage.setItem(`dependents:${employeeId}`, JSON.stringify(dependents));
            return Promise.resolve();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['dependents']})
        }
    })
}