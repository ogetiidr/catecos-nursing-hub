import { useState } from "react";
import { motion } from "framer-motion";
import { useClerk, useUser } from "@clerk/react";
import {
  HeartPulse, LogOut, Users, MessageSquare, Star, BarChart3,
  CheckCheck, Mail, Phone, Clock, MapPin, X, Plus, Trash2,
  LayoutDashboard, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  useGetAdminStats,
  useListInquiries,
  useUpdateInquiry,
  useListTestimonials,
  useCreateTestimonial,
  useDeleteTestimonial,
  getListInquiriesQueryKey,
  getGetAdminStatsQueryKey,
  getListTestimonialsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

type Tab = "overview" | "inquiries" | "testimonials";

export default function AdminPage() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: stats } = useGetAdminStats();
  const { data: inquiries = [], isLoading: inquiriesLoading } = useListInquiries();
  const { data: testimonials = [], isLoading: testimonialsLoading } = useListTestimonials();

  const updateInquiry = useUpdateInquiry();
  const createTestimonial = useCreateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", message: "", rating: 5 });
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);

  const markAsRead = (id: number) => {
    updateInquiry.mutate(
      { id, data: { isRead: true } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getListInquiriesQueryKey() });
          qc.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
          toast({ title: "Inquiry marked as read" });
        },
      }
    );
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    createTestimonial.mutate(
      { data: newTestimonial },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
          qc.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
          setNewTestimonial({ name: "", role: "", message: "", rating: 5 });
          setShowAddTestimonial(false);
          toast({ title: "Testimonial added successfully!" });
        },
      }
    );
  };

  const handleDeleteTestimonial = (id: number) => {
    deleteTestimonial.mutate(
      { id },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
          qc.invalidateQueries({ queryKey: getGetAdminStatsQueryKey() });
          toast({ title: "Testimonial deleted" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-white border-b border-border/40 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm">Catecos Admin</span>
              <span className="text-xs text-muted-foreground block">Management Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.emailAddresses[0]?.emailAddress}</span>
            <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={() => signOut()}>
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-border/40 shadow-sm w-fit">
          {([
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "inquiries", label: `Inquiries ${stats?.unreadInquiries ? `(${stats.unreadInquiries})` : ""}`, icon: MessageSquare },
            { id: "testimonials", label: "Testimonials", icon: Star },
          ] as { id: Tab; label: string; icon: any }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Inquiries", value: stats?.totalInquiries ?? "—", icon: MessageSquare, color: "bg-blue-50 text-blue-600" },
                { label: "Unread Inquiries", value: stats?.unreadInquiries ?? "—", icon: Mail, color: "bg-amber-50 text-amber-600" },
                { label: "Services", value: stats?.totalServices ?? "—", icon: Settings, color: "bg-green-50 text-green-600" },
                { label: "Testimonials", value: stats?.totalTestimonials ?? "—", icon: Star, color: "bg-purple-50 text-purple-600" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border/40 shadow-sm p-6">
                  <div className={`h-12 w-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-border/40 shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Recent Inquiries</h3>
                {inquiries.slice(0, 3).map((inq: any) => (
                  <div key={inq.id} className={`flex items-center gap-3 py-3 border-b border-border/30 last:border-0 ${!inq.isRead ? "bg-blue-50/50 -mx-2 px-2 rounded-lg" : ""}`}>
                    <div className={`h-2 w-2 rounded-full ${!inq.isRead ? "bg-blue-500" : "bg-gray-300"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{inq.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{inq.message}</p>
                    </div>
                    {!inq.isRead && (
                      <Button size="sm" variant="ghost" className="shrink-0 text-xs" onClick={() => markAsRead(inq.id)}>Mark read</Button>
                    )}
                  </div>
                ))}
                <Button variant="link" className="mt-3 p-0 text-primary" onClick={() => setActiveTab("inquiries")}>View all inquiries →</Button>
              </div>
              <div className="bg-white rounded-2xl border border-border/40 shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><HeartPulse className="h-5 w-5 text-primary" /> Quick Actions</h3>
                <div className="space-y-3">
                  <a href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">View Public Site</p>
                      <p className="text-xs text-muted-foreground">See the site as visitors see it</p>
                    </div>
                  </a>
                  <button onClick={() => setActiveTab("testimonials")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                    <Star className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Add Testimonial</p>
                      <p className="text-xs text-muted-foreground">Add a new client review</p>
                    </div>
                  </button>
                  <a href={`tel:0758867235`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Quick Call</p>
                      <p className="text-xs text-muted-foreground">Call the main number</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Inquiries */}
        {activeTab === "inquiries" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Contact Inquiries</h2>
              {stats?.unreadInquiries ? (
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">{stats.unreadInquiries} unread</span>
              ) : null}
            </div>
            {inquiriesLoading ? (
              <div className="text-center py-20 text-muted-foreground">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border/40 shadow-sm p-16 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No inquiries yet. They'll appear here when visitors submit the contact form.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq: any) => (
                  <div key={inq.id} className={`bg-white rounded-2xl border shadow-sm p-6 ${!inq.isRead ? "border-blue-200 bg-blue-50/20" : "border-border/40"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!inq.isRead && <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />}
                          <span className="font-bold">{inq.name}</span>
                          {inq.service && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{inq.service}</span>}
                          {!inq.isRead && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">NEW</span>}
                        </div>
                        <p className="text-muted-foreground mb-3 leading-relaxed">{inq.message}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                            <Phone className="h-4 w-4" /> {inq.phone}
                          </a>
                          {inq.email && (
                            <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                              <Mail className="h-4 w-4" /> {inq.email}
                            </a>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" /> {new Date(inq.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {!inq.isRead && (
                        <Button size="sm" variant="outline" className="shrink-0 rounded-full gap-1" onClick={() => markAsRead(inq.id)}>
                          <CheckCheck className="h-4 w-4" /> Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Testimonials */}
        {activeTab === "testimonials" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Testimonials</h2>
              <Button className="rounded-full gap-2" onClick={() => setShowAddTestimonial(!showAddTestimonial)}>
                <Plus className="h-4 w-4" /> Add Testimonial
              </Button>
            </div>

            {showAddTestimonial && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-primary/20 shadow-lg p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Add New Testimonial</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Client Name *</label>
                    <Input value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} placeholder="Full name" className="rounded-xl h-11" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Role / Relationship</label>
                    <Input value={newTestimonial.role} onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })} placeholder="e.g. Patient, Daughter of patient" className="rounded-xl h-11" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-1 block">Rating (1-5) *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button key={r} onClick={() => setNewTestimonial({ ...newTestimonial, rating: r })} className={`h-9 w-9 rounded-full font-bold text-sm transition-all ${newTestimonial.rating >= r ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-400"}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium mb-1 block">Testimonial Message *</label>
                  <Textarea value={newTestimonial.message} onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })} placeholder="What did the client say about us?" className="rounded-xl min-h-[100px]" />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddTestimonial} disabled={createTestimonial.isPending} className="rounded-full">
                    {createTestimonial.isPending ? "Saving..." : "Save Testimonial"}
                  </Button>
                  <Button variant="outline" className="rounded-full" onClick={() => setShowAddTestimonial(false)}>Cancel</Button>
                </div>
              </motion.div>
            )}

            {testimonialsLoading ? (
              <div className="text-center py-20 text-muted-foreground">Loading testimonials...</div>
            ) : testimonials.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border/40 shadow-sm p-16 text-center">
                <Star className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No testimonials yet. Click "Add Testimonial" to add your first one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((t: any) => (
                  <div key={t.id} className="bg-white rounded-2xl border border-border/40 shadow-sm p-6 relative group">
                    <button onClick={() => handleDeleteTestimonial(t.id)} className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 items-center justify-center hidden group-hover:flex transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm italic mb-4 leading-relaxed">"{t.message}"</p>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
