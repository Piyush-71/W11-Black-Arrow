export function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="chapter-label"><span className="crosshair">+</span><span>{number} / 09</span><span className="label-rule" /><span>{children}</span></div>;
}
