import CarerDetail from "@/features/recruitment-agency/carer-directory/components/CarerDetail";

export default async function CarerDirectoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CarerDetail id={id} />;
}
