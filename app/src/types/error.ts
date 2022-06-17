export interface GenericResError {
  errors: {
    body: string[];
  };
}

export interface UnexpectedResError {
  status: string;
  message: string;
}
export interface ResError {
  name: string;
  status: number;
  message: string;
  data: GenericResError | UnexpectedResError;
}
