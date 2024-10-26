"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Search,
  ShoppingCart,
  Tag,
  Zap,
  Gift,
  X,
  Sparkles,
} from "lucide-react";
import { activatePlus } from "./actions";
import { toast } from "sonner";

export default function PricingTable({
  id,
  isPro,
}: {
  id: string;
  isPro?: boolean;
}) {
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const applyPromoCode = () => {
    setIsLoading(true);
    if (promoCode.toUpperCase() === "FREEPLUS") {
      setIsPromoApplied(true);
      toast.success(
        "Promo code FREEPLUS applied successfully! You now have access to Digigo Plus."
      );
    } else {
      toast.error("Invalid Code. Please check your promo code and try again.");
    }
    setIsLoading(false);
  };

  const upgradeToPlus = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await activatePlus(id);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Failed to activate Plus account");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1">
            <Sparkles className="w-4 h-4 mr-1 inline-block" />
            {isPro ? "Pro Account Active" : "Special Launch Pricing"}
          </Badge>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
            Choose Your Design Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isPro ? (
              "You're enjoying all the benefits of Digigo Plus!"
            ) : (
              <>
                Start with our free plan or unlock premium features with Digigo
                Plus. Use code{" "}
                <span className="font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  FREEPLUS
                </span>{" "}
                for a limited time offer!
              </>
            )}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto relative">
          {/* Free Plan */}
          <Card
            className={`relative bg-white ${
              !isPro && !isPromoApplied
                ? "border-blue-200 shadow-blue-100/50 shadow-xl"
                : ""
            }`}
          >
            {!isPro && !isPromoApplied && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1">
                  CURRENT PLAN
                </Badge>
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Free Plan
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Perfect for exploring our marketplace
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900">$0</div>
                  <div className="text-sm text-gray-500">Forever free</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="space-y-5">
                <FeatureList
                  features={[
                    { text: "Browse all UX design collections", icon: Search },
                    { text: "Purchase individual designs", icon: ShoppingCart },
                    { text: "Basic support", icon: Gift },
                  ]}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200"
                size="lg"
                disabled={isPro}
              >
                {isPro ? "Included with Plus" : "Get Started Free"}
              </Button>
            </CardFooter>
          </Card>

          {/* Plus Plan */}
          <Card
            className={`relative bg-white ${
              isPro || isPromoApplied
                ? "border-blue-200 shadow-blue-100/50 shadow-xl"
                : ""
            }`}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              {isPro ? (
                <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1">
                  ACTIVATED
                </Badge>
              ) : isPromoApplied ? (
                <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1">
                  Activate Free Plus
                </Badge>
              ) : (
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1">
                  MOST POPULAR
                </Badge>
              )}
            </div>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Digigo Plus
                  </CardTitle>
                  <CardDescription className="mt-2">
                    For serious designers & creators
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900">
                    {isPro ? (
                      <span className="text-green-600">Active</span>
                    ) : isPromoApplied ? (
                      <span className="flex items-center justify-end">
                        <span className="text-2xl line-through text-gray-400 mr-2">
                          $99
                        </span>
                        <span className="text-green-600">$0</span>
                      </span>
                    ) : (
                      "$99"
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {isPro ? "Current Plan" : "One-time payment"}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="space-y-5">
                <FeatureList
                  features={[
                    { text: "Everything in Free plan", icon: Check },
                    {
                      text: "Sell your designs on marketplace",
                      icon: Tag,
                      highlight: true,
                    },
                    {
                      text: "30% discount on all purchases",
                      icon: ShoppingCart,
                      highlight: true,
                    },
                    { text: "Early access to new collections", icon: Zap },
                    { text: "Priority support", icon: Gift },
                  ]}
                />

                {!isPro && !isPromoApplied && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mt-4">
                        Have a promo code?
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Enter Promo Code</DialogTitle>
                        <DialogDescription>
                          Enter your promo code to get special pricing on Digigo
                          Plus.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex space-x-2">
                        <Input
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter your code"
                          className="flex-1"
                        />
                        <Button
                          onClick={applyPromoCode}
                          disabled={isLoading || !promoCode}
                        >
                          {isLoading ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => upgradeToPlus(id)}
                className={`w-full ${
                  isPromoApplied
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
                size="lg"
                disabled={isPro}
              >
                {isPro
                  ? "Plus Features Active"
                  : isPromoApplied
                  ? "Activate Free Plus Account"
                  : "Get Digigo Plus"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Benefits Section remains unchanged */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Creators Choose Digigo Plus
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Earn More",
                description:
                  "Start selling your designs and earn up to 80% commission on each sale",
                icon: Tag,
              },
              {
                title: "Save More",
                description:
                  "Get 30% off on all marketplace purchases, forever",
                icon: ShoppingCart,
              },
              {
                title: "Create More",
                description:
                  "Access exclusive design resources and early releases",
                icon: Sparkles,
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureList({
  features,
}: {
  features: { text: string; icon: any; highlight?: boolean }[];
}) {
  return (
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="flex-shrink-0 w-5">
            <Check
              className={`h-5 w-5 ${
                feature.highlight ? "text-blue-500" : "text-green-500"
              }`}
            />
          </div>
          <span className={`ml-3 ${feature.highlight ? "font-medium" : ""}`}>
            {feature.text}
            <feature.icon className="ml-2 h-4 w-4 text-gray-400 inline-block" />
          </span>
        </li>
      ))}
    </ul>
  );
}
