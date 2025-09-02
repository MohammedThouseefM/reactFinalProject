// Update the import section to include BestPerformance
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactsIcon from '@mui/icons-material/Contacts';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import GroupsIcon from '@mui/icons-material/Groups';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import Dashboard from './componants/dashboard';
import AddStudent from './componants/student';
import Technologies from './componants/technologies';
import BestProjects from './componants/bestProjects';
import BestPerformance from './componants/bestPerformance';
import SaturdaySections from './componants/saturdaySections'
import Dedication from './componants/dedication'

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'addStudent',
    title: 'Student',
    icon: <ContactsIcon />,
  },
  {
    segment: 'Technologies',
    title: 'Technologies',
    icon: <TrendingUpIcon />,
  },
  {
    segment: 'bestProjects',
    title: 'Best projects',
    icon: <StarBorderIcon />,
  },
  {
    segment: 'bestPerformance',
    title: 'Best Performance',
    icon: <StarIcon />,
  },
  {
    segment: 'saturdaysSections',
    title: 'Saturdays sections',
    icon: <GroupsIcon />,
  },
  {
    segment: 'Dedication',
    title: 'Dedication',
    icon: <ModeEditIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Update the DemoPageContent function to uncomment the bestPerformance route
function DemoPageContent({ pathname }) {
  // Render Dashboard component when dashboard is selected
  if (pathname === '/dashboard') {
    return <Dashboard />;
  }

  // Render AddStudent component when Add student is selected
  if (pathname === '/addStudent') {
    return <AddStudent />;
  }

  // Render Technologies component when Technologies is selected
  if (pathname === '/Technologies') {
    return <Technologies />;
  }

  // Render bestProjects component when Best Projects is selected
  if (pathname === '/bestProjects') {
    return <BestProjects />;
  }

  // Render bestPerformance component when BestPerformance is selected
  if (pathname === '/bestPerformance') {
    return <BestPerformance />;
  }

  // Render saturdaysSections component when Saturdays Sections is selected
  if (pathname === '/saturdaysSections') {
    return <SaturdaySections />;
  }

  // Render Dedication component when Dedication is selected
  if (pathname === '/Dedication') {
    return <Dedication />;
  }

  // Default content for other pages
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

export default function DashboardLayoutBranding(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // Remove this provider when copying and pasting into your project.
    <DemoProvider window={demoWindow}>
      {/* preview-start */}
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src="/aspira-logo.png" alt="Aspira logo" />,
          title: 'AspiraSys',
          homeUrl: '/toolpad/core/introduction',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
      {/* preview-end */}
    </DemoProvider>
  );
}