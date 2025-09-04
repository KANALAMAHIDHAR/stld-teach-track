import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, FileText, TrendingUp } from 'lucide-react';

export default function Reports() {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <BarChart3 className="h-8 w-8" />
          Reports & Analytics
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quiz Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}