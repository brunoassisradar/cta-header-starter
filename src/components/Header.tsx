import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Logo
          </span>
        </div>

        <Button 
          size="lg" 
          className="font-semibold tracking-wide transition-all duration-300 hover:scale-105"
        >
          Começar Agora
        </Button>
      </div>
    </header>
  );
};

export default Header;
