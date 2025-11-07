import Logo from "./ui/Logo"

const Footer = () => {
  return (
    <footer className="w-full hidden md:block">
      <div className="w-[95%] h-0 border border-muted mx-auto" />
      <div className="flex justify-between items-center px-16 py-8">
        <Logo />
        <p className="text-sm text-muted-foreground">© 2025 Squad Up. Building teams, creating connections.</p>
      </div>
    </footer>
  )
}

export default Footer
