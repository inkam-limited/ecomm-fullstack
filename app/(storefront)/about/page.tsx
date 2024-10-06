import React from "react";
import {
  DownloadIcon,
  CopyrightIcon,
  ReceiptIcon,
  PocketIcon,
  DiffIcon,
  QrCodeIcon,
  GroupIcon,
  SparkleIcon,
  MaximizeIcon,
  BugOffIcon,
  MoveUpIcon,
  CombineIcon,
  SearchIcon,
  HeartIcon,
  PaletteIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Image from "next/image";

export default function CreativeMarketLanding() {
  return (
    <div className="bg-background text-foreground py-8">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <TestimonialsSection />
      <PricingSection />
      <CallToAction />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Unleash Your Creativity with Creative Market
          </h2>
          <p className="text-xl md:text-2xl">
            Discover a world of high-quality design assets to elevate your
            projects and inspire your creative journey.
          </p>
          <button className="bg-accent text-accent-foreground px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent/90 transition-colors">
            Start Exploring
          </button>
        </div>
        <div className="relative">
          <Image
            height={600}
            width={800}
            src="https://tint.creativemarket.com/Big6tkoc0RTgT4D2pPZwi-aMF6XBe1V17IwvE_vMtxg/width:1200/height:800/gravity:nowe/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzUwMjYvNTAyNjcvNTAyNjczMjAvMDEtby5qcGc?1709715630"
            alt="Creative designs showcase"
            className="rounded-lg shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-lg"></div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: DownloadIcon,
      title: "Instant Downloads",
      description: "Access your purchases immediately after checkout.",
    },
    {
      icon: CopyrightIcon,
      title: "Flexible Licensing",
      description: "Choose from various options to suit your project needs.",
    },
    {
      icon: ReceiptIcon,
      title: "3-Day Refunds",
      description: "Not satisfied? Get a full refund within 3 days.",
    },
    {
      icon: QrCodeIcon,
      title: "High-Quality Assets",
      description: "Curated selection of premium design resources.",
    },
    {
      icon: GroupIcon,
      title: "Supportive Community",
      description: "Connect with fellow creatives and share your work.",
    },
    {
      icon: SparkleIcon,
      title: "Fresh Inspiration",
      description: "Discover new trends and ideas to fuel your creativity.",
    },
  ];

  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Creative Market?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-6 bg-secondary rounded-lg shadow-md"
            >
              <feature.icon className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const categories = [
    { icon: PaletteIcon, name: "Graphics" },
    { icon: HeartIcon, name: "Templates" },
    { icon: SearchIcon, name: "Fonts" },
    { icon: ShoppingCartIcon, name: "Add-ons" },
    { icon: CombineIcon, name: "Web Themes" },
    { icon: MoveUpIcon, name: "3D Assets" },
  ];

  return (
    <section className="w-full py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <category.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-center">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Graphic Designer",
      quote:
        "Creative Market has been a game-changer for my design workflow. The quality and variety of assets are unmatched!",
    },
    {
      name: "Sarah Lee",
      role: "Web Developer",
      quote:
        "I love how easy it is to find exactly what I need. It's saved me countless hours on client projects.",
    },
    {
      name: "Mike Brown",
      role: "Marketing Manager",
      quote:
        "The templates and graphics from Creative Market have elevated our brand's visual identity. Highly recommended!",
    },
  ];

  return (
    <section className="w-full py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-secondary p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center">
                <Image
                  height={64}
                  width={64}
                  src={`/api/placeholder/64/64?text=${testimonial.name[0]}`}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      features: [
        "Access to free resources",
        "Community support",
        "Limited downloads",
      ],
    },
    {
      name: "Pro",
      price: "$29/month",
      features: [
        "Unlimited downloads",
        "Extended licenses",
        "Priority support",
        "Early access to new items",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Custom licensing",
        "Dedicated account manager",
        "API access",
        "Advanced analytics",
      ],
    },
  ];

  return (
    <section className="w-full py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Choose Your Plan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2">
                    <CheckIcon className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="w-full py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Elevate Your Designs?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of creatives who trust Creative Market for their design
          needs.
        </p>
        <button className="bg-accent text-accent-foreground px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent/90 transition-colors">
          Sign Up Now
        </button>
      </div>
    </section>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function FacebookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
