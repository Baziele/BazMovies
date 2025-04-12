"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Lock, CheckCircle2, Download, ArrowRight, Plus } from "lucide-react"

export default function BillingPage() {
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242")
  const [cardName, setCardName] = useState("John Doe")
  const [expiryDate, setExpiryDate] = useState("12/25")
  const [cvv, setCvv] = useState("")

  // Simulated billing history
  const billingHistory = [
    { id: "INV-001", date: "Mar 15, 2023", amount: "$14.99", status: "Paid" },
    { id: "INV-002", date: "Feb 15, 2023", amount: "$14.99", status: "Paid" },
    { id: "INV-003", date: "Jan 15, 2023", amount: "$14.99", status: "Paid" },
    { id: "INV-004", date: "Dec 15, 2022", amount: "$14.99", status: "Paid" },
    { id: "INV-005", date: "Nov 15, 2022", amount: "$14.99", status: "Paid" },
  ]

  // Subscription plans
  const plans = [
    {
      name: "Basic",
      price: "$8.99",
      features: ["HD streaming", "Watch on 1 device at a time", "Limited content library", "Ad-supported"],
      current: false,
    },
    {
      name: "Premium",
      price: "$14.99",
      features: [
        "4K Ultra HD streaming",
        "Watch on 4 devices at a time",
        "Full content library",
        "Ad-free experience",
        "Offline downloads",
      ],
      current: true,
    },
    {
      name: "Family",
      price: "$19.99",
      features: [
        "4K Ultra HD streaming",
        "Watch on 6 devices at a time",
        "Full content library",
        "Ad-free experience",
        "Offline downloads",
        "Parental controls",
        "Multiple profiles",
      ],
      current: false,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar activePage="billing" />

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Billing & Subscription</h1>

            {/* Current Plan */}
            <div className="bg-card border rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold mb-1">Current Plan: Premium</h2>
                  <p className="text-muted-foreground">Your subscription renews on April 15, 2023</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="destructive">Cancel Subscription</Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`border rounded-lg p-4 ${plan.current ? "border-primary bg-primary/5" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <p className="text-2xl font-bold">
                          {plan.price}
                          <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </p>
                      </div>
                      {plan.current && (
                        <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
                          Current Plan
                        </div>
                      )}
                    </div>

                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {!plan.current && (
                      <Button variant="outline" className="w-full">
                        {plan.price < "$14.99" ? "Downgrade" : "Upgrade"}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">{cardNumber}</p>
                          <p className="text-xs text-muted-foreground">Expires {expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Lock className="h-3 w-3 mr-1" /> Your payment information is stored securely
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add New Payment Method
                  </Button>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium mb-4">Update Payment Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                      </div>
                    </div>

                    <Button className="w-full">Update Payment Method</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Billing History</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Invoice</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{invoice.id}</td>
                        <td className="py-3 px-4">{invoice.date}</td>
                        <td className="py-3 px-4">{invoice.amount}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-center">
                <Button variant="link">
                  View All Invoices <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

