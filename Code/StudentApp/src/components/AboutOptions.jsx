import { useParams } from 'react-router-dom';

const aboutData = [
  {
    slug: 'about-app',
    title: 'About the app',
    description:
      "This application lets us add to-dos, edit, and delete items. Log in to see the delete feature. It also persists to-dos in the browser's local storage for a subsequent visit.",
  },
  {
    slug: 'about-developer',
    title: 'About the developer',
    description:
      'Ibas Majid founded ibaslogic.com to experiment with new web features and write actionable guides. Follow Ibas on Twitter @ibaslogic to learn modern web development.',
  },
];

const AboutOptions = () => {
        const { slug } = useParams();
        const content = aboutData.find( option => option.slug === slug );

  return (
    <div className="main_content">
      <h2>A propos ({content.slug})</h2>
      <article>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
      </article>
    </div>
  );
};
export default AboutOptions;

