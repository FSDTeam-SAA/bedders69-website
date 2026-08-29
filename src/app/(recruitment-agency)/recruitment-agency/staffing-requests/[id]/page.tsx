import StaffingRequestDetail from "@/features/recruitment-agency/staffing-requests/components/StaffingRequestDetail";

export default async function StaffingRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StaffingRequestDetail id={id} />;
}
