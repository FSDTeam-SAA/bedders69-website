import type { Metadata } from "next";
import CoursesCatalogue from "./courses-catalogue";

export const metadata: Metadata = {
  title: "Health & Social Care Courses | The Care Directory",
  description: "Browse Health and Social Care training courses from The Care Directory.",
};

export default function CoursesPage() {
  return <CoursesCatalogue />;
}
