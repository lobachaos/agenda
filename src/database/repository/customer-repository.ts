import Customer from "@/models/customer";

export default interface CustomerRepository {
    save(customer: Customer): Promise<Customer>;
    getAll(): Promise<Customer[]>;
    getById(id: string): Promise<Customer | null>;
    delete(id: string): Promise<void>;
}