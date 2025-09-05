import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Help() {
  return (
    <Layout>
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>If any problem contact:</p>
              <p>1) Mahidhar - 9390221684</p>
              <p>2) Pawan - 9515576179</p>
              <p>3) Heganeswar - 8919465798</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
