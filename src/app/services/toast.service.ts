import { Injectable } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  autohide: boolean;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];
  private idCounter = 0;

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', autohide: boolean = true, delay: number = 5000) {
    const id = `toast-${++this.idCounter}`;
    const toast: Toast = {
      id,
      message,
      type,
      autohide,
      delay
    };
    
    this.toasts.push(toast);
    
    if (autohide) {
      setTimeout(() => this.remove(id), delay);
    }
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showWarning(message: string) {
    this.show(message, 'warning');
  }

  remove(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  clear() {
    this.toasts = [];
  }
}