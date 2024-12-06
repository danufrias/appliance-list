import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppliancesService } from '../services/appliance.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-appliances-list',
    templateUrl: './appliances-list.component.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [
        TooltipModule,
        CommonModule,
        TableModule,
        InputTextModule,
        ProgressSpinnerModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
    ],
})
export class AppliancesListComponent implements OnInit {
    appliances: any[] = [];
    loading: boolean = true;

    firstRecord: number = 0;
    lastRecord: number = 0;

    selectedAppliance: any = null;
    displayDialog: boolean = false;

    constructor(private appliancesService: AppliancesService) {}

    ngOnInit(): void {
        this.fetchAppliances();
    }

    fetchAppliances(): void {
        this.loading = true;
        this.appliancesService
            .getAppliances(120)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (data) => {
                    this.appliances = data;
                    this.updatePageInfo({ first: 0, rows: 20 });
                },
                error: (error) => {
                    console.error('Error fetching appliances:', error);
                },
            });
    }

    updatePageInfo(event: { first: number; rows: number }): void {
        this.firstRecord = event.first;
        this.lastRecord = Math.min(event.first + event.rows, this.appliances.length);
    }

    openDialog(appliance: any): void {
        this.selectedAppliance = appliance;
        this.displayDialog = true;
    }

    closeDialog(): void {
        this.displayDialog = false;
        this.selectedAppliance = null;

        setTimeout(() => {
            this.loading = false;
        }, 100);
    }
}