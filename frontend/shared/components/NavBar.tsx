
import { Film } from 'lucide-react';
import { NavBarLinks } from './NavBarLink';


export const Navbar = () => {

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b border-blue-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Film className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xl font-bold text-white">MovieDB</span>
                    </div>

                    <NavBarLinks />
                </div>
            </div>
        </nav>
    );
}; 