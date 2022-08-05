import { VNode } from 'vue';

export const TOAST_PROVIDER = Symbol('TOAST_PROVIDER');

export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastMessage {
  message: string | VNode;
  type: 'default' | 'success' | 'error' | 'warning' | 'info';
  position: ToastPosition;
  duration: number;
}

export interface ToastMessageWithId extends ToastMessage {
  id: string;
}

export interface ToastInject {
  addToast: (_message: ToastMessage | ToastMessageWithId) => void;
  removeToast: (_id: string, _position: ToastPosition) => void;
}
