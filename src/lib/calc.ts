import { Dependent, Employee } from "@/types";

export type BenefitCost = {
    employeeCost: number;
    dependentsCost: number;
    totalCost: number;
    basePay: number;
    netPay: number;
}

export function calculateBenefitCost(employee: Employee, dependents: Dependent[]): BenefitCost {
    const employeeBaseCost = 1000;
    const dependentBaseCost = 500;
    const discountRate = 0.10;
    const payPeriods = 26
    const basePay = 2000

    let employeeCost = employee.hasBenefits ? employeeBaseCost : 0;
    if (employee.firstName.startsWith('A')) {
        employeeCost -= employeeCost * discountRate;
    }

    let dependentsCost = 0;
    for (const dependent of dependents) {
        let cost = dependent.hasBenefits ? dependentBaseCost : 0;
        if (dependent.firstName.startsWith('A')) {
            cost -= cost * discountRate;
        }
        dependentsCost += cost;
    }

    let totalCost = employeeCost + dependentsCost;

    totalCost /= payPeriods
    employeeCost /= payPeriods
    dependentsCost /= payPeriods
    return {
        basePay,
        employeeCost,
        dependentsCost,
        totalCost,
        netPay: basePay - totalCost
    };
}
