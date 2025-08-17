import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1200;">
      <ngb-toast
        *ngFor="let toast of toastService.toasts; trackBy: trackByFn"
        [class]="'text-bg-' + getBootstrapClass(toast.type)"
        [autohide]="toast.autohide"
        [delay]="toast.delay || 5000"
        (hidden)="toastService.remove(toast.id)"
      >
        <div class="d-flex">
          <div class="toast-body">
            <i [class]="getIconClass(toast.type)" class="me-2"></i>
            {{ toast.message }}
          </div>
          <button 
            type="button" 
            class="btn-close btn-close-white me-2 m-auto" 
            (click)="toastService.remove(toast.id)"
            aria-label="Close">
          </button>
        </div>
      </ngb-toast>
    </div>
  `,
  styles: [`
    .toast-container {
      min-width: 300px;
    }
    
    .toast-body {
      display: flex;
      align-items: center;
    }

    .text-bg-error {
      background-color: #dc3545 !important;
      color: white !important;
    }
  `]
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}

  trackByFn(index: number, toast: any) {
    return toast.id;
  }

  getBootstrapClass(type: string): string {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'secondary';
    }
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success': return 'bi bi-check-circle-fill';
      case 'error': return 'bi bi-exclamation-triangle-fill';
      case 'warning': return 'bi bi-exclamation-triangle-fill';
      case 'info': return 'bi bi-info-circle-fill';
      default: return 'bi bi-info-circle';
    }
  }
}