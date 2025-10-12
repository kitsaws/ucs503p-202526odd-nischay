import Logo from "./ui/Logo"

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="w-[95%] h-0 border border-muted mx-auto" />
      <div className="flex justify-between px-16 py-8">
        <Logo />
        <p className="text-muted-foreground">© 2025 Squad Up. Building teams, creating connections.</p>
      </div>
    </footer>
  )
}

export default Footer
