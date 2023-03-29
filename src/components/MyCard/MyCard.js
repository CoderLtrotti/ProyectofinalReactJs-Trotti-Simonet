import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function MyCard({user}) {
  return (
    <Card style={{ width: "18rem"}}>
      <Card.Img variant="top" src={user.avatar} />
      <Card.Body>
        <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
        <Card.Text>
          
          {user.offer?
          <small style={ {color:"purple"}}>
            Descuento : {user.offer} %
          </small>
          :
          ""


        }

        </Card.Text>
       
      </Card.Body>
      <Card.Footer>
        <Link to={`/detalle/${user.id}`}>
        <Button variant="primary">Más información</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default MyCard;
