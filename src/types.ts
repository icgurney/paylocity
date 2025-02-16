export type Person = {
    id: string,
    firstName: string,
    lastName: string,
    hasBenefits: boolean
}

export type Employee = Person

export type Dependent = Person & {
    employeeId: string,
}