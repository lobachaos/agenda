import CustomerRepository from "@/database/repository/customer-repository";
import Customer from "@/models/customer";
import {db} from "@/database/config";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    deleteDoc,
    QueryDocumentSnapshot,
    SnapshotOptions,
    FirestoreDataConverter
} from "firebase/firestore";

export default class CustomerCollection implements CustomerRepository {
    static collectionName = "customers";

    private converter: FirestoreDataConverter<Customer> = {
        toFirestore(customer: Customer) {
            return {
                name: customer.name,
            };
        },
        fromFirestore(
            snapshot: QueryDocumentSnapshot,
            options: SnapshotOptions
        ): Customer {
            const data = snapshot.data(options);
            return new Customer(snapshot.id, data.name);
        },
    };

    private collectionRef() {
        return collection(db, CustomerCollection.collectionName).withConverter(
            this.converter
        );
    }

    async save(customer: Customer): Promise<Customer> {
        const docRef = await addDoc(this.collectionRef(), customer);
        return new Customer(docRef.id, customer.name);
    }

    async getAll(): Promise<Customer[]> {
        const snapshot = await getDocs(this.collectionRef());
        return snapshot.docs.map((doc) => doc.data());
    }

    async getById(id: string): Promise<Customer | null> {
        const ref = doc(
            db,
            CustomerCollection.collectionName,
            id
        ).withConverter(this.converter);

        const snapshot = await getDoc(ref);
        return snapshot.exists() ? snapshot.data() : null;
    }

    async delete(id: string): Promise<void> {
        const ref = doc(db, CustomerCollection.collectionName, id);
        await deleteDoc(ref);
    }
}
