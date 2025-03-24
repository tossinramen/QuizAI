import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
    BarChartBig,
    




} from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
export function NavMenu() {
  return (
    
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
            <Link href="/dashboard" className="flex flexr-row">
            <BarChartBig className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            </Link>
            
          </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          
          <DropdownMenuItem>
          <Link href="/quiz/new" className="flex flexr-row">
            <Plus className="mr-2 h-4 w-4" />
            New Quiz
          </Link>
            
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link href="/billing" className="flex flexr-row">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Link>
            
          </DropdownMenuItem>
          
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          
        
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
  <a
    href="https://github.com/tossinramen/QuizAI"
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub
  </a>
</DropdownMenuItem>
        
    
      </DropdownMenuContent>
    
  )
}
