import Link from "next/link";
import styles from "./grid.module.css";

type Props = {
  slug: string;
  title: string;
  image: string;
  meta: string;
  index: number;
};

export default function GridCard({ slug, title, image, meta, index }: Props) {
  return (
    <Link
      href={`/projects/${slug}/`}
      className={styles.card}
      style={{ ["--i" as string]: index }}
    >
      <div className={styles.mat}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className={styles.img} loading={index < 2 ? "eager" : "lazy"} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.meta}>{meta}</p>
    </Link>
  );
}
