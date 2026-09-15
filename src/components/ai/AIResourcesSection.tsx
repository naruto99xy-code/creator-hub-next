import { motion } from 'framer-motion';
import { ExternalLink, Key, Sparkles, Video, Bot, Code, Brain } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';

const apiResources = [
  {
    name: 'Google Gemini API',
    description: 'Get your free Gemini API key for AI-powered features',
    icon: Sparkles,
    url: 'https://aistudio.google.com/apikey',
    buttonText: 'Get Gemini API',
    hsl: '38 92% 55%',
  },
  {
    name: 'Mem0 API',
    description: 'Memory layer for AI applications and agents',
    icon: Brain,
    url: 'https://app.mem0.ai/',
    buttonText: 'Get Mem0 API',
    hsl: '280 70% 60%',
  },
  {
    name: 'LiveKit API',
    description: 'Real-time audio/video communication platform',
    icon: Video,
    url: 'https://livekit.io/',
    buttonText: 'Get LiveKit API',
    hsl: '262 83% 58%',
  },
  {
    name: 'OpenAI API',
    description: 'Access GPT models for advanced AI capabilities',
    icon: Bot,
    url: 'https://platform.openai.com/api-keys',
    buttonText: 'Get OpenAI API',
    hsl: '160 70% 45%',
  },
  {
    name: 'ElevenLabs API',
    description: 'AI voice generation and text-to-speech',
    icon: Code,
    url: 'https://elevenlabs.io/',
    buttonText: 'Get ElevenLabs API',
    hsl: '230 80% 56%',
  },
];

/** Ported from codeninjavik's ApiResourcesSection — the Gemini card used red; swapped to amber here. */
export function AIResourcesSection() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 text-primary font-semibold text-sm tracking-wider mb-4">
            <Key size={16} />
            API RESOURCES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your <span className="glow-text">API Keys</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jarvis and Myra use various AI APIs for their advanced features. Get your API keys from these platforms to unlock full functionality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {apiResources.map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-xl p-6 border transition-all duration-300"
              style={{ borderColor: `hsla(${resource.hsl}, 0.3)`, background: `linear-gradient(180deg, hsla(${resource.hsl}, 0.08), transparent)` }}
            >
              <div className="w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center mb-4">
                <resource.icon className="w-6 h-6" style={{ color: `hsl(${resource.hsl})` }} />
              </div>

              <h3 className="text-lg font-bold mb-2">{resource.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>

              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <GlowButton variant="outline" size="sm" className="w-full">
                  <span>{resource.buttonText}</span>
                  <ExternalLink className="w-4 h-4" />
                </GlowButton>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            💡 <strong className="text-foreground">Tip:</strong> Most APIs offer free tiers perfect for personal use.
            Follow our setup guides to configure these APIs in Jarvis and Myra.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
