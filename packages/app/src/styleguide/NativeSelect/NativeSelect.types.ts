export interface NormalizedNativeSelectOption {
  value: string;
  label: string;
}

export type NativeSelectOptions = Array<string | NormalizedNativeSelectOption>;
