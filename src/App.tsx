import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link, Outlet } from 'react-router';
import { Button } from "@mui/material"

function App() {
  return (
    <Container maxWidth="lg">  
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6">Personal Training App</Typography>
      </Toolbar>
    </AppBar>
      <nav>
        <Button variant="outlined">
        <Link to={"/"}>Customers</Link>
        </Button>
        <Button variant="outlined">
        <Link to={"/trainings"}>Trainings</Link>
        </Button>
      </nav>

      
      <Outlet />
    <CssBaseline/>
    </Container>
  )
}

export default App