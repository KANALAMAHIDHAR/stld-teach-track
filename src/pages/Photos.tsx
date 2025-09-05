import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Photos() {
  return (
    <Layout>
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <p>No photos available.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
