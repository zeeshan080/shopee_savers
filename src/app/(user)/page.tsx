import About from "@/components/About";
import Banner from "@/components/Banner";
import Faq from "@/components/Faq";
import Favourite from "@/components/Favourite";
import Topic from "@/components/Topic";
import TrendingCoupon from "@/components/TrendingCoupon";

export default function Home() {
  return (
    <main>
      <Banner />
      <Favourite />
      <TrendingCoupon/>
      <Faq />
      <About />
      <Topic/>
    </main>
  );
}
