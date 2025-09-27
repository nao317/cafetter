import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const { signOut } = useAuth();

    const handleLogout = async () => {
        cleanup();
        await signOut();
        window.location.href = '/auth';
    };

    return (
        <>
            <DropdownMenuLabel className="pb-0 font-normal">
                <UserInfo user={user} />
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
                <DropdownMenuItem 
                    className="w-full cursor-pointer"
                    onClick={cleanup}
                >
                    <Settings />
                    Profile Settings
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
                className="w-full cursor-pointer"
                onClick={handleLogout}
            >
                <LogOut />
                Logout
            </DropdownMenuItem>
        </>
    );
}
