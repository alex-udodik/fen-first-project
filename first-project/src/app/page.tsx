import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div >
          <h1>More/less</h1>
        </div>

        <div>
          <h2>Which has a higher rating?</h2>
        </div>

        <div className={styles.compareImages}>
          <div className="imageBox">
            <div className="image">
              <img src="https://cdn.lessgames.com/moreless/balenciaga.jpg" alt="" />
            </div>
            <div className="image_title">
              <h3>Balencia</h3>
            </div>
          </div>

          <div className="imageBox">
            <div className="image">
              <img src="https://cdn.lessgames.com/moreless/mario.jpg" alt="" />
            </div>
            <div className="image_title">
              <h3>mario</h3>
            </div>
          </div>

        </div>

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
