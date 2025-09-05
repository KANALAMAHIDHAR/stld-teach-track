import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Materials() {
  return (
    <Layout>
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Material</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">NO MATERIALS ARE POSTED YET</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
