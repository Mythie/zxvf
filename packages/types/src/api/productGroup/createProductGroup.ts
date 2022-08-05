import { TBaseProductGroup, TProductGroup } from '../../models';

export interface CreateProductGroupRequest extends TBaseProductGroup {
  id?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateProductGroupResponse extends TProductGroup {}
