export interface UploadedFileItem {
  name: string;
  size: string;
  type: string;
}

export interface UploadDocumentsState {
  cvResume: File | null;
  supportingDocuments: File[];
}
