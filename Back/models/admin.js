export class admin{
    constructor(name, email, contra){
        this.id = crypto.randomUUID();
        this.name = name
        this.email = email
        this.contra = contra
    }
}