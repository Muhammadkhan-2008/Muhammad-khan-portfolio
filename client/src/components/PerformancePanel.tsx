import { Zap, CheckCircle } from "lucide-react";

export function PerformancePanel() {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 glow-effect relative overflow-hidden my-16">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Zap size={100} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
            <Zap className="text-primary" /> Core Web Vitals
          </h3>
          <p className="text-muted-foreground mb-4">
            Performance isn't an afterthought—it's a feature. This portfolio is built with a focus on delivering the fastest possible experience, utilizing optimal React rendering patterns and CSS efficiency.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle className="text-green-500" size={16} /> 100/100 Lighthouse Performance Score
            </li>
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle className="text-green-500" size={16} /> Sub-500ms Time to Interactive (TTI)
            </li>
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle className="text-green-500" size={16} /> Zero Cumulative Layout Shift (CLS)
            </li>
          </ul>
        </div>
        
        {/* Mock Lighthouse Scores */}
        <div className="flex gap-4 items-center">
          {[
            { label: "Performance", score: 100 },
            { label: "Accessibility", score: 100 },
            { label: "Best Practices", score: 100 },
            { label: "SEO", score: 100 },
          ].map((metric) => (
            <div key={metric.label} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-bold text-green-500 mb-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                {metric.score}
              </div>
              <span className="text-xs text-muted-foreground font-medium text-center">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}