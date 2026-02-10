import { Metadata } from "next";
import Image from "next/image";
import { Play, Users, Globe, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Movie Streaming Studio",
  description:
    "Learn more about Movie Streaming Studio and our mission to bring you the best entertainment experience.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-linear-to-b from-primary/20 to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your ultimate destination for discovering and streaming the world's
            finest entertainment
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Our Story */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded with a passion for cinema and storytelling, Movie
                Streaming Studio has grown into a premier destination for movie
                enthusiasts worldwide. We believe that great stories have the
                power to connect, inspire, and transform lives.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform brings together the latest blockbusters, timeless
                classics, and hidden gems from around the globe. With an
                ever-expanding library, we're committed to delivering diverse
                content that caters to every taste and preference.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8">
            {[
              { icon: Play, label: "Movies", value: "10K+" },
              { icon: Users, label: "Active Users", value: "5M+" },
              { icon: Globe, label: "Countries", value: "150+" },
              { icon: Award, label: "Awards", value: "25+" },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Our Mission */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To revolutionize the way people experience entertainment by
              providing seamless access to premium content, fostering a global
              community of movie lovers, and supporting filmmakers in sharing
              their creative visions with the world.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Quality First",
                  description:
                    "We curate only the best content to ensure an exceptional viewing experience.",
                },
                {
                  title: "Innovation",
                  description:
                    "Continuously improving our platform with cutting-edge technology and features.",
                },
                {
                  title: "Community",
                  description:
                    "Building a vibrant community of movie enthusiasts from around the world.",
                },
                {
                  title: "Accessibility",
                  description:
                    "Making great entertainment accessible to everyone, everywhere.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border bg-card space-y-2"
                >
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Team</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Behind Movie Streaming Studio is a diverse team of passionate
              individuals—engineers, designers, content curators, and movie
              enthusiasts—all working together to bring you the best streaming
              experience possible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
