import { cn } from "@/lib/utils";

interface ListItem {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
}

interface RollingTextItemProps {
  item: ListItem;
}

function RollingTextItem({ item }: RollingTextItemProps) {
  return (
    <div className="group/item relative flex items-center justify-between border-b border-border py-4 md:py-6 transition-colors duration-300 hover:border-primary/40">
      {/* Rolling text */}
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 ease-in-out group-hover/item:-translate-y-full">
          {/* State 1: Normal */}
          <div className="flex items-center">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              {item.title}
            </span>
          </div>

          {/* State 2: Hover (Italic + Color) */}
          <div className="flex items-center absolute top-full left-0">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight italic text-primary">
              {item.title}
            </span>
          </div>
        </div>
      </div>

      {/* Category Label */}
      <span className="text-sm md:text-base text-muted-foreground font-medium transition-opacity duration-300 group-hover/item:opacity-60">
        {item.category}
      </span>

      {/* Image Reveal Effect */}
      <div className="pointer-events-none absolute right-16 md:right-24 top-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-lg opacity-0 transition-all duration-500 ease-out group-hover/item:opacity-100 group-hover/item:scale-100 scale-75">
        <div className="relative h-24 w-32 md:h-32 md:w-44 overflow-hidden rounded-lg shadow-xl">
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-110"
          />
          <div className="absolute inset-0 bg-primary/10" />
        </div>
      </div>
    </div>
  );
}

export interface RollingTextListProps {
  title?: string;
  items?: ListItem[];
}

function RollingTextList({ title = "Process", items: customItems }: RollingTextListProps) {
  const items: ListItem[] = customItems ?? [
    {
      id: 1,
      title: "Discover",
      category: "Research",
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=60",
      alt: "Team discovering insights",
    },
    {
      id: 2,
      title: "Design",
      category: "Experience",
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=60",
      alt: "Design collaboration",
    },
    {
      id: 3,
      title: "Develop",
      category: "Engineering",
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60",
      alt: "Developers coding",
    },
    {
      id: 4,
      title: "Deploy",
      category: "Launch",
      src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&auto=format&fit=crop&q=60",
      alt: "Product launch",
    },
  ];

  return (
    <div className="w-full">
      <p className="text-sm md:text-base font-medium uppercase tracking-widest text-muted-foreground mb-6 md:mb-8">
        {title}
      </p>
      <div>
        {items.map((item) => (
          <RollingTextItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export { RollingTextList };
