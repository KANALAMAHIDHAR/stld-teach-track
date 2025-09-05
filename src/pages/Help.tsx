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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <p className="text-xs uppercase opacity-80">Head</p>
                  <h3 className="text-lg font-semibold">Mahidhar</h3>
                  <p className="text-sm">Phone: 9390221684</p>
                </CardContent>
              </Card>
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <p className="text-xs uppercase opacity-80">Co-Head</p>
                  <h3 className="text-lg font-semibold">Pawan</h3>
                  <p className="text-sm">Phone: 9515576179</p>
                </CardContent>
              </Card>
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <p className="text-xs uppercase opacity-80">Admin</p>
                  <h3 className="text-lg font-semibold">Heganeswar</h3>
                  <p className="text-sm">Phone: 8919465798</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
