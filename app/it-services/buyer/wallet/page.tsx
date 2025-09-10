"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Calendar,
  Download,
  Trash2,
  Edit,
  Shield,
} from "lucide-react"

const transactions = [
  {
    id: "TXN001",
    type: "payment",
    description: "Payment to Sarah Wilson - Logo Design",
    amount: -299,
    date: "Dec 15, 2024",
    status: "completed",
    orderId: "#12345",
  },
  {
    id: "TXN002",
    type: "refund",
    description: "Refund from cancelled order",
    amount: 599,
    date: "Dec 12, 2024",
    status: "completed",
    orderId: "#12342",
  },
  {
    id: "TXN003",
    type: "payment",
    description: "Payment to Mike Johnson - Website Development",
    amount: -1299,
    date: "Dec 10, 2024",
    status: "completed",
    orderId: "#12344",
  },
  {
    id: "TXN004",
    type: "deposit",
    description: "Wallet top-up via Credit Card",
    amount: 500,
    date: "Dec 8, 2024",
    status: "completed",
    orderId: null,
  },
]

const paymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "8888",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
]

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [topUpAmount, setTopUpAmount] = useState("")

  const walletBalance = 1247.5
  const pendingAmount = 299.0
  const totalSpent = 2847.0

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Wallet & Payments
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
              Manage your balance and payment methods
            </p>
          </div>

          <div className="flex sm:justify-end">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold">
                ${walletBalance.toFixed(2)}
              </div>
              <p className="text-emerald-100 text-sm mt-1">Ready to spend</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Pending Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                ${pendingAmount.toFixed(2)}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                In escrow
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                ${totalSpent.toFixed(2)}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                This year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="w-full relative z-10 flex-wrap sm:flex-nowrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="topUpAmount"
                      className="dark:text-gray-200"
                    >
                      Add Funds to Wallet
                    </Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        id="topUpAmount"
                        placeholder="Enter amount"
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        className="dark:bg-gray-800 dark:text-gray-100"
                      />
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
                        Add Funds
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent dark:bg-transparent dark:border-gray-700 dark:text-gray-100"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Statement
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent dark:bg-transparent dark:border-gray-700 dark:text-gray-100"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 4).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === "payment"
                                ? "bg-red-100 dark:bg-red-900"
                                : transaction.type === "refund"
                                ? "bg-green-100 dark:bg-green-900"
                                : "bg-blue-100 dark:bg-blue-900"
                            }`}
                          >
                            {transaction.type === "payment" ? (
                              <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                            ) : transaction.type === "refund" ? (
                              <ArrowDownLeft className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.amount > 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}$
                            {Math.abs(transaction.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="pt-6">
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Transaction History
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent dark:bg-transparent dark:border-gray-700 dark:text-gray-100 w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={transaction.id}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-3">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              transaction.type === "payment"
                                ? "bg-red-100 dark:bg-red-900"
                                : transaction.type === "refund"
                                ? "bg-green-100 dark:bg-green-900"
                                : "bg-blue-100 dark:bg-blue-900"
                            }`}
                          >
                            {transaction.type === "payment" ? (
                              <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                            ) : transaction.type === "refund" ? (
                              <ArrowDownLeft className="w-5 h-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {transaction.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                              <span>{transaction.id}</span>
                              {transaction.orderId && <span>{transaction.orderId}</span>}
                              <span>{transaction.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-lg font-semibold ${
                              transaction.amount > 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}$
                            {Math.abs(transaction.amount)}
                          </p>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mt-1">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                      {index < transactions.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="pt-6">
            <div className="space-y-6">
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Payment Methods
                  </CardTitle>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Card
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div key={method.id}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {method.brand.toUpperCase()} •••• {method.last4}
                                </p>
                                {method.isDefault && (
                                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Expires {method.expiryMonth.toString().padStart(2, "0")}/
                                {method.expiryYear}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent dark:bg-transparent dark:border-gray-700 dark:text-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent dark:bg-transparent dark:border-gray-700 dark:text-gray-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {index < paymentMethods.length - 1 && <div className="h-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900 dark:text-blue-200">
                        Your payments are secure
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        We use industry-standard encryption to protect your payment information.
                        Your card details are never stored on our servers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
