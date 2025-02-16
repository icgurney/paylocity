import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dependent, Employee } from "../types";

export const useEmployeesQuery = () =>
    useQuery<Employee[]>({
        queryKey: ['employees', 'list'],
        queryFn: () => {
            return new Promise<Employee[]>((resolve) => {
                setTimeout(() => {
                    const employeeKeys = Object.keys(localStorage).filter(key => 
                        key.startsWith('employees:')
                    );
                    
                    const employees = employeeKeys.map(key => {
                        const data = localStorage.getItem(key);
                        return data ? JSON.parse(data) : null;
                    }).filter(e => !!e);
                    
                    resolve(employees);
                }, 500);
            });
        }
    })


export const useEmployeeByIdQuery = (employeeId: string) =>
    useQuery<Employee>({
      queryKey: ['employees', employeeId],
      queryFn: () => {
        return new Promise<Employee>((resolve, reject) => {
            setTimeout(() => {
                const data = localStorage.getItem(`employees:${employeeId}`)
                if (!data) {
                    reject(new Error('Employee not found'));
                } else {
                    resolve(JSON.parse(data));
                }
            }, 500);
        });
      }
    })

export const useUpsertEmployeeMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (employee: Employee) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    localStorage.setItem(`employees:${employee.id}`, JSON.stringify(employee));
                    resolve();
                }, 500);
            });
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
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    localStorage.removeItem(`employees:${employee.id}`)
                    resolve();
                }, 500);
            });
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
            return new Promise<Dependent[]>((resolve) => {
                setTimeout(() => {
                    const data = localStorage.getItem(`dependents:${employeeId}`)
                    if (!data) {
                        resolve([]);
                    } else {
                        resolve(JSON.parse(data));
                    }
                }, 500);
            });
        }
    })
}

export const useUpdateDependentsMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({dependents, employeeId}:{dependents: Dependent[], employeeId: string}) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    localStorage.setItem(`dependents:${employeeId}`, JSON.stringify(dependents));
                    resolve();
                }, 500);
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['dependents']})
        }
    })
}

export const useClearStorage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    localStorage.clear()
                    resolve();
                }, 500);
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
        }
    })
}