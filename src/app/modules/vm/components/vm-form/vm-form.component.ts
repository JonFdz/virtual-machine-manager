import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VmService } from '@vm/services/vm.service';
import { VmStatus } from '@shared/interfaces/vm.interfaces';



@Component({
	selector: 'app-vm-form',
	templateUrl: './vm-form.component.html',
	styleUrls: ['./vm-form.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule]
})
export class VmFormComponent implements OnInit {
	vmForm: FormGroup;
	isEdit: boolean = false;
	vmId: string | null = null;
	vmStatuses = Object.values(VmStatus);

	constructor(
		private fb: FormBuilder,
		private vmService: VmService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.vmForm = this.fb.group({
			vmName: [null, Validators.required],
			ip: [null, Validators.required],
			dnsName: [null, Validators.required],
			project: [null],
			environment: [null],
			status: [null, Validators.required],
			comment: [null],
			reservedUserName: [null],
			reservedTo: [null],
			operatingSystem: [null],
			cpuCores: [null],
			gpu: [null],
			ram: [null],
			disk: [null]
		});
	}

	ngOnInit(): void {
		this.vmId = this.route.snapshot.paramMap.get('id');
		if (this.vmId) {
			this.isEdit = true;
			this.vmService.getVm(+this.vmId).subscribe(data => {
				this.vmForm.patchValue(data);
			});
		}
	}

	onSubmit(): void {

		if (this.vmForm.valid) {
			if (this.isEdit && this.vmId) {
				this.vmForm.value.updatedAt = new Date();
				this.vmService.updateVm(+this.vmId, this.vmForm.value).subscribe(() => {
					this.router.navigate(['/']);
				});
			} else {
				this.vmForm.value.createdAt = new Date();
				this.vmForm.value.updatedAt = new Date();
				this.vmService.createVm(this.vmForm.value).subscribe(() => {
					this.router.navigate(['/']);
				});
			}
		}
	}
}
