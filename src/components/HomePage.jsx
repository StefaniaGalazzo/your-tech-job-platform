import { Header } from "./Header";
import { Container } from "react-bootstrap";
import MainSearch from "./MainSearch";

export default function HomePage() {
  return (
    <Container fluid className="container-home p-0">
      <Header />
      <MainSearch />
    </Container>
  );
}
