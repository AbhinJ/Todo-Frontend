import { Link, useParams } from "react-router-dom";
export default function WelcomeComponent() {
  const params = useParams();
  return (
    <div className="Welcome">
      <h1>Welcome {params.username}</h1>
      <div>
        Manage Your Todos <Link to="/todos">Go here</Link>
      </div>
    </div>
  );
}
