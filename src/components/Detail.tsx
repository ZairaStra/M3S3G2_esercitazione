import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IArticle {
  id: number;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
}

const Detail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(true);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
      if (response.ok) {
        const data: IArticle = await response.json();
        setArticle(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  return (
    <Container className="my-5">
      <Row className="justify-content-center my-4">
        <Col xs={12} sm={10} md={8}>
          {loading && <Spinner variant="secondary" animation="border" />}

          {error && showError && (
            <Alert variant="danger" dismissible onClose={() => setShowError(false)}>
              An error occurred while loading the article.
            </Alert>
          )}

          {!loading && !error && article && (
            <>
              <h2 className="my-3 display-2 text-secondary">{article.title}</h2>
              <h4 className="my-3 display-4 text-secondary"> - Details</h4>
              <Card className="flex-row cards">
                <Card.Img src={article.image_url} alt={article.title} style={{ width: "40%", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.summary}</Card.Text>
                  <p className="text-muted">Published on: {new Date(article.published_at).toLocaleDateString()}</p>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-light" href={article.url} target="_blank">
                      Read full article
                    </Button>
                    <Link to="/">
                      <Button variant="outline-light">Go Back to Homepage</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
