import { cn } from "@/lib/utils";

interface ListItem {
  id: number;
  title: string;
  category: string;
  src: string;
  alt: string;
  color?: "blue";
}

interface RollingTextItemProps {
  item: ListItem;
}

const colorClassMap: Record<NonNullable<ListItem["color"]>, string> = {
  blue: "text-blue-500",
};

function RollingTextItem({ item }: RollingTextItemProps) {
  const hoverColorClass = colorClassMap[item.color ?? "blue"];

  return (
    <div className="group/item relative flex items-center justify-between border-b border-border py-6 md:py-8 transition-colors duration-300 cursor-pointer">
      {/* Rolling text */}
      <div className="relative overflow-y-hidden overflow-x-visible pr-[0.12em] h-[1.05em] text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-none">
        {/* State 1: Normal */}
        <span className="absolute inset-0 inline-block whitespace-nowrap translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:-translate-y-full text-foreground">
          {item.title}
        </span>

        {/* State 2: Hover (Italic + Color) */}
        <span
          className={cn(
            "absolute inset-0 inline-block whitespace-nowrap translate-y-full italic transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-y-0",
            hoverColorClass,
          )}
        >
          {item.title}
        </span>

        {/* Reserve height for layout flow */}
        <span className="inline-block whitespace-nowrap opacity-0 pointer-events-none">{item.title}</span>
      </div>

      {/* Category Label */}
      <span className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-medium">
        {item.category}
      </span>

      {/* Image Reveal Effect */}
      <div className="pointer-events-none absolute right-20 md:right-36 bottom-2 z-10 overflow-visible opacity-0 scale-90 transition-all duration-500 ease-out group-hover/item:opacity-100 group-hover/item:scale-100">
        <div className="relative h-20 w-28 md:h-28 md:w-40 overflow-hidden rounded-lg shadow-2xl">
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
