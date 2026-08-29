import SavedCarerDetail from "@/features/care-company/saved-carers/components/SavedCarerDetail";

export default async function SavedCarerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SavedCarerDetail id={id} />;
}
