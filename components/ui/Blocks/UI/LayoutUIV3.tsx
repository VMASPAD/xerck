import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/Separator"
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  Inbox,
  MailPlus,
  MessageSquare,
  MoreVertical,
  PenSquare,
  Search,
  Send,
  Star,
  Trash2,
} from "lucide-react"

export default function LayoutUIV3() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r p-4">
        <Button className="w-full justify-start gap-2 mb-6" variant="default">
          <MailPlus className="h-4 w-4" />
          Compose
        </Button>

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <Inbox className="h-4 w-4" />
            Inbox
            <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2">24</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <Star className="h-4 w-4" />
            Starred
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <Clock className="h-4 w-4" />
            Snoozed
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <Send className="h-4 w-4" />
            Sent
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <Archive className="h-4 w-4" />
            Archived
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <Trash2 className="h-4 w-4" />
            Trash
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <h3 className="px-3 text-sm font-medium">Labels</h3>
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Work
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Personal
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            Important
          </Button>
        </div>
      </div>

      {/* Email List */}
      <div className="w-full md:w-80 lg:w-96 border-r bg-white">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search emails..."
              className="w-full bg-gray-100 pl-8 focus-visible:ring-0 border-none"
            />
          </div>
        </div>

        <div className="overflow-auto h-[calc(100vh-73px)]">
          <div className="border-b cursor-pointer hover:bg-gray-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-xs text-muted-foreground">10:42 AM</div>
              </div>
              <div className="font-medium text-sm mb-1">Project Update: Q2 Marketing Plan</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                Hi Team, I wanted to share the latest updates on our Q2 marketing strategy. We've made significant
                progress on...
              </div>
            </div>
          </div>

          <div className="border-b cursor-pointer bg-gray-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">Michael Chen</div>
                <div className="text-xs text-muted-foreground">9:15 AM</div>
              </div>
              <div className="font-medium text-sm mb-1">Re: Client Meeting Notes</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                Thanks for sharing the notes. I've reviewed them and have a few questions about the timeline. Can we
                discuss this...
              </div>
            </div>
          </div>

          <div className="border-b cursor-pointer hover:bg-gray-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">Alex Rodriguez</div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
              <div className="font-medium text-sm mb-1">New Product Launch</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                Hello everyone, I'm excited to announce that we'll be launching our new product line next month. Please
                review the...
              </div>
            </div>
          </div>

          <div className="border-b cursor-pointer hover:bg-gray-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">Emily Wilson</div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
              <div className="font-medium text-sm mb-1">Team Lunch - Friday</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                Hi all, Just a reminder that we'll be having our monthly team lunch this Friday at 12:30 PM. Please let
                me know if...
              </div>
            </div>
          </div>

          <div className="border-b cursor-pointer hover:bg-gray-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">David Kim</div>
                <div className="text-xs text-muted-foreground">Mar 15</div>
              </div>
              <div className="font-medium text-sm mb-1">Budget Approval</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                Hello, I've reviewed the budget proposal for Q2 and everything looks good. I've approved it and
                forwarded it to...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="hidden lg:block flex-1 bg-white overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michael Chen" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">Re: Client Meeting Notes</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span className="font-medium text-foreground">Michael Chen</span>
                  <span>&lt;michael.chen@example.com&gt;</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>To: me, team@example.com</span>
                  <span>•</span>
                  <span>Mar 16, 2023, 9:15 AM</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="lg">
                <ArchiveX className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="lg">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="lg">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border-none shadow-none">
            <CardContent className="p-0 text-sm space-y-4">
              <p>Hi Team,</p>
              <p>
                Thanks for sharing the notes. I've reviewed them and have a few questions about the timeline. Can we
                discuss this during our next meeting?
              </p>
              <p>
                Also, I noticed that we didn't address the client's concerns about the mobile experience. I think we
                should prioritize this in our next sprint.
              </p>
              <p>
                I've attached a document with some additional thoughts and suggestions. Please review it when you have a
                chance and let me know what you think.
              </p>
              <p>
                Best regards,
                <br />
                Michael Chen
                <br />
                Product Manager
                <br />
                Example Company
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your Avatar" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Reply to Michael Chen</span>
              </div>
            </div>
            <div className="min-h-[100px] border-b mb-4">
              <div className="text-sm text-muted-foreground p-2">Type your reply here...</div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <PenSquare className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline" size="sm">
                  <Forward className="h-4 w-4 mr-2" />
                  Forward
                </Button>
              </div>
              <Button size="sm">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view for email content */}
      <div className="lg:hidden flex-1 bg-white p-4 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Select an email to view</h3>
          <p className="text-sm text-muted-foreground">Choose an email from the list to view its contents.</p>
        </div>
      </div>
    </div>
  )
}

