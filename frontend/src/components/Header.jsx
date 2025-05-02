import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { useAuth } from '../context/AuthContext';

// Define your nav items per role
const navConfig = {
    guest: [
    { label: 'Events', to: '/events' },
    { label: 'Contact', to: '/contact' },
    { label: 'Find your ticket', to: '/ticket' },
    { label: 'Account', to: '/account' },
    ],
    attendee: [
    { label: 'Events', to: '/events' },
    { label: 'Contact us', to: '/contact' },
    { label: 'Find your ticket', to: '/ticket', variant: 'contained' },
    ],
    organizer: [
    { label: 'Create Events', to: '/create' },
    { label: 'Contact us', to: '/contact' },
    { label: 'Dashboard', to: '/dashboard', variant: 'contained' },
    ],
};

const Header = () => {
    const { role, logout, switchRole } = useAuth();

    const navigate = useNavigate();
    const links = navConfig[role];

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#0284c7' }}>
            <Toolbar>
                {/* Logo */}
                <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                    flexGrow: 1,
                    fontWeight: 'bold',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                EVENTFLOW
                </Typography>

                {/* Nav Links */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {links.map(({ label, to, variant }) => (
                    <Button
                    key={label}
                    component={Link}
                    to={to}
                    color="inherit"
                    variant={variant || 'text'}
                    sx={{ mr: 2 }}
                    >
                    {label}
                    </Button>
                ))}

                {/* Guest view → Sign In */}
                {/* {user ? ( */}
                {role !== 'guest' ? (
                    <>
                        {/* Role‐toggle button */}
                        <Button
                            variant="outlined"
                            color="inherit"
                            // onClick={() => user.role === 'attendee' ? login('organizer') : login('attendee') }
                            onClick={()  => {
                                const next = role === "attendee" ? "organizer" : "attendee";
                                switchRole(next);
                                navigate(next === "organizer"
                                    ? `/organizer-homepage?role=${next}`
                                    : `/?role=${next}`);
                            }}
                            sx={{ mr: 2 }}
                        >
                            Switch to {role === 'attendee' ? 'Organizer' : 'Attendee'}
                        </Button>
                        {/* Logout stub */}
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    /* Guest view → Sign In */
                    <Button
                        variant="outlined"
                        color="inherit"
                        component={Link}
                        to="/Account/Login"
                    >
                    Sign In
                    </Button>
                )}
                </Box>
            </Toolbar>
        </AppBar>
  );
};

export default Header;
