import { X } from "lucide-react";

// Sample prompt images - using fashion assets
import leatherHandbag from "@/assets/leather-handbag.png";
import silkScarf from "@/assets/silk-scarf.png";
import leatherBelt from "@/assets/leather-belt.png";
import leatherLoafers from "@/assets/leather-loafers.png";
import cashmereCoat from "@/assets/cashmere-coat.png";

interface SamplePrompt {
  id: number;
  image: string;
  prompt: string;
}

const samplePrompts: SamplePrompt[] = [
  {
    id: 1,
    image: leatherHandbag,
    prompt: "A high-end editorial shot of a [Product] held by a model in a neutral linen outfit. Soft natural light from a tall window, warm camel and cream tones, shallow depth of field. Luxury fashion magazine aesthetic, 8k resolution, photorealistic",
  },
  {
    id: 2,
    image: silkScarf,
    prompt: "A cinematic flat-lay of a [Product] artfully draped on a textured sandstone surface. Warm golden hour lighting casting long shadows, burnt orange and ivory tones. Styled with dried botanicals and a leather journal.",
  },
  {
    id: 3,
    image: leatherBelt,
    prompt: "A professional product mockup of a [Product] placed on a rich walnut wood surface. Background features soft-focus linen fabric and a brass tray. Warm studio lighting, high-end fashion campaign aesthetic, clean and refined",
  },
  {
    id: 4,
    image: leatherLoafers,
    prompt: "A [Product] styled on a Parisian cobblestone street. Soft morning light, muted earth tones, with blurred café terrace in the background. Editorial fashion photography, aspirational lifestyle mood.",
  },
  {
    id: 5,
    image: cashmereCoat,
    prompt: "A [Product] draped over a mid-century modern chair. Warm ambient lighting, neutral palette with camel and off-white accents, minimalist interior styling.",
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