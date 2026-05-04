import Image from "next/image";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";
import CompareGame from "./components/CompareGame";
export default async function Home() {



  const { data } = await supabase.rpc('get_random_tv_shows');
  console.log(data);
  let index = 0;

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div >
          <h1>More/less</h1>
        </div>

        <div>
          <h2>Which has a higher rating?</h2>
        </div>



        <CompareGame shows={data} />

        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

      </main>
    </div>
  );
}
