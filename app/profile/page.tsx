"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileSidebar } from "@/components/profile-sidebar"

export default function ProfilePage() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [bio, setBio] = useState("")

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar activePage="profile" />

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>

            <div className="bg-card border rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
                    <Image src="/placeholder.svg?height=200&width=200" alt="Profile" fill className="object-cover" />
                    <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium">Change</span>
                    </button>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Upload Photo
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself and your movie preferences..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Account Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Membership</h3>
                    <p className="text-sm text-muted-foreground">Premium Plan</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile/billing">Manage</Link>
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile/settings">Change</Link>
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Connected Accounts</h3>
                    <p className="text-sm text-muted-foreground">Google, Facebook</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile/settings">Manage</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

