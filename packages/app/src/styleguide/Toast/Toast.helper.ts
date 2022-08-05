import { ToastInject, ToastMessage } from './Toast.types';

const makeToast = (
  toastProvider?: ToastInject,
  message: ToastMessage['message'],
  type: ToastMessage['type'] = 'default',
  position: ToastMessage['position'] = 'bottom-right',
  duration: ToastMessage['duration'] = 3000,
) => {
  if (!toastProvider) {
    console.warn('ToastProvider is not available');

    return;
  }

  toastProvider.addToast({
    message,
    type,
    position,
    duration,
  });
};

export const useToast = (toastProvider?: ToastInject) => {
  const $toast = (
    message: ToastMessage['message'],
    type: ToastMessage['type'] = 'default',
    position: ToastMessage['position'] = 'bottom-right',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, type, position, duration);

  $toast.make = (
    message: ToastMessage['message'],
    type: ToastMessage['type'] = 'default',
    position: ToastMessage['position'] = 'bottom-right',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, type, position, duration);

  $toast.topLeft = (
    message: ToastMessage['message'],
    type: ToastMessage['type'] = 'default',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, type, 'top-left', duration);

  $toast.topRight = (
    message: ToastMessage['message'],
    type: ToastMessage['type'] = 'default',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, type, 'top-right', duration);

  $toast.bottomLeft = (
    message: ToastMessage['message'],
    type: ToastMessage['type'] = 'default',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, type, 'bottom-left', duration);

  $toast.bottomRight = (
    message: ToastMessage['message'],
    type: ToastMessage['type'] = 'default',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, type, 'bottom-right', duration);

  $toast.default = (
    message: ToastMessage['message'],
    position: ToastMessage['position'] = 'bottom-right',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, 'default', position, duration);

  $toast.success = (
    message: ToastMessage['message'],
    position: ToastMessage['position'] = 'bottom-right',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, 'success', position, duration);

  $toast.error = (
    message: ToastMessage['message'],
    position: ToastMessage['position'] = 'bottom-right',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, 'error', position, duration);

  $toast.warning = (
    message: ToastMessage['message'],
    position: ToastMessage['position'] = 'bottom-right',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, 'warning', position, duration);

  $toast.info = (
    message: ToastMessage['message'],
    position: ToastMessage['position'] = 'bottom-right',
    duration: ToastMessage['duration'] = 3000,
  ) => makeToast(toastProvider, message, 'info', position, duration);

  return $toast;
};
