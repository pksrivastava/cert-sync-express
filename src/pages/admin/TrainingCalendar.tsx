import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Plus, MapPin, Users, Building2, Edit, Trash2, Clock } from "lucide-react";

interface TrainingEvent {
  id: string;
  title: string;
  institution: string;
  type: "ATI" | "CTI" | "ISTM" | "Other";
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  enrolled: number;
  description: string;
}

export default function TrainingCalendar() {
  const [events, setEvents] = useState<TrainingEvent[]>([
    {
      id: "1",
      title: "Leadership Development Program",
      institution: "National Centre for Good Governance (NCGG)",
      type: "ATI",
      startDate: new Date(2025, 9, 15),
      endDate: new Date(2025, 9, 18),
      location: "New Delhi",
      capacity: 50,
      enrolled: 38,
      description: "Advanced leadership training for senior government officials"
    },
    {
      id: "2",
      title: "Digital Governance Workshop",
      institution: "Indian Institute of Public Administration (IIPA)",
      type: "CTI",
      startDate: new Date(2025, 9, 22),
      endDate: new Date(2025, 9, 24),
      location: "Mumbai",
      capacity: 40,
      enrolled: 40,
      description: "Hands-on training on digital transformation in government"
    }
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    institution: "",
    type: "ATI" as const,
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    capacity: 0,
    description: ""
  });

  const getInstitutionBadgeColor = (type: string) => {
    switch (type) {
      case "ATI": return "bg-blue-500";
      case "CTI": return "bg-green-500";
      case "ISTM": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const handleAddEvent = () => {
    const event: TrainingEvent = {
      id: Date.now().toString(),
      ...newEvent,
      enrolled: 0
    };
    setEvents([...events, event]);
    setIsAddDialogOpen(false);
    toast.success("Training event added successfully");
    setNewEvent({
      title: "",
      institution: "",
      type: "ATI",
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      capacity: 0,
      description: ""
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast.success("Training event deleted");
  };

  const upcomingEvents = events
    .filter(e => e.startDate >= new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Calendar</h1>
          <p className="text-muted-foreground">Manage training schedules for ATIs, CTIs, and government institutions</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Training Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Training Event</DialogTitle>
              <DialogDescription>Schedule a new training program for government officials</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Training Program Title *</Label>
                <Input
                  id="eventTitle"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g., Leadership Development Program"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution *</Label>
                  <Input
                    id="institution"
                    value={newEvent.institution}
                    onChange={(e) => setNewEvent({ ...newEvent, institution: e.target.value })}
                    placeholder="e.g., NCGG, IIPA, ISTM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Institution Type *</Label>
                  <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ATI">ATI - Administrative Training Institute</SelectItem>
                      <SelectItem value="CTI">CTI - Central Training Institute</SelectItem>
                      <SelectItem value="ISTM">ISTM - Govt Content Provider</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    value={newEvent.startDate.toISOString().split('T')[0]}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: new Date(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input
                    type="date"
                    value={newEvent.endDate.toISOString().split('T')[0]}
                    onChange={(e) => setNewEvent({ ...newEvent, endDate: new Date(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newEvent.capacity || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) })}
                    placeholder="50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Brief description of the training program"
                  rows={3}
                />
              </div>

              <Button onClick={handleAddEvent} className="w-full">
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Events List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Training Events</CardTitle>
            <CardDescription>Government training programs and workshops</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming training events</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <Card key={event.id} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getInstitutionBadgeColor(event.type)}>
                            {event.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            <Building2 className="h-3 w-3 inline mr-1" />
                            {event.institution}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{event.enrolled} / {event.capacity}</span>
                        <span className="text-muted-foreground">enrolled</span>
                      </div>
                      {event.enrolled >= event.capacity && (
                        <Badge variant="destructive">Full</Badge>
                      )}
                      {event.enrolled < event.capacity && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {event.capacity - event.enrolled} spots left
                        </Badge>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">
                        {event.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
