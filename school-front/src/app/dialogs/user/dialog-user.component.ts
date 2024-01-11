import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions } from "@angular/material/dialog";
import { MatDialogClose } from "@angular/material/dialog";
import { MatDialogContent } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialogTitle } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'dialog-user',
    templateUrl: './dialog-user.component.html',
    styleUrl: './dialog-user.component.scss',
    standalone: true,
    imports: [
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class DialogUserComponent {

    constructor(public dialogRef: MatDialogRef<DialogUserComponent>) { }

    public form = new FormGroup({
        username: new FormControl('', [
            Validators.required,
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl('', [
            Validators.required,
        ]),
    });

    public submit(): void {
        this.dialogRef.close(this.form.value);
    }
}
