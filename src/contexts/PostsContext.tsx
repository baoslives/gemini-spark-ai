import { createContext, useContext, useState, ReactNode } from "react";
import leatherHandbag from "@/assets/leather-handbag.png";
import silkScarf from "@/assets/silk-scarf.png";
import leatherBelt from "@/assets/leather-belt.png";
import leatherLoafers from "@/assets/leather-loafers.png";
import cashmereTurtleneck from "@/assets/cashmere-turtleneck.jpg";
import navyOvercoat from "@/assets/navy-overcoat.jpg";
import wrapCoatModel from "@/assets/wrap-coat-model.jpg";
import modelSilkBlouse from "@/assets/model-silk-blouse.jpg";
import modelWoolBlazer from "@/assets/model-wool-blazer.jpg";
import camelCoat from "@/assets/camel-coat.jpg";
import woolTrousers from "@/assets/wool-trousers.jpg";
import leatherCrossbody from "@/assets/leather-crossbody.jpg";

export interface Post {
  id: string;
  platforms: { name: string }[];
  media: string;
  mediaType: "image" | "video";
  hasCarousel?: boolean;
  status: "scheduled" | "suggested" | "draft" | "posted";
  scheduledDate?: string;
  scheduledTime?: string;
  title: string;
  caption: string;
}

const initialPosts: Post[] = [
  {
    id: "1",
    platforms: [{ name: "Instagram" }, { name: "RedNote" }],
    media: leatherHandbag,
    mediaType: "image",
    status: "scheduled",
    scheduledDate: "Wed, Jan 7",
    scheduledTime: "7:15 PM",
    title: "Leather Tote La...",
    caption: "Introducing our signature tote in bu...",
  },
  {
    id: "2",
    platforms: [{ name: "RedNote" }],
    media: cashmereTurtleneck,
    mediaType: "image",
    hasCarousel: true,
    status: "scheduled",
    scheduledDate: "Thu, Jan 8",
    scheduledTime: "8:30 PM",
    title: "羊绒高领系列",
    caption: "「优雅，永恒，自信。」全新羊绒系...",
  },
  {
    id: "3",
    platforms: [{ name: "Instagram" }],
    media: leatherBelt,
    mediaType: "image",
    hasCarousel: true,
    status: "suggested",
    scheduledDate: "Thu, Jan 8",
    scheduledTime: "12:00 PM",
    title: "Behind the Cra...",
    caption: "Every stitch tells a story. Discover th...",
  },
  {
    id: "4",
    platforms: [{ name: "Instagram" }],
    media: navyOvercoat,
    mediaType: "image",
    status: "draft",
    scheduledDate: "Sat, Jan 10",
    scheduledTime: "6:00 PM",
    title: "Navy Overcoat...",
    caption: "Tailored precision meets timeless st...",
  },
  {
    id: "5",
    platforms: [{ name: "Instagram" }, { name: "Facebook" }],
    media: wrapCoatModel,
    mediaType: "image",
    status: "posted",
    title: "Camel Wrap Coat",
    caption: "Parisian elegance in every detail...",
  },
  {
    id: "6",
    platforms: [{ name: "RedNote" }, { name: "TikTok" }],
    media: modelSilkBlouse,
    mediaType: "image",
    status: "posted",
    title: "丝绸衬衫系列",
    caption: "经典丝绸衬衫 🤍 优雅系列正式...",
  },
  {
    id: "7",
    platforms: [{ name: "Instagram" }],
    media: silkScarf,
    mediaType: "image",
    status: "scheduled",
    scheduledDate: "Thu, Jan 9",
    scheduledTime: "3:00 PM",
    title: "Silk Print Edit...",
    caption: "The art of draping. Our silk collectio...",
  },
  {
    id: "8",
    platforms: [{ name: "RedNote" }],
    media: leatherCrossbody,
    mediaType: "image",
    status: "draft",
    scheduledDate: "Fri, Jan 10",
    scheduledTime: "11:00 AM",
    title: "斜挎包搭配指南",
    caption: "精致细节，尽显品味...",
  },
  {
    id: "9",
    platforms: [{ name: "Instagram" }, { name: "Facebook" }],
    media: modelWoolBlazer,
    mediaType: "image",
    status: "posted",
    title: "Blazer Editorial",
    caption: "Handcrafted tailoring. Our wool blaz...",
  },
  {
    id: "10",
    platforms: [{ name: "TikTok" }],
    media: camelCoat,
    mediaType: "image",
    status: "posted",
    title: "Camel Coat GRWM",
    caption: "The ultimate outerwear staple. Get r...",
  },
  {
    id: "11",
    platforms: [{ name: "Instagram" }, { name: "RedNote" }],
    media: woolTrousers,
    mediaType: "image",
    status: "scheduled",
    scheduledDate: "Fri, Jan 10",
    scheduledTime: "2:00 PM",
    title: "Wool Trousers...",
    caption: "Timeless elegance meets modern cr...",
  },
  {
    id: "12",
    platforms: [{ name: "RedNote" }],
    media: leatherLoafers,
    mediaType: "image",
    status: "scheduled",
    scheduledDate: "Sat, Jan 11",
    scheduledTime: "6:00 PM",
    title: "经典乐福鞋",
    caption: "手工制作，品质之选 👞...",
  },
];

interface PostsContextType {
  posts: Post[];
  addPost: (post: Post) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within PostsProvider");
  return context;
};
