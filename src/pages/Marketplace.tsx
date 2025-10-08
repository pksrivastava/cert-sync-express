import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Clock, Users, Star, DollarSign, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import coursesImage from "@/assets/courses-abstract.jpg";

// Mock course data
const courses = [
  {
    id: 1,
    title: "Advanced Cloud Architecture",
    provider: "TechLearn Academy",
    description: "Master cloud infrastructure design patterns and best practices for scalable applications.",
    duration: "8 weeks",
    enrolled: 1234,
    rating: 4.8,
    price: 299,
    category: "Technology",
    level: "Advanced"
  },
  {
    id: 2,
    title: "Project Management Fundamentals",
    provider: "Business Pro Institute",
    description: "Learn essential project management methodologies and tools to lead successful projects.",
    duration: "6 weeks",
    enrolled: 2156,
    rating: 4.9,
    price: 0,
    category: "Business",
    level: "Beginner"
  },
  {
    id: 3,
    title: "Data Science with Python",
    provider: "DataMasters",
    description: "Comprehensive introduction to data analysis, visualization, and machine learning with Python.",
    duration: "10 weeks",
    enrolled: 3421,
    rating: 4.7,
    price: 399,
    category: "Technology",
    level: "Intermediate"
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    provider: "Marketing Experts Co",
    description: "Complete guide to modern digital marketing strategies, SEO, and social media marketing.",
    duration: "7 weeks",
    enrolled: 1876,
    rating: 4.6,
    price: 249,
    category: "Marketing",
    level: "Intermediate"
  },
  {
    id: 5,
    title: "Leadership Excellence",
    provider: "Executive Learning Hub",
    description: "Develop essential leadership skills and strategies for managing high-performance teams.",
    duration: "5 weeks",
    enrolled: 987,
    rating: 4.9,
    price: 0,
    category: "Business",
    level: "Advanced"
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    provider: "SecureNet Academy",
    description: "Learn fundamental cybersecurity concepts and practices to protect digital assets.",
    duration: "8 weeks",
    enrolled: 2543,
    rating: 4.8,
    price: 349,
    category: "Technology",
    level: "Beginner"
  }
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["All", "Technology", "Business", "Marketing"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative py-16 mb-8 overflow-hidden">
          <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `url(${coursesImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Discover Your Next <span className="gradient-text">Learning Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Browse our curated collection of courses from trusted partners
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for courses..."
                  className="pl-12 h-14 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category || (category === "All" && !selectedCategory) ? "default" : "outline"}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className="shadow-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredCourses.map((course) => (
              <Card 
                key={course.id} 
                className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-2 duration-300 flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-primary font-medium">
                    {course.provider}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{course.enrolled.toLocaleString()} enrolled</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating} rating</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-1 text-xl font-bold">
                    {course.price === 0 ? (
                      <span className="text-primary">Free</span>
                    ) : (
                      <>
                        <DollarSign className="h-5 w-5" />
                        <span>{course.price}</span>
                      </>
                    )}
                  </div>
                  <Button asChild className="shadow-glow">
                    <Link to={`/course/${course.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
