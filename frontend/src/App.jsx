import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Auriculoterapia from "./components/Auriculoterapia";
import Publico from "./components/Publico";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Auriculoterapia />
        <Publico />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
