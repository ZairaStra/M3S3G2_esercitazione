import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { IArticle } from "../interfaces";

/* interface IArticle {
  id: number;
  title: string;
  summary: string;
  url: string;
  image_url: string;
}
 */
interface ArticleProps {
  article: IArticle;
}

const ArticleCard = ({ article }: ArticleProps) => {
  return (
    <Link to={`/detail/${article.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <Card className="cards" style={{ height: "400px", cursor: "pointer" }}>
        <Card.Img src={article.image_url} alt={article.title} style={{ width: "100%", height: "60%", objectFit: "cover" }} />
        <Card.Body style={{}}>
          <h3>{article.title}</h3>
          <Card.Text className="text-truncate">{article.summary}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
export default ArticleCard;
