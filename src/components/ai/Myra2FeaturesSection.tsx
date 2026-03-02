import { motion } from 'framer-motion';
import {
  Search, Monitor, MessageCircle, Brain, Wrench, Mouse,
  Image, Paintbrush, ScanEye, Cpu, LayoutDashboard, Play,
  FileText, AppWindow
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Core: <Search className="w-4 h-4" />,
  'Window Control': <Monitor className="w-4 h-4" />,
  WhatsApp: <MessageCircle className="w-4 h-4" />,
  Memory: <Brain className="w-4 h-4" />,
  Utils: <Wrench className="w-4 h-4" />,
  'Mouse & Keyboard': <Mouse className="w-4 h-4" />,
  'Image Tools': <Image className="w-4 h-4" />,
  Creative: <Paintbrush className="w-4 h-4" />,
  'Screen Reader': <ScanEye className="w-4 h-4" />,
  System: <Cpu className="w-4 h-4" />,
  Desktop: <LayoutDashboard className="w-4 h-4" />,
  'Media Control': <Play className="w-4 h-4" />,
  'PDF Tools': <FileText className="w-4 h-4" />,
  'Window Manager': <AppWindow className="w-4 h-4" />,
};

const featureCategories = [
  { category: 'Core', color: '#a855f7', features: ['Google Search', 'Get Date/Time', 'Weather Info'] },
  { category: 'Window Control', color: '#8b5cf6', features: ['Open App', 'Close App', 'Shutdown PC', 'File/Folder Manager', 'Play Files', 'App Automation'] },
  { category: 'WhatsApp', color: '#7c3aed', features: ['WhatsApp Call', 'WhatsApp Message'] },
  { category: 'Memory', color: '#6d28d9', features: ['Load Memory', 'Save Memory', 'Recent Conversations', 'Add Memory Entry'] },
  { category: 'Utils', color: '#818cf8', features: ['Screenshot Tool', 'Edit Selection'] },
  { category: 'Mouse & Keyboard', color: '#6366f1', features: ['Move Cursor', 'Mouse Click', 'Scroll Cursor', 'Type Text', 'Press Key', 'Press Hotkey', 'Control Volume', 'Swipe Gesture'] },
  { category: 'Image Tools', color: '#38bdf8', features: ['Image to PDF', 'Extract Text (OCR)', 'Batch Image to PDF'] },
  { category: 'Creative', color: '#22d3ee', features: ['Make Drawing'] },
  { category: 'Screen Reader', color: '#2dd4bf', features: ['Start Screen Reader', 'Stop Screen Reader', 'Get Screen Text', 'Get Selected Text'] },
  { category: 'System', color: '#a78bfa', features: ['Battery Status', 'System Status', 'Adjust Brightness', 'System Volume', 'Sleep System', 'System Uptime', 'Network Info'] },
  { category: 'Desktop', color: '#c084fc', features: ['Change Wallpaper', 'Toggle Icons', 'Toggle Taskbar', 'Empty Recycle Bin', 'Set Theme'] },
  { category: 'Media Control', color: '#818cf8', features: ['Zoom Screen', 'Open System Folder', 'Windows Shortcuts', 'Virtual Desktop'] },
  { category: 'PDF Tools', color: '#38bdf8', features: ['Folder to PDF', 'Read PDF', 'Merge PDFs', 'Active PDF Reader', 'Scan Folder'] },
  { category: 'Window Manager', color: '#7c3aed', features: ['Switch Window', 'Minimize Window', 'Close Window', 'Show Desktop', 'Snap Window', 'Get Open Windows', 'Activate by Title', 'Minimize by Title', 'Maximize by Title', 'Close by Title', 'Center Window'] },
];

export function Myra2FeaturesSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            MYRA 2.0 Can Do <span className="glow-text">Everything</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            70+ Powerful AI Capabilities to Control Your Entire System with Intelligence
          </p>
          <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold text-purple-300 border border-purple-500/40 bg-purple-500/10 shadow-[0_0_20px_rgba(139,92,246,0.4)] animate-pulse">
            66+ Features
          </span>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {featureCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.05 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
                <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
                  {categoryIcons[cat.category]}
                  {cat.category}
                </span>
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {cat.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-sm text-foreground/90 cursor-default transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  >
                    {feature}
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              {catIdx < featureCategories.length - 1 && (
                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
