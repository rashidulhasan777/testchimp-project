import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [],
  exports: [
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class MaterialModule {}
