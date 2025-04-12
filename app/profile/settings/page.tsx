"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ProfileSidebar } from "@/components/profile-sidebar"
import {
  Bell,
  Lock,
  Trash2,
  Globe,
  Volume2,
  Subtitles,
  MonitorSmartphone,
  Moon,
  Shield,
  UserPlus,
  Mail,
} from "lucide-react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [autoplay, setAutoplay] = useState(true)
  const [subtitles, setSubtitles] = useState(false)
  const [language, setLanguage] = useState("english")
  const [videoQuality, setVideoQuality] = useState("auto")
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProfileSidebar activePage="settings" />

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            {/* Account Settings */}
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>

              <div className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <Lock className="h-4 w-4 mr-2" /> Change Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Update Password</Button>
                  </div>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-2" /> Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                    <span className="text-sm font-medium">{twoFactorAuth ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>

                <Separator />

                {/* Connected Accounts */}
                <div>
                  <h3 className="font-medium flex items-center mb-4">
                    <UserPlus className="h-4 w-4 mr-2" /> Connected Accounts
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                          f
                        </div>
                        <div>
                          <p className="font-medium">Facebook</p>
                          <p className="text-xs text-muted-foreground">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                          g
                        </div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-xs text-muted-foreground">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                          a
                        </div>
                        <div>
                          <p className="font-medium">Apple</p>
                          <p className="text-xs text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Delete Account */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                    </h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Notification Settings</h2>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2" /> Email Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">Receive updates and newsletters via email</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    <span className="text-sm font-medium">{emailNotifications ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Bell className="h-4 w-4 mr-2" /> Push Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">Get notified about new releases and updates</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    <span className="text-sm font-medium">{pushNotifications ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>

                <Separator />

                {/* Notification Types */}
                <div>
                  <h3 className="font-medium mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Releases</p>
                        <p className="text-xs text-muted-foreground">
                          Get notified when new movies or episodes are released
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recommendations</p>
                        <p className="text-xs text-muted-foreground">Get personalized movie and show recommendations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Account Updates</p>
                        <p className="text-xs text-muted-foreground">Get notified about account and billing changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Preferences</h2>

              <div className="space-y-6">
                {/* Language */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Globe className="h-4 w-4 mr-2" /> Language
                    </h3>
                    <p className="text-sm text-muted-foreground">Select your preferred language</p>
                  </div>
                  <select
                    className="bg-background border rounded px-2 py-1"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="japanese">Japanese</option>
                    <option value="chinese">Chinese</option>
                  </select>
                </div>

                <Separator />

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Moon className="h-4 w-4 mr-2" /> Dark Mode
                    </h3>
                    <p className="text-sm text-muted-foreground">Toggle dark mode for the interface</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    <span className="text-sm font-medium">{darkMode ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>

                <Separator />

                {/* Autoplay */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <MonitorSmartphone className="h-4 w-4 mr-2" /> Autoplay
                    </h3>
                    <p className="text-sm text-muted-foreground">Automatically play next episode</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={autoplay} onCheckedChange={setAutoplay} />
                    <span className="text-sm font-medium">{autoplay ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>

                <Separator />

                {/* Subtitles */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Subtitles className="h-4 w-4 mr-2" /> Subtitles
                    </h3>
                    <p className="text-sm text-muted-foreground">Default subtitle settings</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={subtitles} onCheckedChange={setSubtitles} />
                    <span className="text-sm font-medium">{subtitles ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>

                <Separator />

                {/* Video Quality */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center">
                      <Volume2 className="h-4 w-4 mr-2" /> Video Quality
                    </h3>
                    <p className="text-sm text-muted-foreground">Set default streaming quality</p>
                  </div>
                  <select
                    className="bg-background border rounded px-2 py-1"
                    value={videoQuality}
                    onChange={(e) => setVideoQuality(e.target.value)}
                  >
                    <option value="auto">Auto</option>
                    <option value="high">High (HD)</option>
                    <option value="medium">Medium (SD)</option>
                    <option value="low">Low (Data Saver)</option>
                  </select>
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

