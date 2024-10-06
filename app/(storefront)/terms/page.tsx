"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  FileTextIcon,
  CopyrightIcon,
  BriefcaseIcon,
  UserIcon,
  ShieldIcon,
  CreditCardIcon,
  BanIcon,
  FilePenIcon,
  MailIcon,
  AwardIcon,
  ClockIcon,
  GlobeIcon,
  ShieldCheckIcon,
  HeartHandshakeIcon,
  BookOpenCheckIcon,
  SearchIcon,
} from "lucide-react";

export default function TermsAndConditions() {
  const [searchTerm, setSearchTerm] = useState("");

  const sections = [
    {
      id: "general",
      label: "General Terms",
      icon: FileTextIcon,
      subsections: [
        {
          icon: CopyrightIcon,
          title: "Intellectual Property",
          content: [
            "All content and intellectual property on our platform, including designs, graphics, and source code, are owned by us or our licensors.",
            "You may not reproduce, distribute, modify, or create derivative works of any content without our prior written consent.",
            "Any unauthorized use of our intellectual property may result in legal action.",
            "By uploading content to our platform, you grant us a worldwide, non-exclusive license to use, reproduce, and distribute that content.",
          ],
        },
        {
          icon: FilePenIcon,
          title: "Changes to Terms",
          content: [
            "We may update these terms and conditions from time to time.",
            "Users will be notified of significant changes to these terms.",
            "Continued use of the platform after changes constitutes acceptance of the new terms.",
            "It is your responsibility to review the latest version of these terms regularly.",
            "Previous versions of these terms may be available upon request.",
          ],
        },
        {
          icon: GlobeIcon,
          title: "Governing Law",
          content: [
            "These terms and conditions shall be governed by and construed in accordance with the laws of the state of California.",
            "Any legal action or proceeding shall be brought exclusively in the federal or state courts located in San Francisco, California.",
            "You waive any objection to jurisdiction and venue in such courts.",
            "The United Nations Convention on Contracts for the International Sale of Goods does not apply.",
          ],
        },
      ],
    },
    {
      id: "users",
      label: "User Guidelines",
      icon: UserIcon,
      subsections: [
        {
          icon: BriefcaseIcon,
          title: "Seller Responsibilities",
          content: [
            "As a seller, you are responsible for the quality and accuracy of your products and services.",
            "You must ensure that your content does not infringe on any third-party intellectual property rights.",
            "You are responsible for responding to customer inquiries and resolving any disputes in a timely manner.",
            "Maintain accurate and up-to-date information about your products and services.",
            "Comply with all applicable laws and regulations in your jurisdiction.",
            "Clearly communicate any terms, conditions, or limitations associated with your products or services.",
          ],
        },
        {
          icon: UserIcon,
          title: "Buyer Responsibilities",
          content: [
            "As a buyer, you are responsible for reviewing the product details and ensuring that it meets your requirements.",
            "You must use our platform in accordance with these terms and conditions, and not for any unlawful or unauthorized purposes.",
            "Provide accurate payment and contact information.",
            "Respect the intellectual property rights of sellers and other users.",
            "Communicate professionally and respectfully with sellers.",
            "Report any issues or concerns promptly through our designated channels.",
          ],
        },
        {
          icon: HeartHandshakeIcon,
          title: "User Content",
          content: [
            "You retain ownership of the content you post on our platform.",
            "By posting content, you grant us a license to use, modify, and display that content.",
            "You are responsible for ensuring your content does not violate any laws or third-party rights.",
            "We may remove any content that violates our policies or applicable laws.",
            "We do not endorse or verify the accuracy of user-generated content.",
          ],
        },
      ],
    },
    {
      id: "legal",
      label: "Legal",
      icon: ShieldIcon,
      subsections: [
        {
          icon: ShieldIcon,
          title: "Limitation of Liability",
          content: [
            "We shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of our platform.",
            "Our liability is limited to the amount paid by you for the specific product or service in question.",
            "We do not guarantee the accuracy, completeness, or reliability of any content on our platform.",
            "We are not responsible for any disputes between buyers and sellers.",
            "Use of our platform is at your own risk.",
          ],
        },
        {
          icon: AwardIcon,
          title: "Dispute Resolution",
          content: [
            "Any disputes arising from the use of our platform shall be resolved through binding arbitration.",
            "The arbitration shall be conducted in accordance with the rules of the American Arbitration Association.",
            "The arbitration shall be conducted in the English language.",
            "The award shall be final and binding on the parties.",
            "Users waive their right to participate in class action lawsuits.",
            "Small claims court actions are exempt from mandatory arbitration.",
          ],
        },
        {
          icon: ShieldCheckIcon,
          title: "Privacy and Data Protection",
          content: [
            "Our collection and use of personal information is governed by our Privacy Policy.",
            "We implement appropriate technical and organizational measures to protect your data.",
            "You have the right to access, correct, or delete your personal information.",
            "We comply with applicable data protection laws and regulations.",
            "Third-party services used on our platform may collect and process your data according to their own privacy policies.",
          ],
        },
      ],
    },
    {
      id: "account",
      label: "Account & Billing",
      icon: CreditCardIcon,
      subsections: [
        {
          icon: CreditCardIcon,
          title: "Payment and Fees",
          content: [
            "All payments on our platform are processed securely through our payment partners.",
            "We reserve the right to change our pricing and fees at any time, with prior notice to our users.",
            "Sellers will receive payment for their products or services according to our payment schedule.",
            "All applicable taxes and fees are the responsibility of the user.",
            "Refunds will be processed according to our refund policy.",
            "We may offer various payment methods, subject to availability in your region.",
          ],
        },
        {
          icon: BanIcon,
          title: "Account Suspension",
          content: [
            "We reserve the right to suspend or terminate your account if you violate these terms and conditions.",
            "Engaging in fraudulent activities will result in immediate account termination.",
            "Suspended accounts may appeal the decision through our designated process.",
            "During suspension, you may not create new accounts or access the platform.",
            "We may report illegal activities to appropriate law enforcement authorities.",
          ],
        },
        {
          icon: ClockIcon,
          title: "Term and Termination",
          content: [
            "These terms and conditions shall remain in effect until terminated by either party.",
            "We reserve the right to terminate your access to our platform at any time, with or without cause.",
            "Upon termination, you must cease all use of our platform.",
            "Certain provisions of these terms will survive termination.",
            "You may terminate your account at any time by following our account closure process.",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-[100dvh] mx-auto container p-4">
      <Card className="py-8 bg-gradient-to-b from-muted/50 to-muted px-4">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Terms and Conditions</h1>
              <p className="text-muted-foreground">
                Last updated: October 6, 2024
              </p>
            </div>
            <div className="relative">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search terms..."
                className="pl-8 h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p>
              Welcome to our UI and graphics design marketplace. These terms and
              conditions outline the rules and regulations for the use of our
              platform. We strive to provide a safe, fair, and productive
              environment for all users.
            </p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2"
                >
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-8">
                    {section.subsections.map((subsection, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-3 mb-4">
                          <subsection.icon className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">
                            {subsection.title}
                          </h2>
                        </div>
                        <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                          {subsection.content.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
