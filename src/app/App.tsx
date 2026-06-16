import { useState } from "react";
import { Loader2, Mail, ArrowRight, Trash2, Plus, Download, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

// MARKER-MAKE-KIT-INVOKED
// MARKER-MAKE-KIT-DISCOVERY-READ

// Colors/radius/spacing → kit CSS classes in src/styles/buttons.css
// Typography            → kit classes: .label-sm .label-md .label-lg (Inter)
// Token source          → @make-kits/ai-design-system-figma dist/style.css

type Variant = "brand" | "secondary" | "destructive" | "outline" | "ghost" | "link";
type Size = "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

function Button({
  variant = "brand",
  size = "md",
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const sizeClass = size === "icon-sm" ? "btn-icon-sm"
    : size === "icon-lg" ? "btn-icon-lg"
    : size === "icon" ? "btn-icon"
    : `btn-${size}`;

  const typoClass = size === "sm" ? "label-sm"
    : size === "lg" || size === "xl" ? "label-lg"
    : "label-md";

  return (
    <button
      className={cn("btn", `btn-${variant}`, sizeClass, typoClass, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
      ) : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="overline"
      style={{
        color: "var(--color/text/secondary)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color/border/subtle)",
        margin: "40px 0",
      }}
    />
  );
}

function LoadingDemo() {
  const [loading, setLoading] = useState(false);
  const toggle = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <Button loading={loading} onClick={toggle}>
      {loading ? "Saving…" : "Save changes"}
    </Button>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color/background/primary)",
        color: "var(--color/text/primary)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: 896, margin: "0 auto", padding: "64px 32px" }}>

        <div style={{ marginBottom: 48 }}>
          <h1 className="heading-3" style={{ color: "var(--color/text/primary)", marginBottom: 8 }}>
            Button
          </h1>
          <p className="body-md" style={{ color: "var(--color/text/secondary)" }}>
            All variants, sizes, and interaction states — every value driven by
            kit design tokens. Update the CSS variables to retheme globally.
          </p>
        </div>

        <section>
          <SectionLabel>Variants</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button variant="brand">Brand</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <Divider />

        <section>
          <SectionLabel>Sizes</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
          </div>
        </section>

        <Divider />

        <section>
          <SectionLabel>With icons</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <Button leadingIcon={<Mail size={16} />}>Send email</Button>
            <Button variant="secondary" leadingIcon={<Download size={16} />}>Download</Button>
            <Button variant="outline" trailingIcon={<ArrowRight size={16} />}>Continue</Button>
            <Button variant="destructive" leadingIcon={<Trash2 size={16} />}>Delete</Button>
            <Button variant="ghost" leadingIcon={<Plus size={16} />}>Add item</Button>
          </div>
        </section>

        <Divider />

        <section>
          <SectionLabel>Icon only</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <Button size="icon-sm" variant="outline" aria-label="Add"><Plus size={14} /></Button>
            <Button size="icon" aria-label="Next"><ChevronRight size={16} /></Button>
            <Button size="icon-lg" variant="secondary" aria-label="Download"><Download size={18} /></Button>
            <Button size="icon" variant="destructive" aria-label="Delete"><Trash2 size={16} /></Button>
            <Button size="icon" variant="ghost" aria-label="Mail"><Mail size={16} /></Button>
          </div>
        </section>

        <Divider />

        <section>
          <SectionLabel>Loading state</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <LoadingDemo />
            <Button loading variant="secondary">Processing</Button>
            <Button loading variant="outline">Uploading</Button>
            <Button loading size="icon" aria-label="Loading" />
          </div>
          <p className="caption" style={{ color: "var(--color/text/tertiary)", marginTop: 12 }}>
            Click “Save changes” to trigger the 2 s loading state.
          </p>
        </section>

        <Divider />

        <section>
          <SectionLabel>Disabled state</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <Button disabled>Brand</Button>
            <Button disabled variant="secondary">Secondary</Button>
            <Button disabled variant="destructive">Destructive</Button>
            <Button disabled variant="outline">Outline</Button>
            <Button disabled variant="ghost">Ghost</Button>
            <Button disabled variant="link">Link</Button>
          </div>
        </section>

        <Divider />

        <section>
          <SectionLabel>Size × Variant matrix</SectionLabel>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color/border/subtle)" }}>
                  <th className="label-sm" style={{ textAlign: "left", paddingBottom: 12, paddingRight: 24, color: "var(--color/text/secondary)", width: 80 }}>Size</th>
                  {(["brand", "secondary", "outline", "ghost", "destructive"] as Variant[]).map((v) => (
                    <th key={v} className="label-sm" style={{ textAlign: "left", paddingBottom: 12, paddingRight: 16, color: "var(--color/text/secondary)", textTransform: "capitalize" }}>{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(["sm", "md", "lg"] as Size[]).map((s) => (
                  <tr key={s} style={{ borderBottom: "1px solid var(--color/border/subtle)" }}>
                    <td className="code-sm" style={{ paddingTop: 16, paddingBottom: 16, paddingRight: 24, color: "var(--color/text/tertiary)" }}>{s}</td>
                    {(["brand", "secondary", "outline", "ghost", "destructive"] as Variant[]).map((v) => (
                      <td key={v} style={{ paddingTop: 16, paddingBottom: 16, paddingRight: 16 }}>
                        <Button variant={v} size={s}>Button</Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div style={{ borderTop: "1px solid var(--color/border/subtle)", marginTop: 64, paddingTop: 32 }}>
          <p className="caption" style={{ color: "var(--color/text/tertiary)" }}>
            Colors use <code className="code-xs" style={{ backgroundColor: "var(--color/background/tertiary)", color: "var(--color/text/secondary)", padding: "1px 6px", borderRadius: "calc(var(--radius/sm) * 1px)" }}>var(--color/…)</code> tokens
            · Radius via <code className="code-xs" style={{ backgroundColor: "var(--color/background/tertiary)", color: "var(--color/text/secondary)", padding: "1px 6px", borderRadius: "calc(var(--radius/sm) * 1px)" }}>var(--radius/md)</code>
            · Type via <code className="code-xs" style={{ backgroundColor: "var(--color/background/tertiary)", color: "var(--color/text/secondary)", padding: "1px 6px", borderRadius: "calc(var(--radius/sm) * 1px)" }}>.label-md</code>
          </p>
        </div>
      </div>
    </div>
  );
}
