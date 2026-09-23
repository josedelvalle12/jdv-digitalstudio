/**
 * CTA SYSTEM
 *  <Action>                       PRIMARY  — objeto físico: círculo verde + float magnético
 *  <Action variant="secondary">   SECONDARY — texto + flecha + subrayado
 *  <TextLink>                     TEXT LINK — mono + flecha →
 */
function ArrowUR() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" strokeLinecap="square" />
    </svg>
  );
}
function ArrowR() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

export default function Action({ href = "#", children, variant = "primary", size = "md", className = "", onClick, tabIndex, ariaHidden, type }) {
  if (variant === "secondary") {
    return (
      <a href={href} onClick={onClick} tabIndex={tabIndex} aria-hidden={ariaHidden} className={`act2 ${className}`}>
        <span>{children}</span><ArrowUR />
      </a>
    );
  }
  const cls = `act ${size === "sm" ? "act--sm" : size === "xl" ? "act--xl" : ""} ${className}`;
  const inner = (
    <>
      <span className="act__bg" aria-hidden="true" />
      <span className="act__label">{children}</span>
      <span className="act__dot" aria-hidden="true"><ArrowUR /><ArrowUR /></span>
    </>
  );
  const common = { className: cls, onClick, "data-magnetic": true, "data-cta": true, tabIndex, "aria-hidden": ariaHidden };
  if (type === "button") return <button type="button" {...common}>{inner}</button>;
  return <a href={href} {...common}>{inner}</a>;
}

export function TextLink({ href = "#", children, onClick, className = "", as, ...rest }) {
  if (as === "span") return <span className={`tlink ${className}`}>{children}<ArrowR /></span>;
  return <a href={href} onClick={onClick} className={`tlink ${className}`} {...rest}>{children}<ArrowR /></a>;
}
