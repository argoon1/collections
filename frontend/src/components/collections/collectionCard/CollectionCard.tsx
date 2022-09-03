type CollectionCardProps = {
  name: string;
  description: string;
  topic: string;
  id: string;
};
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const CollectionCard = ({
  name,
  description,
  topic,
  id,
}: CollectionCardProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Topic: {topic}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Link to={`/collection/${id}`}>See collection</Link>
      </Card.Body>
    </Card>
  );
};

export { CollectionCard };
