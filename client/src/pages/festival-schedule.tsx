import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/theme-provider";
import { cn, parseTime, formatDuration, getStageColor, checkTimeOverlap } from "@/lib/utils";
import { parseSetlistData, setlistData } from "@/lib/festival-data";
import { Artist } from "@shared/schema";
import { Music, Search, Download, Moon, Sun, Calendar, Clock, MapPin, Star, AlertTriangle, Check, X } from "lucide-react";

export default function FestivalSchedule() {
  const { theme, setTheme } = useTheme();
  const [selectedArtists, setSelectedArtists] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [dayFilter, setDayFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [conflictDetails, setConflictDetails] = useState<{
    newArtist: Artist;
    conflictingArtist: Artist;
  } | null>(null);
  const [currentView, setCurrentView] = useState<"browse" | "schedule">("browse");
  const [scheduleDay, setScheduleDay] = useState("Friday 27 June");

  // Parse festival data
  const allArtists = useMemo(() => parseSetlistData(setlistData), []);

  // Load selected artists from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('glastonbury-selected');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedArtists(new Set(parsed));
      } catch (error) {
        console.error('Failed to parse saved selections:', error);
      }
    }
  }, []);

  // Save to localStorage when selections change
  useEffect(() => {
    localStorage.setItem('glastonbury-selected', JSON.stringify([...selectedArtists]));
  }, [selectedArtists]);

  // Filter artists based on search and filters
  const filteredArtists = useMemo(() => {
    let filtered = allArtists;

    if (searchQuery) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.stage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dayFilter !== "all") {
      filtered = filtered.filter(artist => artist.day.toLowerCase().includes(dayFilter));
    }

    if (stageFilter !== "all") {
      filtered = filtered.filter(artist => artist.stage === stageFilter);
    }

    return filtered;
  }, [allArtists, searchQuery, dayFilter, stageFilter]);

  // Group artists by day and stage
  const groupedArtists = useMemo(() => {
    const grouped: Record<string, Record<string, Artist[]>> = {};
    
    filteredArtists.forEach(artist => {
      if (!grouped[artist.day]) {
        grouped[artist.day] = {};
      }
      if (!grouped[artist.day][artist.stage]) {
        grouped[artist.day][artist.stage] = [];
      }
      grouped[artist.day][artist.stage].push(artist);
    });

    // Sort artists within each stage by time
    Object.values(grouped).forEach(dayData => {
      Object.values(dayData).forEach(stageArtists => {
        stageArtists.sort((a, b) => a.startTime.localeCompare(b.startTime));
      });
    });

    return grouped;
  }, [filteredArtists]);

  // Get selected artists for schedule view
  const selectedArtistsList = useMemo(() => {
    return allArtists.filter(artist => selectedArtists.has(artist.id));
  }, [allArtists, selectedArtists]);

  // Check for conflicts when adding an artist
  const checkConflicts = (newArtist: Artist): Artist | null => {
    for (const selectedId of selectedArtists) {
      const selectedArtist = allArtists.find(a => a.id === selectedId);
      if (!selectedArtist || selectedArtist.day !== newArtist.day) continue;

      if (checkTimeOverlap(
        newArtist.startTime,
        newArtist.endTime,
        selectedArtist.startTime,
        selectedArtist.endTime
      )) {
        return selectedArtist;
      }
    }
    return null;
  };

  // Toggle artist selection
  const toggleArtist = (artist: Artist) => {
    if (selectedArtists.has(artist.id)) {
      setSelectedArtists(prev => {
        const newSet = new Set(prev);
        newSet.delete(artist.id);
        return newSet;
      });
    } else {
      const conflict = checkConflicts(artist);
      if (conflict) {
        setConflictDetails({ newArtist: artist, conflictingArtist: conflict });
        setConflictModalOpen(true);
      } else {
        setSelectedArtists(prev => new Set([...prev, artist.id]));
      }
    }
  };

  // Handle conflict resolution
  const handleConflictResolution = (action: 'keep-both' | 'replace') => {
    if (!conflictDetails) return;

    if (action === 'keep-both') {
      setSelectedArtists(prev => new Set([...prev, conflictDetails.newArtist.id]));
    } else if (action === 'replace') {
      setSelectedArtists(prev => {
        const newSet = new Set(prev);
        newSet.delete(conflictDetails.conflictingArtist.id);
        newSet.add(conflictDetails.newArtist.id);
        return newSet;
      });
    }

    setConflictModalOpen(false);
    setConflictDetails(null);
  };

  // Export schedule
  const exportSchedule = () => {
    const selected = selectedArtistsList.sort((a, b) => {
      const dayOrder = { 
        'Thursday 26 June': 0, 
        'Friday 27 June': 1, 
        'Saturday 28 June': 2, 
        'Sunday 29 June': 3 
      };
      const dayDiff = (dayOrder[a.day as keyof typeof dayOrder] || 0) - (dayOrder[b.day as keyof typeof dayOrder] || 0);
      if (dayDiff !== 0) return dayDiff;
      return a.startTime.localeCompare(b.startTime);
    });

    let content = "My Glastonbury 2025 Schedule\n\n";
    
    const dayGroups: Record<string, Artist[]> = {};
    selected.forEach(artist => {
      if (!dayGroups[artist.day]) {
        dayGroups[artist.day] = [];
      }
      dayGroups[artist.day].push(artist);
    });

    Object.entries(dayGroups).forEach(([day, artists]) => {
      content += `${day}\n${'='.repeat(day.length)}\n\n`;
      artists.forEach(artist => {
        const stageName = artist.stage.charAt(0).toUpperCase() + artist.stage.slice(1).replace('-', ' ');
        content += `${artist.startTime} - ${artist.endTime}: ${artist.name} (${stageName})\n`;
      });
      content += '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'glastonbury-2025-schedule.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get stage display name
  const getStageDisplayName = (stage: string): string => {
    return stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ') + ' Stage';
  };

  // Get schedule for specific day
  const getScheduleForDay = (day: string) => {
    return selectedArtistsList
      .filter(artist => artist.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-pink-50 dark:from-purple-950 dark:via-slate-900 dark:to-indigo-950 transition-all duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-800/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Glastonbury 2025</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {selectedArtists.size} artists selected
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="rounded-full sm:hidden"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button onClick={exportSchedule} className="bg-purple-600 hover:bg-purple-700 text-sm px-3">
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Search Bar (Mobile Prominent) */}
        <div className="mb-4 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search artists or stages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-700/30"
            />
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden sm:block mb-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search artists or stages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-700/30"
            />
          </div>
        </div>

        {/* View Toggle and Filters */}
        <div className="space-y-4 mb-6">
          {/* View Toggle */}
          <div className="flex items-center justify-center sm:justify-start">
            <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as "browse" | "schedule")}>
              <TabsList className="bg-white/50 dark:bg-slate-800/50">
                <TabsTrigger value="browse" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Browse</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">My Schedule</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center">
            <Select value={dayFilter} onValueChange={setDayFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="All Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                <SelectItem value="thursday">Thursday 26</SelectItem>
                <SelectItem value="friday">Friday 27</SelectItem>
                <SelectItem value="saturday">Saturday 28</SelectItem>
                <SelectItem value="sunday">Sunday 29</SelectItem>
              </SelectContent>
            </Select>

            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="pyramid">Pyramid</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="west-holts">West Holts</SelectItem>
                <SelectItem value="woodsies">Woodsies</SelectItem>
                <SelectItem value="park">The Park</SelectItem>
                <SelectItem value="acoustic">Acoustic</SelectItem>
                <SelectItem value="avalon">Avalon</SelectItem>
                <SelectItem value="arcadia">Arcadia</SelectItem>
                <SelectItem value="levels">Levels</SelectItem>
                <SelectItem value="leftfield">Leftfield</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Browse View */}
        {currentView === "browse" && (
          <div className="space-y-8">
            {Object.entries(groupedArtists).map(([day, stages]) => (
              <Card key={day} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      {day}
                    </div>
                    <Badge variant="secondary">
                      {Object.values(stages).flat().filter(artist => selectedArtists.has(artist.id)).length} selected
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(stages).map(([stage, artists]) => (
                    <div key={stage}>
                      <div className="flex items-center mb-4">
                        <div className={cn("w-4 h-4 rounded-full mr-3", `bg-${getStageColor(stage)}`)} />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {getStageDisplayName(stage)}
                        </h3>
                        <span className="ml-auto text-sm text-slate-500 dark:text-slate-400">
                          {artists.length} acts
                        </span>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {artists.map((artist) => {
                          const isSelected = selectedArtists.has(artist.id);
                          const hasConflictWithSelected = !isSelected && checkConflicts(artist);
                          
                          return (
                            <Card
                              key={artist.id}
                              className={cn(
                                "cursor-pointer transition-all duration-200 hover:shadow-lg",
                                isSelected
                                  ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                  : "hover:border-purple-300 dark:hover:border-purple-700"
                              )}
                              onClick={() => toggleArtist(artist)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-slate-900 dark:text-white text-lg">
                                      {artist.name}
                                    </h4>
                                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                                      {artist.startTime} - {artist.endTime}
                                    </p>
                                  </div>
                                  <div className="ml-3">
                                    <div className={cn(
                                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                      isSelected
                                        ? "bg-purple-600 border-purple-600"
                                        : "border-slate-300 dark:border-slate-500"
                                    )}>
                                      {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className={cn("text-xs", `border-${getStageColor(stage)} text-${getStageColor(stage)}`)}>
                                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                                  </Badge>
                                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                                    {hasConflictWithSelected ? (
                                      <div className="flex items-center text-red-500">
                                        <AlertTriangle className="w-3 h-3 mr-1" />
                                        Conflict
                                      </div>
                                    ) : (
                                      <div className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {formatDuration(artist.duration)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Schedule View */}
        {currentView === "schedule" && (
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  My Personal Schedule
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    {selectedArtists.size} Selected
                  </Badge>
                  {selectedArtistsList.some(artist => 
                    selectedArtistsList.some(other => 
                      other.id !== artist.id && 
                      other.day === artist.day && 
                      checkTimeOverlap(artist.startTime, artist.endTime, other.startTime, other.endTime)
                    )
                  ) && (
                    <Badge variant="destructive">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Conflicts
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={scheduleDay} onValueChange={setScheduleDay}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="Thursday 26 June">Thu 26</TabsTrigger>
                  <TabsTrigger value="Friday 27 June">Fri 27</TabsTrigger>
                  <TabsTrigger value="Saturday 28 June">Sat 28</TabsTrigger>
                  <TabsTrigger value="Sunday 29 June">Sun 29</TabsTrigger>
                </TabsList>

                {["Thursday 26 June", "Friday 27 June", "Saturday 28 June", "Sunday 29 June"].map(day => (
                  <TabsContent key={day} value={day}>
                    <ScrollArea className="h-96">
                      <div className="space-y-4">
                        {getScheduleForDay(day).length === 0 ? (
                          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                            <Music className="w-8 h-8 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium mb-2">No acts selected for {day}</p>
                            <p className="text-sm">Go back to Browse to add artists to your schedule</p>
                          </div>
                        ) : (
                          getScheduleForDay(day).map((artist, index, array) => {
                            const conflictingArtists = array.filter(other => 
                              other.id !== artist.id && 
                              checkTimeOverlap(artist.startTime, artist.endTime, other.startTime, other.endTime)
                            );

                            return (
                              <div key={artist.id} className="relative">
                                <div className="absolute left-0 top-0 w-20 text-right pr-4">
                                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    {artist.startTime}
                                  </span>
                                </div>
                                <div className="ml-24">
                                  <Card className={cn(
                                    "border-l-4 shadow-md",
                                    conflictingArtists.length > 0 
                                      ? "border-l-red-500 bg-red-50 dark:bg-red-900/20"
                                      : `border-l-${getStageColor(artist.stage)}`
                                  )}>
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                          <h4 className="font-semibold text-slate-900 dark:text-white text-lg">
                                            {artist.name}
                                          </h4>
                                          <p className={cn(
                                            "font-medium",
                                            conflictingArtists.length > 0 
                                              ? "text-red-600 dark:text-red-400"
                                              : `text-${getStageColor(artist.stage)}`
                                          )}>
                                            {getStageDisplayName(artist.stage)} • {artist.startTime} - {artist.endTime}
                                          </p>
                                          {conflictingArtists.length > 0 && (
                                            <p className="text-red-500 text-sm font-medium mt-1">
                                              <AlertTriangle className="w-3 h-3 inline mr-1" />
                                              Conflicts with {conflictingArtists.map(a => a.name).join(', ')}
                                            </p>
                                          )}
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => toggleArtist(artist)}
                                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                          <X className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search Artists</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search for artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {allArtists
                  .filter(artist =>
                    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    artist.stage.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((artist) => (
                    <div
                      key={artist.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      onClick={() => {
                        toggleArtist(artist);
                        setSearchOpen(false);
                      }}
                    >
                      <div>
                        <p className="font-medium">{artist.name}</p>
                        <p className="text-sm text-slate-500">
                          {getStageDisplayName(artist.stage)} • {artist.day}
                        </p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedArtists.has(artist.id)
                          ? "bg-purple-600 border-purple-600"
                          : "border-slate-300"
                      )}>
                        {selectedArtists.has(artist.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Conflict Dialog */}
      <Dialog open={conflictModalOpen} onOpenChange={setConflictModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Schedule Conflict
            </DialogTitle>
          </DialogHeader>
          {conflictDetails && (
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                This artist overlaps with another act in your schedule:
              </p>
              
              <div className="space-y-3">
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                  <CardContent className="p-3">
                    <div className="font-semibold text-red-900 dark:text-red-300">
                      {conflictDetails.conflictingArtist.name}
                    </div>
                    <div className="text-sm text-red-700 dark:text-red-400">
                      {getStageDisplayName(conflictDetails.conflictingArtist.stage)} • {conflictDetails.conflictingArtist.startTime} - {conflictDetails.conflictingArtist.endTime}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center text-slate-400">
                  <AlertTriangle className="w-4 h-4 mx-auto" />
                </div>
                
                <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
                  <CardContent className="p-3">
                    <div className="font-semibold text-orange-900 dark:text-orange-300">
                      {conflictDetails.newArtist.name}
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-400">
                      {getStageDisplayName(conflictDetails.newArtist.stage)} • {conflictDetails.newArtist.startTime} - {conflictDetails.newArtist.endTime}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => handleConflictResolution('keep-both')}
                  className="flex-1"
                >
                  Keep Both
                </Button>
                <Button
                  onClick={() => handleConflictResolution('replace')}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Replace
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating Action Button */}
      {currentView === "browse" && (
        <Button
          onClick={() => setCurrentView("schedule")}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
        >
          <Calendar className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
