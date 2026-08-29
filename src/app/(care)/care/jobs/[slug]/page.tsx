import { CarerJobDetailPage } from "@/features/carers/jobs/components/carer-job-detail-page";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CarerJobDetailPage slug={slug} />;
}
