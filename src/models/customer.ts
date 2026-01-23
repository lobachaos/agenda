export default class Customer {
    #id?: string;
    #name: string

    constructor(id: string, name: string) {
        this.#id = id;
        this.#name = name;
    }

    get id(): string | undefined {
        return this.#id;
    }

    get name(): string {
        return this.#name;
    }
}