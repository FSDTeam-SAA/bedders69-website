export type AccountType =
  | "user"
  | "care_company"
  | "agency"
  | "carer"
  | "supplier"
  | "service_provider";

export interface AccountTypeOption {
  id: AccountType;
  title: string;
  description: string;
  iconType: "user" | "care_company" | "agency" | "carer" | "supplier" | "service_provider";
}
