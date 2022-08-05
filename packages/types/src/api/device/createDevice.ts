import { TBaseDevice, TDevice } from '../../models';

export interface CreateDeviceRequest extends TBaseDevice {
  id?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateDeviceResponse extends TDevice {}
