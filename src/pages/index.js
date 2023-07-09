import Header from "@/components/Header/Header";
import "@/styles/routes/home.scss";
import Link from "next/link";

export default function Home() {
  const templates = [
    {
      id: 1,
      img: "/template1.jpeg",
    },
    {
      id: 2,
      img: "/template2.jpeg",
    },
    {
      id: 3,
      img: "/template3.jpeg",
    },
  ];

  return (
    <div className="Home">
      <Header />
      <section className="Home__desc">
        <h1>ATS-Friendly Resume Templates</h1>
        <p>
          A Resume Builder API from backend allows users to create
          professional resumes quickly and easily. The API uses pre-built
          templates and dynamically generates the resume content based on the
          user's input data, such as personal information, skills, experiences,
          and education. This reduces the manual effort required to create and
          format a resume.
        </p>
      </section>
      <section className="Home__templates">
        {templates.map((item, i) => (
          <Link
            className="Home__templateCard"
            href={`/template/${item.id}`}
            key={i}
          >
            <div className="Home__templateCard--overlay">
              <span>Use this template</span>
            </div>
            <div
              className={`Home__templateCard--top Home__templateCard--bg${
                (i + 1) % 3 === 0 ? 3 : (i + 1) % 3
              }`}
            >
              <img src={item.img} />
            </div>
            <div className="Home__templateCard--bottom">
              Resume Template {item.id}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
