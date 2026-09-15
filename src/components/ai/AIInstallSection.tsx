import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, Download, RefreshCw, Play, Package } from 'lucide-react';
import { toast } from 'sonner';

const commands = [
  {
    id: 'install',
    label: 'Install',
    description: "First time? Run this command in Command Prompt or PowerShell to install the assistant on your PC.",
    command: 'pip install nextdev-ai-assistant',
    icon: Download,
    accent: { h: 199, s: 89, l: 48 },
  },
  {
    id: 'update',
    label: 'Update',
    description: 'Already installed? Upgrade to the latest version with the newest features and fixes.',
    command: 'python -m pip install --upgrade nextdev-ai-assistant',
    icon: RefreshCw,
    accent: { h: 262, s: 83, l: 58 },
  },
  {
    id: 'run',
    label: 'Run',
    description: "After install, just type the command below and your AI assistant comes alive.",
    command: 'nextdev-ai',
    icon: Play,
    accent: { h: 320, s: 70, l: 55 },
  },
];

function CommandBlock({ cmd, index }: { cmd: typeof commands[0]; index: number }) {
  const [copied, setCopied] = useState(false);
  const Icon = cmd.icon;
  const hsl = `${cmd.accent.h} ${cmd.accent.s}% ${cmd.accent.l}%`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cmd.command);
    setCopied(true);
    toast.success(`${cmd.label} command copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card rounded-2xl p-6 border hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
      style={{ borderColor: `hsla(${hsl}, 0.3)` }}
    >
      <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
        0{index + 1}
      </div>

      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="p-3 rounded-xl" style={{ background: `linear-gradient(135deg, hsl(${hsl}), hsl(${hsl}))`, boxShadow: `0 0 20px hsla(${hsl}, 0.35)` }}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold">{cmd.label}</h3>
          <p className="text-xs text-muted-foreground">Step {index + 1}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 relative z-10">{cmd.description}</p>

      <div className="relative bg-black/60 rounded-lg border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
            <Terminal className="w-3 h-3" />
            <span>cmd.exe</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 font-mono text-sm">
          <span style={{ color: `hsl(${hsl})` }} className="select-none">{'>'}</span>
          <code className="text-foreground flex-1 break-all">{cmd.command}</code>
          <button onClick={handleCopy} className="flex-shrink-0 p-2 rounded-md hover:bg-white/10 transition-colors" aria-label="Copy command">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function AIInstallSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-secondary/30 text-secondary font-semibold text-sm tracking-wider mb-4">
            <Package className="w-4 h-4" />
            DESKTOP INSTALLATION
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Install on <span className="glow-text">Your PC</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Three simple steps. Copy, paste, and run — your personal AI assistant will be ready in under a minute.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {commands.map((cmd, i) => (
            <CommandBlock key={cmd.id} cmd={cmd} index={i} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3 rounded-full glass-card border border-border/50 text-xs md:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Windows 10 / 11</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary" /> Python 3.8+</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Internet connection</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
