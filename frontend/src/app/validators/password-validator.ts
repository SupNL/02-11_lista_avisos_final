import { AbstractControl } from "@angular/forms";

export class PasswordValidator {
    static areEqual(field1 : string, field2 : string) {
        return (control : AbstractControl) => {
            const field = control.get(field1);
            const confirm = control.get(field2);

            if(confirm.errors && !confirm.errors.mustMatch)
                return null;

            if(field.value === confirm.value) {
                return confirm.setErrors(null);
            }
            return confirm.setErrors({ notEqual : true });
        }
    }
}
