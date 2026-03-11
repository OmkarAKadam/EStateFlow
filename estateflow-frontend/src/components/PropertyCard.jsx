import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {

  return (
    <div style={{border:"1px solid gray", padding:"10px", margin:"10px"}}>

      <h3>{property.title}</h3>

      <p>{property.location}</p>

      <p>Type: {property.propertyType}</p>

      <p>Bedrooms: {property.bedrooms}</p>

      <p>Bathrooms: {property.bathrooms}</p>

      <p>Price: ₹{property.price}</p>

      <Link to={`/properties/${property.id}`}>
        View Details
      </Link>

    </div>
  );
};

export default PropertyCard;