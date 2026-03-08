"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Receipt,
  Users,
  FileText,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface FeatureSectionProps {
  badge?: string;
  heading: string;
  headingHighlight?: string;
  description: string;
  badges?: string[];
  items: FeatureItem[];
}

export default function FeatureSection({
  badge,
  heading,
  headingHighlight,
  description,
  badges = [],
  items,
}: FeatureSectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* LEFT SIDE - Scrolling list */}
        <div className="w-full lg:w-1/2">
          <Card className="border border-border bg-card overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[340px] overflow-hidden">
                {/* Scrollable Container */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Motion list */}
                  <motion.div
                    className="flex flex-col"
                    animate={{ y: [0, -(items.length * 80)] }}
                    transition={{
                      y: {
                        duration: items.length * 4,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  >
                    {[...items, ...items].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-5 py-4 border-b border-border last:border-b-0"
                      >
                        {/* Icon + Content */}
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {item.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="text-muted-foreground">
                          {item.icon}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Fade effects */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-card to-transparent pointer-events-none z-10" />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none z-10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          {badge && (
            <Badge variant="secondary" className="text-sm px-4 py-1">
              {badge}
            </Badge>
          )}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {heading}{" "}
            {headingHighlight && (
              <span className="text-muted-foreground">{headingHighlight}</span>
            )}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {badges.map((b) => (
                <Badge
                  key={b}
                  variant="outline"
                  className="text-sm px-4 py-1.5 font-medium"
                >
                  {b}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
