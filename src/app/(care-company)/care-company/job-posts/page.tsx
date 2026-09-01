import React from "react";
import JobPosts from "@/features/care-company/job-posts/components/JobPosts";

export const metadata = {
  title: "My Job Posts | Care Company Dashboard",
  description: "View and manage your organization's posted jobs",
};

export default function JobPostsPage() {
  return <JobPosts />;
}
