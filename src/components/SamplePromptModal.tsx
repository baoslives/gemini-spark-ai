import { X } from "lucide-react";

// Sample prompt images - using existing assets
import greenGemRing from "@/assets/green-gem-ring.png";
import goldNecklace from "@/assets/gold-necklace.png";
import emeraldEarringsBox from "@/assets/emerald-earrings-box.png";
import gemOnRock from "@/assets/gem-on-rock.png";
import pinkGemRing from "@/assets/pink-gem-ring.png";

interface SamplePrompt {
  id: number;
  image: string;
  prompt: string;
}

const samplePrompts: SamplePrompt[] = [
  {
    id: 1,
    image: greenGemRing,
    prompt: "A high-detail macro shot of a [Product] worn on a well-manicured hand. Soft skin texture, elegant finger pose, soft-focus studio background with warm rim lighting. 8k resolution, photorealistic",
  },
  {
    id: 2,
    image: goldNecklace,
    prompt: "A cinematic close-up of a [Product] on a model's neck. Focus on the metal shimmer and gemstone clarity. Neutral skin tones, elegant collarbone detail, soft diffused daylight coming from a side window.",
  },
  {
    id: 3,
    image: emeraldEarringsBox,
    prompt: "A professional product mockup of a [Product] placed on a polished marble surface. Background features architectural shadows and a minimalist vase with dried pampas grass. High-end magazine aesthetic, clean and airy",
  },
  {
    id: 4,
    image: gemOnRock,
    prompt: "A [Product] resting on fine, dry white sand. Natural bright sunlight creating sharp, rhythmic shadows. Background features soft sea foam and turquoise water in the distance. Tropical, coastal atmosphere.",
  },
  {
    id: 5,
    image: pinkGemRing,
    prompt: "A [Product] styled on a raw concrete ledge. Gritty texture, cool blue and orange cinematic lighting, urban fashion vibe.",
  },
];

interface SamplePromptModalProps {
  onClose: () => void;
  onSelect: (prompt: string) => void;
}

export const SamplePromptModal = ({ onClose, onSelect }: SamplePromptModalProps) => {
  const handleSelect = (prompt: string) => {
    onSelect(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-mono text-sm tracking-widest text-foreground">
            PROMPT SAMPLE STYLE
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Subtitle */}
        <div className="px-6 pb-4">
          <p className="text-sm text-muted-foreground">
            Try our prompt samples to visualize your design more easily:
          </p>
        </div>

        {/* Sample Prompts List */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[60vh] space-y-3">
          {samplePrompts.map((sample, index) => (
            <button
              key={sample.id}
              onClick={() => handleSelect(sample.prompt)}
              className={`w-full flex gap-4 p-3 rounded-lg text-left transition-all hover:bg-muted/50 ${
                index === 0 ? 'bg-foreground text-background' : 'bg-muted/30'
              }`}
            >
              <img
                src={sample.image}
                alt={`Sample ${sample.id}`}
                className="w-20 h-20 object-cover rounded-md shrink-0"
              />
              <p className={`text-sm leading-relaxed ${index === 0 ? 'text-background' : 'text-foreground'}`}>
                {sample.prompt}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
