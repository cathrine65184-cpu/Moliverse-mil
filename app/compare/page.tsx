import CompareClient from "./CompareClient";

export default function ComparePage({
  searchParams,
}: {
  searchParams: { topic?: string };
}) {
  return <CompareClient initialTopic={searchParams.topic ?? ""} />;
}
