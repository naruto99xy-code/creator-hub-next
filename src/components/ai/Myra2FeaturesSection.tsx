import { motion } from 'framer-motion';
import {
  Search, Monitor, MessageCircle, Brain, Wrench, Mouse,
  Image, Paintbrush, ScanEye, Cpu, LayoutDashboard, Play,
  FileText, AppWindow, Clock, Cloud, Power, XCircle, Folder,
  Phone, Camera, ScanLine, BatteryMedium, Settings, Sun,
  Volume2, Moon, Wifi, ToggleLeft, Trash2, Palette,
  ZoomIn, Keyboard, MonitorSmartphone, Type, Hand, Disc,
  BookOpen, Merge, FolderSearch, Minimize2, Maximize2, PanelTop,
  SquareStack, ArrowRightLeft, Eye, EyeOff, FileDown, ImageIcon
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

const featureIcons: Record<string, React.ReactNode> = {
  'Google Search': <Search className="w-5 h-5" />,
  'Get Date/Time': <Clock className="w-5 h-5" />,
  'Weather Info': <Cloud className="w-5 h-5" />,
  'Open App': <Monitor className="w-5 h-5" />,
  'Close App': <XCircle className="w-5 h-5" />,
  'Shutdown PC': <Power className="w-5 h-5" />,
  'File/Folder Manager': <Folder className="w-5 h-5" />,
  'Play Files': <Play className="w-5 h-5" />,
  'App Automation': <Settings className="w-5 h-5" />,
  'WhatsApp Call': <Phone className="w-5 h-5" />,
  'WhatsApp Message': <MessageCircle className="w-5 h-5" />,
  'Load Memory': <FileDown className="w-5 h-5" />,
  'Save Memory': <Brain className="w-5 h-5" />,
  'Recent Conversations': <BookOpen className="w-5 h-5" />,
  'Add Memory Entry': <Disc className="w-5 h-5" />,
  'Screenshot Tool': <Camera className="w-5 h-5" />,
  'Edit Selection': <Wrench className="w-5 h-5" />,
  'Move Cursor': <Mouse className="w-5 h-5" />,
  'Mouse Click': <Mouse className="w-5 h-5" />,
  'Scroll Cursor': <ArrowRightLeft className="w-5 h-5" />,
  'Type Text': <Type className="w-5 h-5" />,
  'Press Key': <Keyboard className="w-5 h-5" />,
  'Press Hotkey': <Keyboard className="w-5 h-5" />,
  'Control Volume': <Volume2 className="w-5 h-5" />,
  'Swipe Gesture': <Hand className="w-5 h-5" />,
  'Image to PDF': <Image className="w-5 h-5" />,
  'Extract Text (OCR)': <ScanLine className="w-5 h-5" />,
  'Batch Image to PDF': <Image className="w-5 h-5" />,
  'Make Drawing': <Paintbrush className="w-5 h-5" />,
  'Start Screen Reader': <Eye className="w-5 h-5" />,
  'Stop Screen Reader': <EyeOff className="w-5 h-5" />,
  'Get Screen Text': <ScanEye className="w-5 h-5" />,
  'Get Selected Text': <ScanEye className="w-5 h-5" />,
  'Battery Status': <BatteryMedium className="w-5 h-5" />,
  'System Status': <Cpu className="w-5 h-5" />,
  'Adjust Brightness': <Sun className="w-5 h-5" />,
  'System Volume': <Volume2 className="w-5 h-5" />,
  'Sleep System': <Moon className="w-5 h-5" />,
  'System Uptime': <Clock className="w-5 h-5" />,
  'Network Info': <Wifi className="w-5 h-5" />,
  'Change Wallpaper': <ImageIcon className="w-5 h-5" />,
  'Toggle Icons': <ToggleLeft className="w-5 h-5" />,
  'Toggle Taskbar': <PanelTop className="w-5 h-5" />,
  'Empty Recycle Bin': <Trash2 className="w-5 h-5" />,
  'Set Theme': <Palette className="w-5 h-5" />,
  'Zoom Screen': <ZoomIn className="w-5 h-5" />,
  'Open System Folder': <Folder className="w-5 h-5" />,
  'Windows Shortcuts': <Keyboard className="w-5 h-5" />,
  'Virtual Desktop': <MonitorSmartphone className="w-5 h-5" />,
  'Folder to PDF': <FolderSearch className="w-5 h-5" />,
  'Read PDF': <FileText className="w-5 h-5" />,
  'Merge PDFs': <Merge className="w-5 h-5" />,
  'Active PDF Reader': <BookOpen className="w-5 h-5" />,
  'Scan Folder': <FolderSearch className="w-5 h-5" />,
  'Switch Window': <ArrowRightLeft className="w-5 h-5" />,
  'Minimize Window': <Minimize2 className="w-5 h-5" />,
  'Close Window': <XCircle className="w-5 h-5" />,
  'Show Desktop': <LayoutDashboard className="w-5 h-5" />,
  'Snap Window': <SquareStack className="w-5 h-5" />,
  'Get Open Windows': <AppWindow className="w-5 h-5" />,
  'Activate by Title': <Monitor className="w-5 h-5" />,
  'Minimize by Title': <Minimize2 className="w-5 h-5" />,
  'Maximize by Title': <Maximize2 className="w-5 h-5" />,
  'Close by Title': <XCircle className="w-5 h-5" />,
  'Center Window': <Maximize2 className="w-5 h-5" />,
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
            MY AI Can Do <span className="glow-text">Everything</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            70+ Powerful Capabilities Designed to Control, Automate, and Enhance Your Entire System
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
                    className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-sm text-foreground/90 cursor-default transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] group/card"
                  >
                    <span className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-purple-400 transition-all duration-300 group-hover/card:border-purple-500/50 group-hover/card:shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                      {featureIcons[feature] || <Cpu className="w-5 h-5" />}
                    </span>
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
