export const Label = ({ htmlFor = "", className = "", children }) => (
  <label htmlFor={htmlFor} className={`block font-medium mb-1 ${className}`}>
    {children}
  </label>
);

export const Input = ({ type = "text", className = "", ...props }) => (
  <input
    type={type}
    className={`w-full h-fit rounded-lg px-3 py-2 border font-normal border-border focus:outline-muted-foreground focus:ring-2 focus:ring-primary ${className}`}
    {...props}
  />
);