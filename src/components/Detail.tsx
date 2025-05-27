import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Card, Button } from "react-bootstrap";

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
          {loading && (
            <div className="text-center my-5">
              <Spinner animation="border" />
              <p className="mt-2">Loading article...</p>
            </div>
          )}

          {error && showError && (
            <Alert variant="danger" dismissible onClose={() => setShowError(false)}>
              An error occurred while loading the article.
            </Alert>
          )}

          {!loading && !error && article && (
            <Card className="flex-row">
              <Card.Img src={article.image_url} alt={article.title} style={{ width: "40%", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.summary}</Card.Text>
                <p className="text-muted">Published on: {new Date(article.published_at).toLocaleDateString()}</p>
                <Button variant="primary" href={article.url} target="_blank" rel="noopener noreferrer">
                  Read full article
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
