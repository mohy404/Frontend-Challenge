"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProductsTable from "@/components/dashboard/ProductsTable";

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* العنوان الرئيسي */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
        <span className="mr-3">📊</span> Dashboard Overview
      </h1>

      {/* بطاقة نظرة عامة */}
      <Card className="shadow-lg border border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center">
            <span className="mr-2">📈</span> Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600 text-lg">
              Manage your products and track important metrics effortlessly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* إحصائية 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-blue-700 font-bold text-2xl">120</h3>
                <p className="text-gray-600 mt-2">Total Products</p>
              </div>
              {/* إحصائية 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-green-700 font-bold text-2xl">85%</h3>
                <p className="text-gray-600 mt-2">Engagement Rate</p>
              </div>
              {/* إحصائية 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-purple-700 font-bold text-2xl">1,200</h3>
                <p className="text-gray-600 mt-2">Daily Visits</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول المنتجات */}
      <div className="mt-8">
       
        <ProductsTable />
      </div>
    </div>
  );
}