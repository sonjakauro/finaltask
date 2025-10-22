import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link, Outlet } from 'react-router';

function App() {
  return (
    <Container maxWidth="lg">  
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6">Personal Training App</Typography>
      </Toolbar>
    </AppBar>
      <nav>
        <Link to={"/"}>Customers</Link>
        <Link to={"/trainings"}>Trainings</Link>
      </nav>
      <Outlet />
    <CssBaseline/>
    </Container>
  )
}

export default App