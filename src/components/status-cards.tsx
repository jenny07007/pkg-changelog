import { Card, CardContent } from "@/components/ui/card";

interface PackageCardProps {
  packageName: string;
}

export function ErrorCard({ packageName }: PackageCardProps) {
  return (
    <Card className="text-center py-8">
      <CardContent>
        <p className="text-red-400 mb-2">Failed to load changelog</p>
        <p className="text-gray-500 text-sm">
          Package "{packageName}" might not exist or there was a network error.
        </p>
      </CardContent>
    </Card>
  );
}

export function NoChangelogCard({ packageName }: PackageCardProps) {
  return (
    <Card className="text-center py-8">
      <CardContent>
        <p className="text-gray-300 mb-2">No changelog found</p>
        <p className="text-gray-500 text-sm">
          The package "{packageName}" doesn't have a CHANGELOG.md file or uses a
          different changelog format.
        </p>
      </CardContent>
    </Card>
  );
}

export function PlaceholderCard() {
  return (
    <Card className="text-center py-8">
      <CardContent>
        <p className="text-gray-400">
          Enter a package name to view its changelog
        </p>
      </CardContent>
    </Card>
  );
}
