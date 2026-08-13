import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import FeaturedResources from "../components/resources/FeaturedResources";
import PlatformStats from "../components/stats/PlatformStats";
import Categories from "../components/categories/Categories";
import HowItWorks from "../components/how-it-works/HowItWorks";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
<Hero />
<FeaturedResources />
<PlatformStats />
<Categories />
<HowItWorks />
<Footer />
    </main>
  );
}
