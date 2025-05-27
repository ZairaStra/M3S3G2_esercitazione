import { Container, Row, Col } from "react-bootstrap";
import Article from "./Article";
import { useEffect, useState } from "react";
import type { IArticle } from "../interfaces";
/* interface Article {
  id: number;
  title: string;
  summary: string;
  url: string;
  image_url: string;
} */

const Homepage = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const fetchArticles = async () => {
    try {
      const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles");

      if (response.ok) {
        /*     const arrOfArticles: IArticle[] = await response.json();
        setArticles(arrOfArticles.results); */
        const data = await response.json();
        setArticles(data.results);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center my-4">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h1 className="my-4 display-1 text-secondary">Spaceflight</h1>
        </Col>
      </Row>
      <Row className="gy-3">
        {articles.map((article) => (
          <Col key={article.id} xs={12} md={6} xl={4}>
            <Article article={article} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Homepage;
